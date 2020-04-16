/**
 *
 *
 * @module index
 *
 * Created by Evgeniy Malyarov on 14.04.2020.
 */

const Accumulation = require('./accumulation');

module.exports = function calc_stat($p, log) {

  const accumulation = new Accumulation();
  accumulation.init();
  const reg = require('./calc_order_reg')($p, log, accumulation);
  const query = require('./calc_order_query')($p, log, accumulation);

  return function calc_stat(req, res) {
    const {path, paths} = req.parsed;

    switch (paths[3]){
    case 'reg':
      return reg(req, res);

    case 'query':
      return query(req, res);

    default:
      end404(res, path);
    }
  }

}
