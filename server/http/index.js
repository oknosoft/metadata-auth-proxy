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
const https = require('https');
const httpProxy = require('http-proxy');
const {end401, end404, end500} = require('./end');

const proxy = {
  http: httpProxy.createProxyServer({xfwd: true}),
  https: httpProxy.createProxyServer({xfwd: true, agent: https.globalAgent, secure: false}),
};

module.exports = function ($p, log, worker) {

  const {utils, cat: {abonents}} = $p;
  const couchdbProxy = require('./proxy-couchdb')($p, log);
  const commonProxy = require('./proxy-common');
  const staticProxy = require('./static');
  const adm = require('./adm')($p, log);
  const mdm = require('../mdm')($p, log);
  const auth = require('../auth')($p, log);
  const event_source = require('../mdm/event_source')($p, log, auth);
  const conf = require('../../config/app.settings')();

  const ipLimiter = new RateLimiterCluster({
    keyPrefix: 'ip', // Must be unique for each limiter
    points: conf.server.rater.ip.limit,
    duration: conf.server.rater.ip.interval,
    timeoutMs: 3000 // Promise is rejected, if master doesn't answer for 3 secs
  });

  function proxy_by_year(req, res) {
    const {year, zone} = req.headers;
    if(zone && year) {
      const key = parseFloat(year);
      if(key !== conf.server.year) {
        const abonent = abonents.by_id(zone);
        if(!abonent.is_new()) {
          const yrow = abonent.servers.find({key});
          if(yrow && yrow.proxy) {
            const proxy_server = proxy[yrow.proxy.startsWith('https://') ? 'https' : 'http'];
            delete req.headers.year;
            proxy_server.web(req, res, {target: yrow.proxy});
            return true;
          }
        }
      }
    }
  }

  function handler(req, res) {

    const {remotePort, remoteAddress} = res.socket;

    // проверяем лимит запросов в секунду
    ipLimiter.consume(`${req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || remoteAddress}`, 1)
      .catch((rateLimiterRes) => {
        if(rateLimiterRes instanceof Error) {
          rateLimiterRes.error = true;
          rateLimiterRes.status = 500;
          end500({res, log, rateLimiterRes});
          return rateLimiterRes;
        }
        return utils.sleep(20);
      })
      .then((rateLimiterRes) => {

        if(rateLimiterRes instanceof Error) {
          return ;
        }

        const parsed = req.parsed = url.parse(req.url);
        parsed.paths = parsed.pathname.replace('/', '').split('/');

        // стартовая маршрутизация по году и зоне
        if(proxy_by_year(req, res)) {
          return ;
        }

        const {host} = req.headers;
        if(conf.server.couchdb_proxy_direct.some((name) => host.startsWith(name))) {
          parsed.couchdb_proxy_direct = true;
        }
        else {
          parsed.is_mdm = parsed.paths[0] === 'couchdb' && parsed.paths[1] === 'mdm';
          parsed.is_log = parsed.paths[0] === 'couchdb' && /_log$/.test(parsed.paths[1]);
          parsed.is_event_source = parsed.paths[0] === 'couchdb' && parsed.paths[1] === 'events';
          parsed.is_common = (parsed.paths[0] === 'common') || (parsed.paths[0] === 'couchdb' && parsed.paths[1] === 'common');
          parsed.is_static = !parsed.paths[0] || parsed.paths[0].includes('.') || /^(light|dist|static|imgs|index|builder|about|login|settings|b|o|help)$/.test(parsed.paths[0]);
          req.query = qs.parse(parsed.query);
        }

        if(parsed.is_static) {
          return staticProxy(req, res, conf);
        }
        if(parsed.is_event_source) {
          return event_source(req, res);
        }

        // пытаемся авторизовать пользователя
        return auth(req, res)
          .catch((err) => {
            end401({res, err, log});
            return null;
          })
          .then((user) => {
            if(user) {
              if(parsed.is_common) {
                return commonProxy(req, res, conf);
              }
              if(parsed.is_mdm) {
                return mdm(req, res, conf);
              }
              if(parsed.couchdb_proxy_direct) {
                if(user.roles && user.roles.includes('doc_full')) {
                  return couchdbProxy(req, res);
                }
                else {
                  return end401({res, err: {message: `host ${host} for admins only, role 'doc_full' required`}, log});
                }
              }
              if(['couchdb', '_session'].includes(parsed.paths[0])) {
                return couchdbProxy(req, res);
              }
              if(['adm', 'r', 'prm', 'plan'].includes(parsed.paths[0])) {
                return adm(req, res);
              }
              return end404(res, parsed.paths[0]);
            }
            else if(!res.finished) {
              return end401({res, err: parsed.paths[0], log});
            }
          })
          .catch((err) => {
            end500({res, err, log});
          });

      });
  };

  //
  // Create your custom server and just call `proxy.web()` to proxy
  // a web request to the target passed in the options
  // also you can use `proxy.ws()` to proxy a websockets request
  //
  const server = http.createServer(handler);
  server.listen(conf.server.port);

  log(`PROXY listen on port: ${conf.server.port}`);
};
