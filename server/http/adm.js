/**
 * Обрабатывает запросы в иерархии /adm/
 * @module get
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

const {end404, end500} = require('./end');

module.exports = function ($p, log) {

  const {cat, utils} = $p;

  const bar = require('paperless/server/bar')($p, log);
  const scan = require('paperless/server/scan')($p, log);
  const reports = require('reports/server')($p, log);
  const supplier = require('./supplier')($p, log);
  const foroom = require('./foroom')($p, log);
  const stat = require('./calc_stat')($p, log);

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
      };
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

  return async (req, res) => {
    const {query, path, paths} = req.parsed;

    try {
      if (paths[0] === 'r' || paths[2] === 'r') {
        return reports(req, res);
      }

      res.setHeader('Content-Type', 'application/json');
      switch (paths[2]) {
      case 'ram':
        return ram_data(req, res);

      case 'bar':
        return bar(req, res);

      case 'scan':
        return scan(req, res);

      case 'supplier':
        return supplier(req, res);

      case 'foroom':
        return foroom(req, res);

      case 'stat':
        return stat(req, res);

      default:
        end404(res, `${paths[0]}/${paths[1]}/${paths[2]}`);
      }
    } catch (err) {
      end500({res, err, log});
    }

  };
};
