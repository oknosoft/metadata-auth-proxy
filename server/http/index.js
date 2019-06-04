/**
 *
 *
 * @module index
 *
 * Created by Evgeniy Malyarov on 03.06.2019.
 */

const http = require('http');
const url = require('url');
const {RateLimiterCluster} = require('rate-limiter-flexible');
const conf = require('../../config/app.settings')();


module.exports = function (log) {

  const couchdbProxy = require('./couchdb-proxy')(log);

  const rateLimiter = new RateLimiterCluster({
    keyPrefix: 'limiter', // Must be unique for each limiter
    points: 100,
    duration: 2,
    timeoutMs: 3000 // Promise is rejected, if master doesn't answer for 3 secs
  });

  //
  // Create your custom server and just call `proxy.web()` to proxy
  // a web request to the target passed in the options
  // also you can use `proxy.ws()` to proxy a websockets request
  //
  const server = http.createServer(function(req, res) {

    const {remotePort, remoteAddress} = res.socket;

    rateLimiter.consume(remoteAddress, 1) // consume 2 points
      .then((rateLimiterRes) => {

        const parsed = req.parsed = url.parse(req.url);
        parsed.paths = parsed.pathname.replace('/', '').split('/');

        switch (parsed.paths[0]) {
        case 'couchdb':
          couchdbProxy(req, res);
          break;

        case 'adm':
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end('{ok: true}', 'utf-8');
          break;

        default:
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(`{
    "status": 404,
    "message": "path '${parsed.paths[0]}' not available"\n}`, 'utf-8');
        }

      })
      .catch((rateLimiterRes) => {
        res.writeHead(429, { 'Content-Type': 'application/json' });
        res.end(`{
    "status": 429,
    "message": "Too many requests"\n}`, 'utf-8');
      });
  });

  log(`listening on port ${conf.server.port}`);
  server.listen(conf.server.port);

};
