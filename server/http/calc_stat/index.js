/**
 * Created 14.04.2020.
 */

module.exports = function calc_stat($p, log, route) {

  if(process.env.CALC_STAT) {
    const Accumulation = require('./accumulation');
    const acc = new Accumulation();
    acc.init();
    const reg = require('./calc_order_reg')($p, log, acc);
    const query = require('./calc_order_query')($p, log, acc);

    route.stat = function calc_stat(req, res) {
      const {path, paths} = req.parsed;

      switch (paths[3]){
        case 'reg':
          return reg(req, res);

        case 'query':
          return query(req, res);

        default:
          end404(res, path);
      }
    };
  }

};
