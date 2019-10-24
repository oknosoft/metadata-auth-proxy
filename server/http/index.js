/**
 *
 *
 * @module index
 *
 * Created by Evgeniy Malyarov on 03.06.2019.
 */

const http = require('http');
const url = require('url');
const qs = require('qs');
const {RateLimiterCluster} = require('rate-limiter-flexible');

const {end401, end404, end500} = require('./end');

module.exports = function ($p, log, worker) {

  const couchdbProxy = require('./couchdb-proxy')($p, log);
  const commonProxy = require('./common-proxy');
  const staticProxy = require('./static');
  const adm = require('./adm')($p, log);
  const mdm = require('../mdm')($p, log);
  const auth = require('../auth')($p, log);
  const conf = require('../../config/app.settings')();

  const ipLimiter = new RateLimiterCluster({
    keyPrefix: 'ip', // Must be unique for each limiter
    points: conf.server.rater.ip.limit,
    duration: conf.server.rater.ip.interval,
    timeoutMs: 3000 // Promise is rejected, if master doesn't answer for 3 secs
  });

  //
  // Create your custom server and just call `proxy.web()` to proxy
  // a web request to the target passed in the options
  // also you can use `proxy.ws()` to proxy a websockets request
  //
  const server = http.createServer(function(req, res) {

    const {remotePort, remoteAddress} = res.socket;

    // проверяем лимит запросов в секунду
    ipLimiter.consume(remoteAddress, 1)
      .then((rateLimiterRes) => {

        const parsed = req.parsed = url.parse(req.url);
        parsed.paths = parsed.pathname.replace('/', '').split('/');

        parsed.is_mdm = parsed.paths[0] === 'couchdb' && parsed.paths[1] === 'mdm';
        parsed.is_log = parsed.paths[0] === 'couchdb' && /_log$/.test(parsed.paths[1]);
        parsed.is_common = (parsed.paths[0] === 'common') || (parsed.paths[0] === 'couchdb' && parsed.paths[1] === 'common');

        parsed.is_static = !parsed.paths[0] || parsed.paths[0].includes('.') || /^(static|imgs|index|builder|about|login|settings|b|o)$/.test(parsed.paths[0]);
        req.query = qs.parse(parsed.query);

        if(parsed.is_static) {
          return staticProxy(req, res, conf);
        }

        // пытаемся авторизовать пользователя
        return auth(req, res)
          .then((user) => {
            if(user) {
              if(parsed.is_common) {
                return commonProxy(req, res, conf);
              }
              if(parsed.is_mdm) {
                return mdm(req, res, conf);
              }
              else if(parsed.paths[0] === 'couchdb') {
                return couchdbProxy(req, res);
              }
              else if(parsed.paths[0] === 'adm') {
                return adm(req, res);
              }
              return end404(res, parsed.paths[0]);
            }
            else if(!res.finished) {
              return end401({res, err: parsed.paths[0], log});
            }
          })
          .catch((err) => {
            end401({res, err, log});
          });

      })
      .catch((rateLimiterRes) => {
        let err;
        if(rateLimiterRes instanceof Error) {
          err = rateLimiterRes;
          err.error = true;
          err.status = 500;
        }
        else {
          err = {
            error: true,
            status: 429,
            message: `Too many requests`,
          };
        }
        end500({res, log, err});
      });
  });

  server.listen(conf.server.port);
  log(`PROXY listen on port: ${conf.server.port}`);
};
