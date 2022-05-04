/**
 * ### При установке параметров сеанса
 * Процедура устанавливает параметры работы программы при старте веб-приложения
 *
 * @param prm {Object} - в свойствах этого объекта определяем параметры работы программы
 */

const is_node = typeof process !== 'undefined' && process.versions && process.versions.node;
const local_storage_prefix = process.env.LSPREFIX || 'wb_';
const client_prefix = process.env.CLIENT_PREFIX || local_storage_prefix;

module.exports = function settings(prm = {}) {

  return Object.assign(prm, {

    is_node,

    // разделитель для localStorage
    local_storage_prefix,

    // префиксы клиента и сервера могут отличаться
    client_prefix,

    // гостевые пользователи для демо-режима
    guests: [],

    // расположение couchdb для nodejs
    couch_local: process.env.COUCHLOCAL || `http://cou221:5984/${local_storage_prefix}`,

    // расположение couchdb для браузера
    get couch_path() {
      return is_node ? this.couch_local : `/couchdb/${local_storage_prefix}`;
    },

    get couch_doc() {
      return is_node ? process.env.COUCHDOC : '';
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

    // время до засыпания
    idle_timeout: 57 * 60 * 1000,

    // расположение rest-сервиса по умолчанию
    get rest_path() {
      return this.server.prefix;
    },

    keys: {
      dadata: 'bc6f1add49fc97e9db87781cd613235064dbe0f9',
      geonames: 'oknosoft',
    },

    // глубина истории цен
    price_depth: 3,

    server: {
      prefix: '/adm/api',             // Mount path, no trailing slash
      port: process.env.PORT || 3016, // Port
      start_common: Boolean(process.env.START_COMMON),
      restrict_archive: Boolean(process.env.RESTRICT_ARCHIVE),
      common_url: process.env.RAMURL || 'http://localhost:3026',
      quick_url: process.env.QUICKURL || 'https://quick.ecookna.ru',
      maxpost: 40 * 1024 * 1024,      // Max size of POST request
      abonents: process.env.ABONENTS ? JSON.parse(process.env.ABONENTS) : [21, 20], // абоненты - источники
      branches: process.env.BRANCHES ? JSON.parse(process.env.BRANCHES) : null,     // список отделов можно ограничить
      single_db: Boolean(process.env.SINGLE_DB),                                    // использовать основную базу doc вместо перебора баз абонентов
      no_mdm: Boolean(process.env.NOMDM),
      year: process.env.YEAR ? parseFloat(process.env.YEAR) : new Date().getFullYear(),
      disable_mdm: Boolean(process.env.DISABLEMDM),
      browser_only: Boolean(process.env.BROWSER_ONLY),
      defer: (process.env.DEFER ? parseFloat(process.env.DEFER) : 200000) + Math.random() * 10000,  // задержка пересчета mdm
      eve_url: process.env.EVEURL || 'http://localhost:5984/pl_events',
      rater: {                        // Request rate locker
        all: {                        // Total requests limit
          interval: 4,                // Seconds, collect interval
          limit: 2000,                // Max requests per interval - пока не используем
        },
        ip: {                         // Per-ip requests limit
          interval: 3,
          limit: 9,                   // Если запросов за 3 секундs > 9, добавляем задержку
        }
      },
      upp: {
        url: process.env.UPPURL,
        username: process.env.UPPUSER,
        password: process.env.UPPPWD,
        order: process.env.UPPORDER || 'b24206f0-d2fa-11ea-b0ca-77ab15ca113c',
        cbserver: process.env.UPPCBSERVER || 'quick.ecookna.ru',// '10.0.158.64',
        cbport: process.env.UPPCBPORT ? parseFloat(process.env.UPPCBPORT) : 80,
        sber: {
          username: process.env.SBERUSER || 'eurookna-api',
          password: process.env.SBERPWD,
          url: process.env.SBERURL || 'https://securepayments.sberbank.ru/payment/rest/',
          cburl: process.env.SBERCBURL || 'http://h.oknosoft.ru',
        }
      },
    },

    workers: {
      count: process.env.WORKERS_COUNT ? parseFloat(process.env.WORKERS_COUNT) : 1,  // Total threads
      reloadAt: process.env.RELOAD_AT ? parseFloat(process.env.RELOAD_AT) : 3,       // Hour all threads are restarted
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
