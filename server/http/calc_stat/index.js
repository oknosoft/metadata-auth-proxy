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
  const reg = require('./reg_calc_order_stat')($p, log, accumulation)

  return async function calc_stat(req, res) {
    const {query, path, paths} = req.parsed;

    switch (paths[3]){
    case 'reg':
      return await reg(req, res);

    default:
      end404(res, path);
    }
  }

}
