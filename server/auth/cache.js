/**
 * Кеш аутентификации
 *
 */

const liveTime = 300000;
const cache = new Object(null);

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
  put(key, val) {
    cache[key] = {val, stamp: Date.now()};
  },
  reset() {
    clearCache(true);
  }
}
