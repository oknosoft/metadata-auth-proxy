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

module.exports = function ($p, log) {

  const couchdbProxy = require('./couchdb-proxy')($p, log);
  const adm = require('./adm')($p, log);
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
        req.query = qs.parse(parsed.query);

        // пытаемся авторизовать пользователя
        return auth(req, res)
          .then((token) => {
            if(token) {
              switch (parsed.paths[0]) {
              case 'couchdb':
                return couchdbProxy(req, res);

              case 'adm':
                return adm(req, res);

              default:
                end404(res, parsed.paths[0]);
              }
            }
          })
          .catch((err) => {
            end401({res, err, log});
          });

      })
      .catch((rateLimiterRes) => {
        end500({res, log, err: {
            error: true,
            status: 429,
            message: `Too many requests`,
          }});
      });
  });

  server.listen(conf.server.port);

};
