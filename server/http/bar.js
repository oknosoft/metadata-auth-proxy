/**
 * записывает или читает расшифровку штрихкода для безбумажки
 *
 * @module bar
 *
 * Created by Evgeniy Malyarov on 09.02.2020.
 */

const {end404} = require('./end');
const getBody = require('./raw-body');

module.exports = function bar($p, log) {

  const {job_prm: {user_node: auth, server}, adapters: {pouch}, classes: {PouchDB}} = $p;
  if(!pouch.remote.bars) {
    pouch.remote.bars = server.bar_urls.map((url) => new PouchDB(url, {skip_setup: true, owner: pouch, adapter: 'http', auth}));
  }
  if(!pouch.remote.events) {
    pouch.remote.events = new PouchDB(server.eve_url, {skip_setup: true, owner: pouch, adapter: 'http', auth});
  }

  return async function bar(req, res) {

    const {user, parsed: {query, path, paths}, method} = req;
    if(method === 'GET') {
      let ok;
      const id = decodeURIComponent(path.split('api/bar/')[1]);
      for(const db of pouch.remote.bars) {
        try {
          const doc = await db.get(id);
          res.end(JSON.stringify(doc));
          ok = true;
          break;
        }
        catch(err) {
          log(err);
        }
      }
      if(!ok) {
        try {
          const doc = await pouch.remote.events.get(id.replace('_local/', ''));
          res.end(JSON.stringify(doc));
          ok = true;
        }
        catch(err) {
          log(err);
        }
      }
      if(!ok) {
        throw {status: 404, message: `not found '${id}'`};
      }
    }
    else if(method === 'PUT') {
      return getBody(req)
        .then((body) => {
          const doc = JSON.parse(body);
          doc._id = doc._id.replace('_local/', '');
          return pouch.remote.events.get(doc._id)
            .then((ndoc) => {
              doc._rev = ndoc.rev;
            })
            .catch(() => null)
            .then(() => pouch.remote.events.put(doc))
            .then((rsp) => {
              res.end(JSON.stringify(rsp));
            })
            .catch((err) => {
              throw err;
            });
        });
    }
    else {
      end404(res, `${method} ${path}`);
    }
  };
};
