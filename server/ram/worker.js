/**
 * Рабочий процесс фильтрованной репликации ram
 *
 * @module index
 *
 * Created by Evgeniy Malyarov on 14.08.2019.
 */

'use strict';

const http = require('http');
const url = require('url');
const qs = require('qs');

const conf = require('../../config/app.settings')();
const {end401, end404, end500} = require('../http/end');
const getBody = require('../http/raw-body');
const metadata = require('../metadata');
const local_couchdb = require('./couchdb');
const Polling = require('./polling');

module.exports = function (runtime) {

  const log = require('../logger')(runtime);

  // MetaEngine
  metadata(log, true)
    .then(($p) => {
      local_couchdb({log, $p})
        .then((db) => {

          const polling = new Polling(db, log);

          const mdm_changes = require('../mdm/auto_recalc')($p, log);

          const common = require('./common')($p, log, polling);
          require('../mdm/foroom.js')($p, log);

          function execute(req, res) {

            const start = (req.method === 'POST' || req.method === 'PUT') ? getBody(req) : Promise.resolve();

            return start.then((body) => {
              //const {remotePort, remoteAddress} = res.socket;
              const parsed = req.parsed = url.parse(req.url);
              parsed.paths = parsed.pathname.replace('/', '').split('/').map(decodeURIComponent);
              req.query = qs.parse(decodeURIComponent(parsed.query));
              if(body) {
                req.body = JSON.parse(body);
              }
              if(parsed.paths[0] === 'couchdb') {
                parsed.paths = parsed.paths.splice(1);
              }
              //console.log(`${req.method} ${req.url}`, req.body || '');
              return parsed.paths[0] === 'common' ? common({req, res}) : end404(res, parsed.paths[0]);
            })
              .catch((err) => {
                if(!err.status) {
                  err.status = 500;
                }
                err.error = true;
                end500({res, log, err});
              });
          }

          process.on('message', function (msg) {
            if(msg && msg.event == 'execute') {
              execute(msg.req, msg.res);
            }
          });

          const server = http.createServer(execute);
          const server_url = url.parse(conf.server.common_url);
          server.listen(parseInt(server_url.port, 10));
          log(`COMMON DATA listen on port: ${server_url.port}`);
        });
    });


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
      log(`unhandledRejection ${error.message}`, 'error');
      // end restart process
      runtime.cluster.worker.kill();
    });
  }

}
