/**
 *
 *
 * @module calc_order_query
 *
 * Created by Evgeniy Malyarov on 16.04.2020.
 */


function select(acc, date) {
  return acc.client.query(`select date, state, department, manager, nom, sys, sum(quantity) quantity, sum(s) s, sum(amount) amount
    from calc_stat where date = $1
    group by date, state, department, manager, nom, sys`, [date]);
}

module.exports = function query($p, log, acc) {

  return async function query(req, res) {
    if(!req.user.roles.includes('doc_full')) {
      throw new Error('Отчет только для полноправных пользователей');
    }
    const {paths} = req.parsed;
    const result = await select(acc, paths[4]);
    res.end(JSON.stringify(result.rows));
  }
}
