/**
 * Формирует массив цен для номенклатуры отдела
 *
 * @module prices
 *
 * Created by Evgeniy Malyarov on 17.10.2019.
 */

const {resolve} = require('path');
const fs = require('fs');

module.exports = function prices({res, zone, suffix}) {
  res.write(JSON.stringify({zone, suffix, prices: []}));
  res.end();
};
