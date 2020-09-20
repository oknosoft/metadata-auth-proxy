
const Accumulation = require('./accumulation');

module.exports = function calc_stat($p, log, route) {
  const acc = new Accumulation();
  acc.init();

  require('./delivery')({$p, log, route, acc});
  require('./work_centers_balance')({$p, log, route, acc});
}
