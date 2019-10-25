// модификаторы объектов и менеджеров данных

module.exports = function ($p) {
  require('./catalogs/cat_users')($p);
  require('./catalogs/cat_nom')($p);
}
