// модификаторы объектов и менеджеров данных


module.exports = function ($p, log) {
  $p.utils.end = require('../http/end');
  $p.utils.getBody = require('../http/raw-body');
  require('wb-core/dist/node')($p, log);
  require('./documents/server_doc_calc_order')($p, log);
  require('./catalogs/server_cat_characteristics')($p, log);
  require('./catalogs/server_cat_users')($p, log);
  require('./catalogs/server_cat_nom')($p, log);
  require('../../src/metadata/catalogs/cat_clrs')($p);

  $p.patchCatUsers();
}
