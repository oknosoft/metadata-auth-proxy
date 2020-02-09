/**
 * записывает или читает лог сканирований
 *
 * @module scan
 *
 * Created by Evgeniy Malyarov on 09.02.2020.
 */

const {end404} = require('./end');
const getBody = require('./raw-body');

module.exports = function bar($p, log) {

  const {job_prm: {user_node: auth, server}, adapters: {pouch}, classes: {PouchDB}} = $p;
  if(!pouch.remote.events) {
    pouch.remote.events = new PouchDB(server.eve_url, {skip_setup: true, owner: pouch, adapter: 'http', auth});
  }

  return async function bar(req, res) {

    const {user, parsed: {query, path, paths}, method} = req;
    if(method === 'GET') {
      if(!query.period || !['month','week'].includes(query.period)) {
        query.period = 'day';
      }
      if(query.bar) {
        return Promise.resolve({ok: true})
          .then((rsp) => {
            res.end(JSON.stringify(rsp));
          });
      }
      else if(query.user) {
        return pouch.remote.events.query('events', {
          reduce: true,
          startkey: [],
          endkey: [],
        });
      }
      else {
        end404(res, `${method} ${path} ${JSON.stringify(query)}`);
      }
    }
    else if(method === 'PUT' || method === 'POST') {
      return getBody(req)
        .then((body) => {
          const doc = JSON.parse(body);
          const barcode = `bar|${doc._id.substr(18)}`;
          return pouch.remote.events.put(doc)
            .then((rsp) => {
              return pouch.remote.bars[0].get(`_local/${barcode}`);
            })
            .catch(() => {
              return pouch.remote.events.get(barcode);
            })
            .then((rsp) => {
              res.end(JSON.stringify(rsp));
            });
        });
    }
    else {
      end404(res, `${method} ${path}`);
    }
  };
}
