/**
 * Created 09.07.2020.
 */

const fetch = require('node-fetch');
const nearest_date = require('./nearest_date');

module.exports = function delivery({$p, log, route, acc}) {

  const {
    utils: {getBody, moment},
    job_prm: {server: {common_url, upp}},
    cat: {stores, delivery_areas},
    ireg: {delivery_schedules, delivery_scheme}
  } = $p;

  const from_cache = (req) => {
    return fetch(`${common_url}/couchdb/common/upp_calc_order`, {
      method: 'POST',
      headers: req.headers,
      body: JSON.stringify({
        use_cache: true,
        ref: upp.order,
      }),
    })
      .then((res) => res.json());
  };

  const fin500 = () => {
    const err = new Error(`Сервер 1С не отвечает, повторите запрос позже`);
    err.status = 500;
    throw err;
  };

  route.plan = async function delivery(req, res) {

    const result = {duration: Date.now()};

    const doc = JSON.parse(await getBody(req));
    let {warehouse, delivery_area, start, use_cache} = doc;

    const ndate = await nearest_date(doc, acc);

    if(use_cache) {
      try {
        const cache = await from_cache(req);
        if(cache.error && cache.message) {
          fin500();
        }
        start = cache.manufacture_date;
      }
      catch (err) {
        fin500();
      }
    }
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
  };
  route.planning = route.plan;

}
