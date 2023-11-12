/**
 *
 *
 * @module calc_order_query
 *
 * Created by Evgeniy Malyarov on 16.04.2020.
 */


function select(acc, date) {
  return acc.client.query(`select date, department, partner, manager, doc calc_order, nom, sys,
  sum(case when state = 0 then quantity else 0 end) q0,
  sum(case when state = 1 then quantity else 0 end) q1,
  sum(case when state = 0 then s else 0 end) s0,
  sum(case when state = 1 then s else 0 end) s1,
  sum(case when state = 0 then amount else 0 end) a0,
  sum(case when state = 1 then amount else 0 end) a1
  from calc_stat
  where date = $1
  group by date, department, partner, manager, calc_order, nom, sys`, [date]);
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
