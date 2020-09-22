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
const simple_work_centers = [
  '3d3e6578-e1fb-11e9-80c8-f533ba8337f6', // Сварка
  'dfe52f0a-e1fb-11e9-80c8-f533ba8337f6', // Фрезеровка импоста
  '35c4c0a8-e1fe-11e9-80c8-f533ba8337f6', // Порезочный стол
  'd03fe177-b07d-11ea-80cb-dff6ed303e34', // Москитка
];

module.exports = function nearest_date({doc, acc, moment}) {
  return acc.client.query(`select balance from work_centers_balance where work_center in (${simple_work_centers.map(v => `'${v}'`).join(',')});`)
    .then(({rows}) => {
      let date = moment().add(20, 'days').format('YYYY-MM-DD');
      if(rows.length) {
        const counter = rows[0].balance.length;
        for(let i=0; i<counter; i++) {
          let d;
          if(rows.every(({balance}) => {
            if(!d) {
              d = balance[i].date;
            }
            if(balance[i].date !== d) {
              return false;
            }
            if(balance[i].percent > 2 && balance[i].debt > 0) {
              return true;
            }
          })) {
            date = moment(rows[0].balance[i].date).format('YYYY-MM-DD');
            break;
          }
        }
      }
      return date;
    });
}
