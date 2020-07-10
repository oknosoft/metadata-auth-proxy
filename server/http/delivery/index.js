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
    start = moment(start);
    const route = delivery_scheme.route({warehouse, delivery_area});
    if(!route || !route.length) {
      const err = new Error(`Нет доставки в район '${delivery_area.name}'`);
      err.status = 400;
      throw err;
    }
    for (let i = 0; i < route.length; i++) {
      const curr = route[i];
      const prev = i > 0 && route[i - 1];
      const {warehouse} = curr;
      const delivery_area = curr.chain_area.empty() ? curr.delivery_area : curr.chain_area;
      if(prev) {
        const dates = new Set();
        for(const date of prev.runs) {
          const astart = moment(date).add(warehouse.assembly_days || 0, 'days');
          delivery_schedules
            .runs({warehouse, delivery_area})
            .forEach((date) => astart.isBefore(date) && dates.add(date));
          if(dates.size > 3) {
            break;
          }
        }
        curr.runs = Array.from(dates);
        //curr.runs.sort((a, b) => a - b);
      }
      else {
        curr.runs = delivery_schedules.runs({warehouse, delivery_area}).filter((date) => start.isBefore(date));
      }
    }
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
