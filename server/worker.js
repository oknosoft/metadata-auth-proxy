/**
 * Рабочий процесс кластера
 *
 * @module worker
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

'use strict';


const http = require('./http');
const metadata = require('./metadata');

module.exports = function (runtime) {

  // Logger
  const log = require('./logger')(runtime);

  // Создаём MetaEngine и следом, http сервер
  metadata(log).then(($p) => http($p, log));

  // Cluster
  if(runtime && runtime.cluster) {
    // monitors controllable shutdown
    // and starts shutdown proc
    process.on('message', function (msg) {
      if(msg.event) {
        log(`Worker received ${msg.event} event`);
        if(msg.event == 'shutdown') {
          runtime.cluster.worker.kill();
        }
      }
    });

    process.on('unhandledRejection', error => {
      // Will print "unhandledRejection err is not defined"
      log(`unhandledRejection ${error && error.message ? error.message : ''}`, 'error');
      // end restart process
      error && runtime.cluster.worker.kill();
    });
  }

};
