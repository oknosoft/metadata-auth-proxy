/**
 * Возвращает crc32 запрашиваемого потока
 *
 * @module head
 *
 * Created by Evgeniy Malyarov on 28.10.2019.
 */

const {resolve} = require('path');
const fs = require('fs');

module.exports = async function head({res, zone, suffix, by_branch, common}) {
  const path1 = resolve(__dirname, `./cache/${zone}/${suffix === 'common' ? '0000' : suffix}/manifest.json`);
  const m1 = JSON.parse(await fs.readFileAsync(path1, 'utf8'));
  const m2 = (suffix === 'common' || suffix === '0000') ? m1 : JSON.parse(
    await fs.readFileAsync(resolve(__dirname, `./cache/${zone}/0000/manifest.json`), 'utf8'));
  let crc32 = 0;
  if(suffix === 'common') {
    common.forEach((name) => {
      crc32 += m2[name].crc32;
    });
  }
  else {
    Object.keys(m2)
      .filter((name) => !common.includes(name))
      .map((name) => {
        crc32 += by_branch.includes(name) ? m1[name].crc32 : m2[name].crc32;
      });
  }
  res.setHeader('ETag', crc32);
  res.end();
};
