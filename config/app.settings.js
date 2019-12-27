/**
 * ### При установке параметров сеанса
 * Процедура устанавливает параметры работы программы при старте веб-приложения
 *
 * @param prm {Object} - в свойствах этого объекта определяем параметры работы программы
 */

const is_node = typeof process !== 'undefined' && process.versions && process.versions.node;

module.exports = function settings(prm = {}) {

  return Object.assign(prm, {

    is_node,

    // разделитель для localStorage
    local_storage_prefix: 'wb_',

    // гостевые пользователи для демо-режима
    guests: [],

    // расположение couchdb для nodejs
    couch_local: process.env.COUCHLOCAL || 'http://cou221:5984/wb_',

    // расположение couchdb для браузера
    get couch_path() {
      return is_node ? this.couch_local : '/couchdb/wb_';
    },

    // без автономного режима
    couch_direct: true,

    pouch_filter: {},

    // ram не реплицируем
    noreplicate: ['ram'],

    // ram держим в озу - конфиденциальные хвосты в idb нам не нужны
    couch_memory: is_node ? [] : ['ram'],

    // на самом деле, базу meta используем, но подключим руками, а не инитом движка
    use_meta: false,

    // по умолчанию, обращаемся к зоне adm
    zone: process.env.ZONE || 21,

    // расположение rest-сервиса по умолчанию
    get rest_path() {
      return this.server.prefix;
    },

    keys: {
      dadata: 'bc6f1add49fc97e9db87781cd613235064dbe0f9',
      geonames: 'oknosoft',
    },

    server: {
      prefix: '/adm/api',             // Mount path, no trailing slash
      port: process.env.PORT || 3016, // Port
      start_common: process.env.START_COMMON,
      common_url: process.env.RAMURL || 'http://localhost:3026',
      maxpost: 40 * 1024 * 1024,      // Max size of POST request
      abonents: process.env.ABONENTS ? JSON.parse(process.env.ABONENTS) : [21, 20], // абоненты - источники
      rater: {                        // Request rate locker
        all: {                        // Total requests limit
          interval: 4,                // Seconds, collect interval
          limit: 1000,                // Max requests per interval
        },
        ip: {                         // Per-ip requests limit
          interval: 1,
          limit: 100,
        }
      },
      couchdb_proxy_direct: 'c221,c076,c077,c078,c079,c112,c177,c178,c180,c181,c182,c183,c184,c185,c186,c187,c207,c208,c209,c210,c211,c212,c213,c214,c215,c216,c217,c218,c219,c220,c222,c223'.split(','), // список хостов, с которых маршрутизируем direct в couchdb (https://c221.oknosoft.com)
      couchdb_proxy_base: 'http://192.168.9', // начальная часть адреса пула серверов в локальной сети
    },

    workers: {
      count: process.env.WORKERS_COUNT ? parseFloat(process.env.WORKERS_COUNT) : 1,  // Total threads
      reloadAt: 3,              // Hour all threads are restarted
      reloadOverlap: 40e3,      // Gap between restarts of simultaneous threads
      killDelay: 10e3           // Delay between shutdown msg to worker and kill, ms
    },

  }, is_node && {
    // авторизация couchdb
    user_node: {
      username: process.env.DBUSER || 'admin',
      password: process.env.DBPWD || 'admin',
      templates: Boolean(process.env.DBTEMPLATES),
      secret: process.env.COUCHSECRET,
    },
  });

};
