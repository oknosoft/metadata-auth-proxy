/**
 * ### При установке параметров сеанса
 * Процедура устанавливает параметры работы программы при старте веб-приложения
 *
 * @param prm {Object} - в свойствах этого объекта определяем параметры работы программы
 */
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

    pouch_filter: {
      meta: 'auth/meta'
    },

    // авторизация couchdb
    user_node: {
      username: process.env.DBUSER || 'admin',
      password: process.env.DBPWD || 'admin',
      suffix: process.env.DBSUFFIX || '',
      templates: Boolean(process.env.DBTEMPLATES),
    },

    couch_direct: true,

    // расположение couchdb
    get couch_path() {
      return this.couch_local;
    },

    // по умолчанию, обращаемся к зоне 21
    zone: process.env.ZONE || 21,

    // расположение rest-сервиса 1c по умолчанию
    rest_path: '/quick/api/',

    keys: {
      dadata: 'bc6f1add49fc97e9db87781cd613235064dbe0f9',
      yandex: '0ab2c686-6aca-4311-ae5e-087829702ae7',
      geonames: 'oknosoft',
    },

    server: {
      prefix: '/quick/api',       // Mount path, no trailing slash
      port: process.env.PORT || 3017,     // Port
      maxpost: 40 * 1024 * 1024,  // Max size of POST request

      rater: {                    // Request rate locker
        all: {                    // Total requests limit
          interval: 3,            // Seconds, collect interval
          limit: 300              // Max requests per interval
        },
        ip: {                     // Per-ip requests limit
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

  });

};
