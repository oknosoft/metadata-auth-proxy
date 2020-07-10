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

  runs({warehouse, delivery_area}) {
    const runs = this.by_store.get(warehouse).get(delivery_area);
    // if(!runs || !runs.length) {
    //   const err = new Error(`Нет доставок со склада ${warehouse} в зону ${delivery_area} на ближайшие даты`);
    //   err.status = 400;
    //   throw err;
    // }
    return runs || [];
  }

  // переопределяем load_array
  load_array(aattr, forse) {
    const {utils: {moment}, job_prm, cat: {delivery_areas, stores}} = this._owner.$p;
    if(job_prm.is_common) {
      return;
    }
    const from = moment().subtract(3, 'days');
    const to = moment().add(2, 'months');
    const elmnts = [];
    for (const row of aattr) {
      // отрезаем старые и слишком новые даты
      const parts = row.ref.split('¶');
      if(parts[2] && row.start) {
        const mdate = moment(parts[2]);
        if(mdate.isValid() && mdate.isBetween(from, to)) {
          elmnts.push({
            warehouse: stores.get(parts[0]),
            area: delivery_areas.get(parts[1]),
            date: mdate.toDate(),
          });
        }
      }
    }
    // метод по умолчанию
    //elmnts.length && super.load_array(elmnts, forse);

    // структурируем кеш
    const warehouses = new Map();
    for(const {warehouse, area, date} of elmnts) {
      let by_area = this.by_store.get(warehouse);
      if(!by_area) {
        by_area = new Map();
        this.by_store.set(warehouse, by_area);
      }
      if(!by_area.get(area)) {
        by_area.set(area, []);
      }
      by_area.get(area).push(date);
      //
      if(!warehouses.get(warehouse)) {
        warehouses.set(warehouse, new Set());
      }
      warehouses.get(warehouse).add(area);
    }
    // сортируем
    for(const [warehouse, areas] of warehouses) {
      const by_area = this.by_store.get(warehouse);
      for(const area of areas) {
        by_area.get(area).sort((a, b) => a - b);
      }
    }

  }

}
