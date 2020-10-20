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

  // в этом объекте живут методы чтения и установки сеансов оплаты и watchdog отложенной обработки
  const cache = {
    sessions: {

    },
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
          for(const {doc} of rows) {
            const {_id, _rev, ...data} = doc;
            const id = _id.split('|')[1];
            if(id) {
              if(init) {

              }
              else {

              }
              this.sessions[id] = data;
            }
          }
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
        moment: Date.now(),
      };
      this.sessions[id] = data;
      return pouch.remote.ram.put(Object.assign({_id: `_local/pay|${id}`}, data))
        .then(() => id);
    },
    get(id) {
      return Promise.resolve(this.sessions[id]);
    },
    remove(id) {
      delete this.sessions[id];
      const doc = {_id: `_local/pay|${id}`};
      return pouch.remote.ram.get(doc._id)
        .then((_rev) => {
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

  function query_1c({ref, id}) {

    const body = {
      order_id: ref,
      CallBackLink: {
        server: upp.cbserver,
        port: upp.cbport,
        login: '',
        password: '',
        link: `/couchdb/common/upp_calc_order/${id}`,
      }
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        fetch(upp.url, {
          method: 'POST',
          headers: cache.headers,
          body: JSON.stringify(body),
        })
          .then(resolve);
      }, 20000);
      setTimeout(reject, 90000);
    })
      .then(res => {
        if(res.status > 201) {
          log(`Ошибка сервера 1С '${res.statusText}'`);
        }
        return res.json();
      })
      .then(body => {
        log(body);
        if(body.error_code) {
          return Promise.reject(body);
        }
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fetch(upp.url.replace('loadAndCalcOrder', 'startOrder'), {
              method: 'POST',
              headers: cache.headers,
              body: JSON.stringify(body),
            })
              .then(resolve)
              .catch((err) => {
                log(err);
                reject(err);
              });
          }, 20000);
          setTimeout(reject, 90000);
        });
      });
  }

  function pay_fin(id) {

    return cache.get(id)
      .then((attr) => {
        let {ref, branch, amount} = attr;
        const db = branches.get(branch).db('doc');
        const order = calc_order.create({ref}, false, true);
        //amount = parseFloat(amount) / 100;

        return calc_order.adapter.load_obj(order, {db})
          .then((doc) => {
            // создадим приходник
            const card_order = credit_card_order.create({
              organization: doc.organization,
              partner: doc.partner,
              department: doc.department,
              doc_amount: amount,
              responsible: doc.manager,
              date: new Date(),
              number_doc: `${doc.number_internal}-${(Math.random() * 1e6).toFixed(0).substr(0,4)}`,
              payment_details: [{
                trans: doc.ref,
                cash_flow_article: cash_flow_articles.by_name('Оплата покупателя'),
                amount
              }],
            }, false, true);

            // проведём документы и запустим процесс в 1C
            return card_order.save(true)
              .then(() => doc.save(true, false, undefined, {db}))
              .then(() => {
                // реплицируем документы в центральную базу
                const doc_ids = [`doc.calc_order|${doc.ref}`, `doc.credit_card_order|${card_order.ref}`];
                doc.production.forEach(({characteristic}) => {!characteristic.empty() && doc_ids.push(`cat.characteristics|${characteristic.ref}`)});
                //return db.replicate.to(calc_order.adapter.remote.doc, {doc_ids});
              })
              .then(() => {
                // запрос к УПП с указанием запустить в работу
                query_1c({ref: doc.ref, id})
                  .catch(log);
              })
              .catch(log);

          });
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

          const common_url = `${upp.sber.cburl}/couchdb/common/pay/sber/`;
          const amount = 100;
          const rData = {
            userName: upp.sber.username,
            password: upp.sber.password,
            orderNumber: `${body.number_internal || body.number_doc || body.ref}-${utils.moment().format('MMDDHHmm')}`,
            amount,
            currency: 643,
            language: 'ru',
            returnUrl: `${common_url}success/${id}`,
            failUrl: `${common_url}fail/${id}`,
            //description: 'Описание заказа',
            jsonParams: JSON.stringify({orderNumber: `${body.number_internal || body.number_doc} ${body.client_of_dealer}`}),
            pageView: body.pageView,
            email: body.email,
            sessionTimeoutSecs: 300,
          };
          const postData = querystring.stringify(rData);

          //--
          // return pay_fin(id)
          //   .then(() => {
          //     fin_err({message: 'debug'});
          //   });
          //--

          fetch(upp.sber.url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': postData.length
            },
            body: postData,
          })
            .then((fres) => fres.body.pipe(res));

        })
        .catch(fin_err);
    }
    else {
      const fin = () => {
        res.writeHead(301, {Location: `${quick_url}/doc.calc_order/${parsed.paths[4]}?action=${action}`});
        res.end();
      }
      if(action === 'success') {
        pay_fin(parsed.paths[4])
          .tnen(fin)
          .catch(fin);
      }
      else {
        fin();
      }
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
