/**
 * Created 09.09.2020.
 */

const querystring = require('querystring');
const fetch = require('node-fetch');
const check_auth = require('../auth/check_auth');

module.exports = function pay($p, log, route) {

  const {
    utils,
    job_prm: {server: {upp, port, quick_url}},
    cat: {branches, cash_flow_articles},
    doc: {calc_order, credit_card_order},
    adapters: {pouch},
  } = $p;

  if(!upp.sber.password) {
    return;
  }

  // в этом объекте живут методы чтения и установки сеансов оплаты и watchdog отложенной обработки
  const cache = {
    sessions: {},

    watchdog(init) {
      pouch.fetch(`${pouch.remote.ram.name}/_local_docs`, {
        method: 'POST',
        body: JSON.stringify({
          include_docs: true,
          startkey: '_local/pay|',
          endkey : '_local/pay|\u0fff',
        })
      })
        .then((res) => res.status > 201 ? {rows: []} : res.json())
        .then(({rows}) => {
          let res = Promise.resolve();
          for(const {doc} of rows) {
            const {_id, _rev, ...attr} = doc;
            const id = _id.split('|')[1];
            if(id) {
              if(init || !this.sessions[id]) {
                this.sessions[id] = attr;
              }
              else {
                // при необходимости, создаём документы в облаке или 1С
                Object.assign(attr, this.sessions[id]);
                res = res.then(() => checks(id, attr));
              }
            }
          }
          return res;
        })
        .catch((err) => {
          log(err);
        })
        .then(() => {
          setTimeout(this.watchdog.bind(this), 180000);
        });
    },

    register(user, body) {
      const id = utils.generate_guid();
      const data = {
        user: user.ref,
        ref: body.ref,
        branch: body.branch,
        amount: body.doc_amount,
        email: body.email,
        orderNumber: body.orderNumber,
        moment: Date.now(),
      };
      this.sessions[id] = data;
      return pouch.remote.ram.put(Object.assign({_id: `_local/pay|${id}`}, data))
        .then(() => id);
    },

    get(id) {
      const attr = this.sessions[id];
      return attr ? Promise.resolve(attr) : Promise.reject();
    },

    set(id, attr) {
      return this.get(id)
        .then((data) => {
          if(!data) {
            return Promise.reject();
          }
          Object.assign(data, attr);
          const doc = Object.assign({_id: `_local/pay|${id}`}, data);
          return pouch.remote.ram.get(doc._id)
            .then(({_rev}) => {
              doc._rev = _rev;
              return pouch.remote.ram.put(doc);
            });
        })
        .catch(log);
    },

    remove(id) {
      delete this.sessions[id];
      const doc = {_id: `_local/pay|${id}`};
      return pouch.remote.ram.get(doc._id)
        .then(({_rev}) => {
          doc._rev = _rev;
          return pouch.remote.ram.remove(doc);
        })
        .catch(log);
    },

    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Basic ${Buffer.from(`${upp.username}:${upp.password}`).toString('base64')}`,
    },
  };
  cache.watchdog(true);

  // оповещает клиентский поток об изменениях
  // TODO заменить на регистрацию клиента и обход зарегистрированных для поддержки многопоточности
  function notify({action, ref, evt_id}) {
    fetch(`http://localhost:${port}/couchdb/events/pay`, {
      method: 'POST',
      body: JSON.stringify({action, ref, evt_id}),
    })
      .catch((err) => null);
  }

  // читает заказ в 1С и запускает в работу
  function query_1c({ref, pay, id, branch, zone}) {

    return cache.get(id)
      .then((attr) => {
        return attr.pay_1c_registered || new Promise((resolve, reject) => {
          const reset = setTimeout(reject, 90000);
          setTimeout(() => {
            fetch(`${upp.url}cardPay?ref=${pay}&branch=${branch}&zone=${zone}`, {headers: cache.headers})
              .then((res) => {
                clearTimeout(reset);
                if(res.status > 201) {
                  reject(new Error(`Ошибка сервера 1С: ${res.statusText}`));
                }
                else {
                  resolve(res.json());
                }
              })
          }, 10000);
        })
          .then(data => {
            if(data.error) {
              throw new Error(`cardPay: ${data.error} ${data.reason}`);
            }
            return cache.set(id, {pay_1c_registered: true});
          });
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          const reset = setTimeout(reject, 90000);
          setTimeout(() => {
            fetch(`${upp.url}quickOrder?ref=${ref}&branch=${branch}&zone=${zone}`, {headers: cache.headers})
              .then((res) => {
                clearTimeout(reset);
                if(res.status > 201) {
                  reject(new Error(`Ошибка сервера 1С: ${res.statusText}`));
                }
                else {
                  resolve(res.json());
                }
              })
          }, 10000);
        })
          .then(data => {
            if(data.error) {
              throw new Error(`quickOrder: ${data.error} ${data.reason}`);
            }
            // завершаем сессию
            return cache.remove(id);
          });
      });
  }

  // финализация оплаты
  function pay_fin(id, attr) {

    let {ref, branch, amount} = attr;
    branch = branches.get(branch);
    const db = branch.db('doc');
    const order = calc_order.create({ref}, false, true);
    //amount = parseFloat(amount) / 100;

    return calc_order.adapter.load_obj(order, {db})
      .then((doc) => {

        // создадим приходник
        const card_order = credit_card_order.create({ref: attr.card_order}, false, true);
        // пытаемся прочитать его из базы отдела
        credit_card_order.adapter.load_obj(card_order, {db})
          .then((card_order) => {

            // синхронно заполняем документ оплаты
            if(card_order.is_new()) {
              card_order.date = new Date();
              card_order.number_doc = `${doc.number_internal}-${(Math.random() * 1e6).toFixed(0).substr(0, 4)}`;
            }
            Object.assign(card_order, {
              organization: doc.organization,
              partner: doc.partner,
              department: doc.department,
              doc_amount: amount,
              responsible: doc.manager,
              payment_details: [{
                trans: doc.ref,
                cash_flow_article: cash_flow_articles.by_name('Оплата покупателя'),
                amount
              }],
            });

            return cache.set(id, {card_order: card_order.ref})
              // сохраняем документ оплаты
              .then(() => card_order.save(true, false, undefined, {db}))

              // проводим документ Расчет и запускаем процесс в 1C
              .then(() => doc.save(true, false, undefined, {db}))
              // .then(() => {
              //   // реплицируем документы в центральную базу
              //   const doc_ids = [`doc.calc_order|${doc.ref}`, `doc.credit_card_order|${card_order.ref}`];
              //   doc.production.forEach(({characteristic}) => {!characteristic.empty() && doc_ids.push(`cat.characteristics|${characteristic.ref}`)});
              //   //return db.replicate.to(calc_order.adapter.remote.doc, {doc_ids});
              // })
              .then(() => {
                // запрос к УПП с указанием запустить в работу
                query_1c({ref: doc.ref, pay: card_order.ref, id, branch: branch.suffix, zone: branch.owner.id})
                  .catch(log);
              })
              .catch(log);
          })
      });
  }

  // возвращает заказ в исходное состояние, если оплата не подтвердилась за 30 минут
  function pay_cancel(id, attr) {
    // получаем заказ
    let {ref, branch} = attr;
    const db = branches.get(branch).db('doc');
    const order = calc_order.create({ref}, false, true);
    return calc_order.adapter.load_obj(order, {db})
      // распроводим
      .then((doc) => {
        if(doc.posted || doc.sending_stage == 'pay_start') {
          doc.sending_stage = 'replenish';
          doc.obj_delivery_state = 'Отозван';
          return doc.save(false, false, undefined, {db});
        }
      })
      .then(() => {
        // завершаем сессию
        return cache.remove(id);
      });
  }

  // запрашивает у платёжной системы подтверждение оплаты
  function sber_query(attr) {
    const rData = {
      userName: upp.sber.username,
      password: upp.sber.password,
      orderNumber: attr.orderNumber,
      language: 'ru',
    };
    const postData = querystring.stringify(rData);

    return fetch(`${upp.sber.url}getOrderStatusExtended.do`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      },
      body: postData,
    })
      .then((res) => res.json())
      .catch(log);
  }

  // инициирует процесс оплаты
  function sber_register(id, attr) {
    const common_url = `${upp.sber.cburl}/couchdb/common/pay/sber/`;
    const amount = 100;
    const rData = {
      userName: upp.sber.username,
      password: upp.sber.password,
      orderNumber: attr.orderNumber,
      amount,
      currency: 643,
      language: 'ru',
      returnUrl: `${common_url}success/${id}`,
      failUrl: `${common_url}fail/${id}`,
      //description: 'Описание заказа',
      jsonParams: JSON.stringify({orderNumber: `${attr.number_internal || attr.number_doc} ${attr.client_of_dealer}`}),
      pageView: attr.pageView,
      email: attr.email,
      sessionTimeoutSecs: 900,
    };
    const postData = querystring.stringify(rData);

    return fetch(`${upp.sber.url}register.do`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      },
      body: postData,
    });
  }

  // выполняет проверки и пытается починить оборванный процесс
  function checks(id, attr) {
    // если оплата стартовала, проверяем статус
    return sber_query(attr)
      .then((pay) => {
        if(pay.errorCode == 0) {
          if([1,2].includes(pay.orderStatus)) {
            // если оплачено - pay_fin
            return pay_fin(id, attr);
          }
          else if((Date.now() - attr.moment) > 30 * 60000) {
            // если нет подтверждения и прошло > 30 минут - pay_cancel
            return pay_cancel(id, attr);
          }
        }
        log(pay);
      });
  }

  route.pay = async function pay({req, res, fin_err}) {
    const {parsed, body} = req;
    const provider = parsed.paths[2];
    const action = parsed.paths[3];

    if(provider !== 'sber') {
      return res.end(JSON.stringify({error: true, reason: 'provider must be "sber"'}));
    }

    // https://securepayments.sberbank.ru/wiki/doku.php/integration:api:rest:requests:register

    if(!action) {
      res.setHeader('Content-Type', 'application/json');
      if(!body) {
        return res.end(JSON.stringify({error: true, reason: 'empty body'}));
      }
      check_auth(req)
        .then((user) => {
          return cache.register(user, body);
        })
        .then((id) => {
          sber_register(id, body)
            .then((fres) => fres.body.pipe(res));
        })
        .catch(fin_err);
    }
    else {
      let ref = 'list';
      const fin = () => {
        res.writeHead(301, {Location: `${quick_url}/doc.calc_order/${ref}?action=${action}`});
        res.end();
      }
      const id = parsed.paths[4];
      cache.get(id)
        .then((attr) => {
          ref = attr.ref;
          return action === 'success' ? pay_fin(id, attr) : pay_cancel(id, attr);
        })
        .then(fin)
        .catch(fin);

      // res.setHeader('Content-Type', 'text/html; charset=utf-8');
      // res.end(`<script type="text/javascript">setTimeout(function() {window.close();}, 10);</script>`);
      // const ref = parsed.paths[4];
      // const evt_id = parsed.paths[5];
      // if(action === 'success') {
      //   notify({action, ref, evt_id});
      // }
    }

  };
}
