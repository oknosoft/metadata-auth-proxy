/**
 * Возаращает ближайшую дату производства для изделий текущего заказа
 *
 * @module nearest_date
 *
 * Created by Evgeniy Malyarov on 20.09.2020.
 */

/**
 * В упрощенной схеме, просто ищем дату, для которой есть мошности для массива типовых рабочих центров
 */

const simple_work_centers = ['3d3e6578-e1fb-11e9-80c8-f533ba8337f6'];

module.exports = function nearest_date(doc, acc) {
  return acc.client.query(`select balance from work_centers_balance where work_center in (${simple_work_centers.join(',')});`)
    .then((res) => {
      return res.rows;
    });
}
