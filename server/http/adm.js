/**
 * Обрабатывает запросы в иерархии /adm/
 * @module get
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

const {end404, end500} = require('./end');

module.exports = function ($p, log) {

  const {cat, cch, utils} = $p;
  const route = {};

  // подключаем плагины
  require('wb-reports')($p, log, route);
  require('wb-parametric')($p, log, route);
  require('wb-paperless/server')($p, log, route);
  require('./planning')($p, log, route);
  require('./supplier')($p, log, route);
  require('./foroom')($p, log, route);
  require('./calc_stat')($p, log, route);

  // формирует json описания продукции заказа
  async function ram_data(req, res) {
    const {user, parsed: {query, path, paths}} = req;
    const {branch, subscribers} = user;
    switch (paths[3]){
    case 'all':
      const docs = [];
      const push = (v) => {
        const tmp = JSON.parse(JSON.stringify(v));
        const doc = utils._mixin({}, tmp, null, ['ref','acl']);
        doc._id = `${v.class_name}|${v.ref}`;
        docs.push(doc);
      };
      for(const name of 'property_values,abonents,servers,branches,users,scheme_settings,color_price_groups'.split(',')) {
        cat[name].forEach(push);
      }
      cch.properties.find_rows({parent: {nin: [cat.formulas.predefined('modifiers'), cat.formulas.predefined('printing_plates')]}}, push);
      cch.properties.forEach(push);

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
        return route.r(req, res);
      }
      if (paths[0] === 'prm' || paths[2] === 'prm') {
        return route.prm(req, res);
      }

      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      switch (paths[2]) {
      case 'ram':
        return ram_data(req, res);

      default:
        if(route[paths[2]]) {
          return route[paths[2]](req, res);
        }
        else {
          end404(res, `${paths[0]}/${paths[1]}/${paths[2]}`);
        }
      }
    }
    catch (err) {
      end500({req, res, err, log});
    }

  };
};
