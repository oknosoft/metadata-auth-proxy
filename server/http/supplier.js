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
    end404(res, `unknown supplier`);
  }
}
