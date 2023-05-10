/**
 * Шаблоны возвращаем из памяти, в couchdb не ходим
 *
 * @module templates
 *
 * Created by Evgeniy Malyarov on 19.01.2022.
 */

module.exports = function ({cat}, log) {

  return function templates({req, res, target}) {
    const {paths} = req.parsed;
    if(req.method === 'GET' && paths[paths.length-1].includes('cat.characteristics')) {
      const ref = paths[paths.length-1].replace('%7C', '|').substring(20);
      const o = cat.characteristics.by_ref[ref];
      if(o && o.obj_delivery_state == 'Шаблон') {
        res.setHeader('Via', 'templates');
        res.end(JSON.stringify(o));
        return true;
      }
    }
  };
}
