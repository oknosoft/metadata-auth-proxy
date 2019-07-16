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

  // MetaEngine
  const $p = metadata(runtime);

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
      log(`unhandledRejection ${error.message}`, 'error');
    });
  }

  http($p, log);

}
