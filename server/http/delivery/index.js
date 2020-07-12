/**
 * Created 09.07.2020.
 */

module.exports = function delivery($p, log) {

  const {utils: {getBody, moment}, cat: {stores, delivery_areas}, ireg: {delivery_schedules, delivery_scheme}} = $p;

  return async function delivery(req, res) {

    const result = {duration: Date.now()};

    const body = await getBody(req);
    let {warehouse, delivery_area, start, pickup} = JSON.parse(body);
    warehouse = stores.get(warehouse);
    delivery_area = delivery_areas.get(delivery_area);
    const route = delivery_schedules.apply_schedule(delivery_scheme.route({warehouse, delivery_area}), moment(start));
    const first = route[0];
    const last = route[route.length - 1];

    if(!last.runs || !last.runs.length) {
      const err = new Error(`Нет доставки в район '${delivery_area.name}' на ближайшие даты`);
      err.status = 400;
      throw err;
    }

    result.duration = Date.now() - result.duration;
    Object.assign(result, {
      start: moment(first.runs[0]).format('YYYY-MM-DD'),
      finish: moment(last.runs[0]).format('YYYY-MM-DD'),
      route: route.map(({warehouse, delivery_area, chain_area, runs}) => ({
        warehouse: warehouse.ref,
        delivery_area: (chain_area.empty() ? delivery_area : chain_area).ref,
        runs: runs.filter((v, i) => i < 3).map((v) => moment(v).format('YYYY-MM-DD')),
      }))
    });

    res.end(JSON.stringify(result));
  }

}
