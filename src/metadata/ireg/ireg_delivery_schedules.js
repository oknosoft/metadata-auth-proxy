/**
 * Расписание доставки
 *
 * @module ireg_delivery_schedules
 *
 * Created 09.07.2020.
 */

exports.IregDelivery_schedulesManager = class IregDelivery_schedulesManager extends Object {

  constructor(...attr) {
    super(...attr);
    this.by_store = new Map();
  }

  /**
   * Ищет записи маршрута
   * @param warehouse
   * @param delivery_area
   * @return {Array}
   */
  runs({warehouse, delivery_area}) {
    const runs = this.by_store.get(warehouse).get(delivery_area);
    return runs || [];
  }

  /**
   * Дополняет маршрут доступными датами
   * @param route {Array}
   * @param start {Moment}
   * @return {*}
   */
  apply_schedule(route, start) {
    for (let i = 0; i < route.length; i++) {
      const curr = route[i];
      const prev = i > 0 && route[i - 1];
      const {warehouse} = curr;
      const delivery_area = curr.chain_area.empty() ? curr.delivery_area : curr.chain_area;
      if(prev) {
        const dates = new Set();
        const curr_runs = this.runs({warehouse, delivery_area});
        for(const date of prev.runs) {
          const astart = moment(date).add(warehouse.assembly_days || 0, 'days');
          for(const curr_date of curr_runs) {
            if(astart.isBefore(curr_date)) {
              dates.add(curr_date);
              break;
            }
          }
          if(dates.size > 4) {
            break;
          }
        }
        curr.runs = Array.from(dates);
      }
      else {
        curr.runs = this.runs({warehouse, delivery_area}).filter((date) => start.isBefore(date));
      }
    }
    return route;
  }

  // переопределяем load_array
  load_array(aattr, forse) {
    const {utils: {moment}, job_prm, cat: {delivery_areas, stores}} = this._owner.$p;
    if(job_prm.is_common) {
      return;
    }
    const from = moment().subtract(3, 'days');
    const to = moment().add(3, 'months');
    const elmnts = [];
    for (const row of aattr) {
      // отрезаем старые и слишком новые даты
      const parts = row.ref.split('¶');
      if(parts[2]) {
        const mdate = moment(parts[2]);
        if(mdate.isValid() && mdate.isBetween(from, to)) {
          elmnts.push({
            warehouse: stores.get(parts[0]),
            area: delivery_areas.get(parts[1]),
            date: parts[2],
            start: row.start,
          });
        }
      }
    }

    // структурируем кеш
    const warehouses = new Map();
    for(const {warehouse, area, date, start} of elmnts) {
      let by_area = this.by_store.get(warehouse);
      if(!by_area) {
        by_area = new Map();
        this.by_store.set(warehouse, by_area);
      }
      let dates = by_area.get(area);
      if(!dates) {
        dates = [];
        by_area.set(area, dates);
      }
      const index = dates.indexOf(date);
      if(start) {
        index === -1 && dates.push(date);
      }
      else {
        index !== -1 && dates.splice(index, 1);
      }

      // структура для сортировки
      if(!warehouses.get(warehouse)) {
        warehouses.set(warehouse, new Set());
      }
      warehouses.get(warehouse).add(area);
    }

    // сортируем
    for(const [warehouse, areas] of warehouses) {
      const by_area = this.by_store.get(warehouse);
      for(const area of areas) {
        by_area.get(area).sort();
      }
    }

  }

}
