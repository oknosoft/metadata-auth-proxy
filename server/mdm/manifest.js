/**
 * Добавляет заголовок с числом элементов справочников
 *
 * @module manifest
 *
 * Created by Evgeniy Malyarov on 06.10.2019.
 */

const {resolve} = require('path');
const fs = require('fs');

module.exports = async function manifest({res, zone, zone0, suffix, by_branch, common}) {
  const is_common = suffix === 'common' || suffix === '0000';
  const path1 = resolve(__dirname, `./cache/${is_common ? zone : zone0}/${is_common ? '0000' : suffix}/manifest.json`);
  const m1 = JSON.parse(await fs.readFileAsync(path1, 'utf8'));
  const m2 = is_common ? m1 : JSON.parse(
    await fs.readFileAsync(resolve(__dirname, `./cache/${zone}/0000/manifest.json`), 'utf8'));
  let m;
  if(suffix === 'common') {
    m = common.map((name) => {
      return {[name]: (m2[name] ? m2[name].count : 0)};
    });
  }
  else {
    m = Object.keys(m2)
      .filter((name) => !common.includes(name))
      .map((name) => {
        return {[name]: by_branch.includes(name) ? (m1[name] ? m1[name].count : 0) : (m2[name] ? m2[name].count : 0)};
      });
  }
  res.setHeader('manifest', JSON.stringify(m));
};
