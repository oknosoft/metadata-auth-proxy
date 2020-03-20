/**
 * Запрос к сервису поставщика с внешним API
 *
 * @module supplier
 *
 * Created by Evgeniy Malyarov on 13.03.2020.
 */

const {end404} = require('./end');
const getBody = require('./raw-body');
const fetch = require('node-fetch');

module.exports = function supplier($p, log) {

  const {http_apis, abonents} = $p.cat;

  return async function supplier(req, res) {
    const {user, parsed: {path, paths}, method, headers} = req;
    const supplier = http_apis.get(paths[3]);
    if(supplier.is_new() || supplier.empty()) {
      return end404(res, `${method} ${path}`);
    }
    const abonent = abonents.by_id(headers.zone);
    if(abonent.is_new() || abonent.empty()) {
      return end404(res, `empty abonent`);
    }
    const arow = abonent.http_apis.find({is_supplier: supplier});
    if(!arow) {
      return end404(res, `supplier not found in abonent.http_apis`);
    }
    const {partner, server} = arow;
    const doc = await getBody(req).then(JSON.parse);
    if(supplier.name === 'Кристаллит') {
      const [username, suffix] = server.username.split(':');
      const opts = {
        method: 'POST',
        headers: {Authorization: `Basic ${new Buffer(username + ':' + server.password, 'utf8').toString('base64')}`, suffix},
        body: JSON.stringify({
          ref: doc.ref,
          number_doc: doc.number_doc,
          date: doc.date,
          obj_delivery_state: 'Черновик',
          partner: doc.partner,
          production: doc.goods.map((row) => {
            const params = JSON.parse(row.params);
            return Object.assign({
              nom: row.identifier,
              quantity: row.quantity,
              note : row.note,
            }, params);
          })
        }),
      };
      return fetch(`${server.http}/prm/doc.calc_order/${doc.ref}`, opts)
        .then((prs) => {
          prs.body.pipe(res);
        });
    }
    else if(supplier.name === 'FOROOM') {
      const payload = {
        name: 'unpete',
        email: 'unpete@yandex.ru',
        phone: '+73519093591',
        num: doc.ref,
        items: doc.goods.map((row) => {
          const params = JSON.parse(row.params);
          const ids = row.identifier.split('|');
          const common = {
            type: ids[1],
            subtype: ids[2],
            amount: row.quantity,
          }
          // width - ширина по замеру
          // height - высота по замеру
          return Object.assign(common, params);
        })
      };
      const body = `--WebAppBoundary
Content-Disposition: form-data; name="auth";
Content-Type: application/json

{"login":"${server.username}","hash":"${server.password}"}
--WebAppBoundary
Content-Disposition: form-data; name="data";
Content-Type: application/json

%%%
--WebAppBoundary--
`;
      const opts = {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data; boundary=WebAppBoundary'},
        body: body.replace('%%%', JSON.stringify(payload)),
      };
      return fetch(`${server.http}?action=create_request`, opts)
        .then((prs) => prs.json())
        .then((data) => {
          opts.body = body.replace('%%%', JSON.stringify({request_id: data.data.request_id}));
          return fetch(`${server.http}?action=create_order`, opts);
        })
        .then((prs) => prs.json())
        .then((data) => {
          data = null;
          res.end(JSON.stringify({ok: true}));
        });
    }
    end404(res, `unknown supplier`);
  }
}
