/**
 * ### При установке параметров сеанса
 * Процедура устанавливает параметры работы программы при старте веб-приложения
 *
 * @param prm {Object} - в свойствах этого объекта определяем параметры работы программы
 */

const is_node = typeof process !== 'undefined' && process.versions && process.versions.node;

module.exports = function settings(prm) {

  if(!prm) {
    prm = {};
  };

  return Object.assign(prm, {

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
      maxpost: 40 * 1024 * 1024,      // Max size of POST request

      rater: {                        // Request rate locker
        all: {                        // Total requests limit
          interval: 3,                // Seconds, collect interval
          limit: 300                  // Max requests per interval
        },
        ip: {                         // Per-ip requests limit
          interval: 10,
          limit: 100
        }
      }
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
    },
  });

};
