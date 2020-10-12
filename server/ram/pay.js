/**
 * Created 09.09.2020.
 */

const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = function pay($p, log, route) {

  const {
    utils: {moment},
    job_prm: {server: {upp, port, quick_url}},
    cat: {branches},
    doc: {calc_order, credit_card_order},
  } = $p;

  // оповещает клиентский поток об изменениях
  // TODO заменить на регистрацию клиента и обход зарегистрированных для поддержки многопоточности
  function notify({action, ref, evt_id}) {
    fetch(`http://localhost:${port}/couchdb/events/pay`, {
      method: 'POST',
      body: JSON.stringify({action, ref, evt_id}),
    })
      .catch((err) => null);
  }

  route.pay = async function pay({req, res}) {
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
      const common_url = `${upp.sber.cburl}/couchdb/common/pay/sber/`;
      const rData = {
        userName: upp.sber.username,
        password: upp.sber.password,
        orderNumber: `${body.number_internal || body.number_doc || body.ref}-${moment().format('YYYYMMDDHHmm')}`,
        amount: 100,
        currency: 643,
        language: 'ru',
        returnUrl: `${common_url}success/${body.ref}/${body.branch}/100`,
        failUrl: `${common_url}fail/${body.ref}/${body.branch}`,
        //description: 'Описание заказа',
        jsonParams: JSON.stringify({orderNumber: `${body.number_internal || body.number_doc} ${body.client_of_dealer}`}),
        pageView: body.pageView,
        email: body.email,
        sessionTimeoutSecs: 300,
      };
      const postData = querystring.stringify(rData);
      fetch(upp.sber.url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': postData.length
        },
        body: postData,
      })
        .then((fres) => fres.body.pipe(res))
        .catch((err) => {
          throw err;
        });
    }
    else {
      const fin = () => {
        res.writeHead(301, {Location: `${quick_url}/doc.calc_order/${parsed.paths[4]}?action=${action}`});
        res.end();
      }
      if(action === 'success') {
        const db = branches.get(parsed.paths[5]).db('doc');
        const amount = parseFloat(parsed.paths[6]) / 100;
        const order = calc_order.create({ref: parsed.paths[4]}, false, true);
        calc_order.adapter.load_obj(order, {db})
          .then((doc) => {
            const card_order = credit_card_order.create({
              organization: doc.organization,
              partner: doc.partner,
            });
            // создадим приходник

            // проведём документ и запустим процесс в 1C
            fin();
          })
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
