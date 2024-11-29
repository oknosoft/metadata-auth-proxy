/**
 * Возвращает пачку эскизов изделий заказа
 *
 * @module svgs
 *
 * Created by Evgeniy Malyarov on 16.01.2022.
 */

module.exports = function ({doc, pouch, utils}, log) {

  return function pgsql({req, res}) {
    const {paths} = req.parsed;
    const index = paths.indexOf('pgsql');
    if(index >= 0 && utils.route.pgsql[paths[index+1]]) {
      utils.route.pgsql[paths[index+1]](req, res);
      return true;
    }
  };
}
