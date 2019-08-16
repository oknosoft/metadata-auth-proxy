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

// Logger
const runtime = {cluster: {worker: {id: 'ram'}}};
const log = require('../logger')(runtime);

const conf = require('../../config/app.settings')();
const {end401, end404, end500} = require('../http/end');
const getBody = require('../http/raw-body');
const common = require('./common');
const metadata = require('../metadata');
const local_couchdb = require('./couchdb');

// MetaEngine
metadata(log)
  .then(($p) => {
    local_couchdb({log, $p})
      .then(() => {

        const server = http.createServer(function(req, res) {

          const start = (req.method === 'POST' || req.method === 'PUT') ? getBody(req) : Promise.resolve();

          return start.then((body) => {
            const {remotePort, remoteAddress} = res.socket;
            const parsed = req.parsed = url.parse(req.url);
            parsed.paths = parsed.pathname.replace('/', '').split('/');
            req.query = qs.parse(parsed.query);
            if(body) {
              req.body = JSON.parse(body);
            }
            if(parsed.paths[0] === 'couchdb') {
              parsed.paths = parsed.paths.splice(1);
            }
            return parsed.paths[0] === 'common' ? common({req, res, $p}) : end404(res, parsed.paths[0]);
          })
            .catch((err) => {
              if(!err.status) {
                err.status = 500;
              }
              err.error = true;
              end500({res, log, err});
            });

        });

        server.listen(conf.server.ram_port);
      });
  });




process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  log(`unhandledRejection ${error.message}`, 'error');
});
