/**
 * Добавляет заголовок с числом элементов справочников
 *
 * @module manifest
 *
 * Created by Evgeniy Malyarov on 06.10.2019.
 */

const {resolve} = require('path');
const fs = require('fs');

module.exports = function manifest({res, zone, suffix, by_branch, common}) {
  const path1 = resolve(__dirname, `./cache/${zone}/${suffix === 'common' ? '0000' : suffix}/manifest.json`);
  const m1 = JSON.parse(fs.readFileSync(path1, 'utf8'));
  const m2 = (suffix === 'common' || suffix === '0000') ? m1 : JSON.parse(
    fs.readFileSync(resolve(__dirname, `./cache/${zone}/0000/manifest.json`), 'utf8'));
  let m;
  if(suffix === 'common') {
    m = common.map((name) => {
      return {[name]: m2[name].count};
    });
  }
  else {
    m = Object.keys(m2)
      .filter((name) => !common.includes(name))
      .map((name) => {
        return {[name]: by_branch.includes(name) ? m1[name].count : m2[name].count};
      });
  }
  res.setHeader('mdm-manifest', JSON.stringify(m));
};
