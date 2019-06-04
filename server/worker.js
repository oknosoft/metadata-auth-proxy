/**
 * Рабочий процесс кластера
 *
 * @module worker
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

'use strict';

// // Koa http server
// const Koa = require('koa');
//
// // Register the cors as Koa middleware
// const cors = require('@koa/cors');
//
// // Static
// const serve = require('./static');

const http = require('./http');

module.exports = function (runtime) {

  // Logger
  const log = require('./logger')(runtime);

  const conf = require('../config/app.settings')();

  // Cluster
  if(runtime && runtime.cluster) {
    // monitors controllable shutdown
    // and starts shutdown proc
    process.on('message', function (msg) {
      if(msg.event) {
        log(`Worker received ${msg.event} event`);
        if(msg && msg.event == 'shutdown') {
          runtime.cluster.worker.kill();
        }
      }
    });

    process.on('unhandledRejection', error => {
      // Will print "unhandledRejection err is not defined"
      console.error('unhandledRejection', error.message);
    });
  }

  // // экземпляр Koa-приложения
  // const app = new Koa();
  //
  // // добавляем заголовки cors
  // app.use(cors({credentials: true, maxAge: 600}));
  //
  // // статический контент
  // app.use(serve);
  //
  // // методы управления пользователями и репликациями
  // const router = require('./router')(runtime);
  // app.use(router.middleware());
  //
  // // proxy к серверам couchdb
  // const proxy = require('./couchdb-proxy')(runtime);
  // app.use(proxy);
  //
  // app.listen(conf.server.port);

  http(log);

}
