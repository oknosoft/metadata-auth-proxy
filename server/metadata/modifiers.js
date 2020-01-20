// модификаторы объектов и менеджеров данных

module.exports = function ($p, log) {
  require('./catalogs/cat_users')($p, log);
  require('./catalogs/cat_nom')($p, log);
}
