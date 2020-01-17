/**
 * Обрабатывает запросы в иерархии /adm/
 * @module get
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

const {end404, end500} = require('./end');
const getBody = require('./raw-body');


module.exports = function ($p, log) {

  const {cat, utils, job_prm: {user_node: auth, server}, adapters: {pouch}, classes: {PouchDB}} = $p;


  // формирует json описания продукции заказа
  async function ram_data(req, res) {
    const {user, parsed: {query, path, paths}} = req;
    const {branch, subscribers} = user;
    switch (paths[3]){
    case 'all':
      const docs = [];
      const push = (v) => {
        const doc = utils._mixin({}, v, null, ['ref', 'acl']);
        doc._id = `${v.class_name}|${v.ref}`;
        docs.push(doc);
      }
      cat.abonents.alatable.forEach(push);
      cat.servers.alatable.forEach(push);
      cat.branches.alatable.forEach(push);
      cat.users.alatable.forEach(push);
      cat.scheme_settings.alatable.forEach(push);
      res.end(JSON.stringify({
        ok: true,
        docs,
      }));

    default:
      end404(res, `${paths[0]}/${paths[1]}/${paths[2]}/${paths[3]}`);
    }
  }

  // записывает расшифровку штрихкода для безбумажки
  async function bar(req, res) {

    if(!pouch.remote.bars) {
      pouch.remote.bars = server.bar_urls.map((url) => new PouchDB(url, {skip_setup: true, owner: pouch, adapter: 'http', auth}));
    }

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
        throw {status: 404, message: `not found '${id}'`};
      }
    }
    else if(method === 'PUT') {
      return getBody(req)
        .then((body) => {
          const doc = JSON.parse(body);
          let queue = Promise.resolve();
          pouch.remote.bars.forEach((db, index) => {
            queue = queue.then(() => {
              return db.put(doc)
                .then((rsp) => {
                  if(index === 0) {
                    res.end(JSON.stringify(rsp));
                  }
                })
                .catch((err) => {
                  if(index === 0) {
                    throw err;
                  }
                });
            });
          });
          return queue;
        });
    }
    else {
      end404(res, `${method} ${path}`);
    }
  }

  return async (req, res) => {
    const {query, path, paths} = req.parsed;
    res.setHeader('Content-Type', 'application/json');

    try{
      switch (paths[2]){
      case 'ram':
        return ram_data(req, res);

      case 'bar':
        return bar(req, res);

      default:
        end404(res, `${paths[0]}/${paths[1]}/${paths[2]}`);
      }
    }
    catch(err){
      end500({res, err, log});
    }

  };
};
