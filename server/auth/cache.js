/**
 * Кеш аутентификации
 *
 */

const liveTime = 400000;
const cache = Object.create(null);

function clearCache(force) {
  const now = Date.now();
  const del = [];
  for(const k in cache) {
    if(force || (cache[k].stamp + liveTime < now)) {
      del.push(k);
    }
  }
  for(const k of del) {
    delete cache[k];
  }
  !force && setTimeout(clearCache, liveTime);
}
clearCache();

module.exports = {
  get(key) {
    const el = cache[key];
    return el && el.val;
  },
  ext(key) {
    const el = cache[key];
    return el && el.ext;
  },
  put(key, val, ext) {
    cache[key] = {val, ext, stamp: Date.now()};
  },
  del(key) {
    delete cache[key];
  },
  reset() {
    clearCache(true);
  }
}
