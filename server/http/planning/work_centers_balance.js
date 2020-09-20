/**
 * записывает и возвращает остатки мощностей производства
 *
 * @module work_centers_balance
 *
 * Created by Evgeniy Malyarov on 20.09.2020.
 */

function upsert(acc, {work_center, balance}) {
  return acc.client.query(`INSERT INTO work_centers_balance (work_center, balance) VALUES ($1, $2)
      ON CONFLICT (work_center) DO UPDATE SET work_center = EXCLUDED.work_center, balance = EXCLUDED.balance;`,
    [work_center, JSON.stringify(balance)]);
}

module.exports = function work_centers_balance({$p, log, route, acc}) {

  const {getBody} = $p.utils;

  route.work_centers_balance = async function work_centers_balance(req, res) {
    const body = await getBody(req);
    const work_centers = new Map();
    for(const {work_center, date, debt, balance} of JSON.parse(body)) {
      if(!work_centers.has(work_center)) {
        work_centers.set(work_center, []);
      }
      const arr = work_centers.get(work_center);
      arr.push({date, debt, balance, percent: (balance * 100 / debt).round()});
    }
    for(const [work_center, balance] of work_centers) {
      await upsert(acc, {work_center, balance});
    }
    res.end(JSON.stringify({ok: true}));
  };

};
