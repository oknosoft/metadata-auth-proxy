/**
 * handler запросов http
 *
 * Created 03.06.2019.
 */

const url = require('url');
const qs = require('qs');
const { hrtime } = require('node:process');
const {RateLimiterCluster} = require('rate-limiter-flexible');
const https = require('https');
const http = require('http');
const httpProxy = require('http-proxy');
const {end401, end404, end500} = require('./end');

const proxy = {
  http: httpProxy.createProxyServer({xfwd: true}),
  https: httpProxy.createProxyServer({xfwd: true, agent: https.globalAgent, secure: false}),
};

module.exports = function ($p, log, worker) {

  const {utils, cat: {abonents}} = $p;
  const couchdbProxy = require('./proxy-couchdb')($p, log);
  const staticProxy = require('./static');
  const auth = require('../auth')($p, log);
  const adm = require('./adm')($p, log, auth);
  const mdm = require('../mdm')($p, log);
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
      if(key !== conf.server.year || !conf.server.abonents.includes(parseFloat(zone))) {
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
    // проверяем лимит запросов в секунду
    req.hrtime = hrtime();
    const {remotePort, remoteAddress} = res.socket;

    const parsed = req.parsed = url.parse(req.url);
    parsed.paths = parsed.pathname.replace('/', '').split('/');
    parsed.is_adm = parsed.paths[0] === 'adm';
    parsed.is_mdm = parsed.paths[0] === 'couchdb' && parsed.paths[1] === 'mdm';
    parsed.is_log = parsed.paths[0] === 'couchdb' && /_log$/.test(parsed.paths[1]);
    parsed.is_event_source = parsed.paths[0] === 'couchdb' && parsed.paths[1] === 'events';
    parsed.is_static = !parsed.paths[0] || parsed.paths[0].includes('.') || /^(light|dist|static|imgs|index|builder|about|login|settings|b|o|help)$/.test(parsed.paths[0]);

    const {headers} = req;
    let key = headers.authorization || `${headers['x-forwarded-for'] || headers['x-real-ip'] || remoteAddress}`;
    if(!headers.authorization && ((parsed.is_mdm && parsed.paths.includes('common')) || parsed.is_log || parsed.is_event_source)) {
      key += `:${remotePort}`;
    }
    ipLimiter.consume(key, 1)
      .catch((rateLimiterRes) => {
        if(rateLimiterRes instanceof Error) {
          rateLimiterRes.error = true;
          rateLimiterRes.status = 500;
          end500({req, res, log, err: rateLimiterRes});
          return rateLimiterRes;
        }
        return utils.sleep(20).then(() => rateLimiterRes);
      })
      .then(async (rateLimiterRes) => {

        if(rateLimiterRes instanceof Error) {
          return ;
        }
        if (rateLimiterRes?.remainingPoints < 2) {
          await utils.sleep(Math.abs(rateLimiterRes.remainingPoints - 2) * 10);
        }
        // if(rateLimiterRes?.remainingPoints) {
        //   log(`${key}: ${rateLimiterRes.remainingPoints}`);
        // }

        // стартовая маршрутизация по году и зоне
        if(proxy_by_year(req, res)) {
          return ;
        }

        req.query = qs.parse(parsed.query);

        if(parsed.is_static) {
          return staticProxy(req, res, conf);
        }
        if(parsed.is_event_source) {
          return event_source(req, res);
        }
        if(parsed.is_adm) {
          return adm(req, res);
        }

        // пытаемся авторизовать пользователя
        return auth(req, res)
          .catch((err) => {
            end401({req, res, err, log});
            return null;
          })
          .then((user) => {
            if(user) {
              if(parsed.is_mdm) {
                return mdm(req, res, conf);
              }
              if(['couchdb', '_session'].includes(parsed.paths[0])) {
                return couchdbProxy(req, res, auth);
              }
              if(['r', 'prm', 'plan'].includes(parsed.paths[0])) {
                return adm(req, res);
              }
              return end404(res, parsed.paths[0]);
            }
            else if(!res.finished) {
              return end401({req, res, err: parsed.paths[0], log});
            }
          })
          .catch((err) => {
            end500({req, res, err, log});
          });

      });
  }

  //
  // Create your custom server and just call `proxy.web()` to proxy
  // a web request to the target passed in the options
  // also you can use `proxy.ws()` to proxy a websockets request
  //
  const server = http.createServer(handler);
  server.listen(conf.server.port);

  log(`PROXY listen on port: ${conf.server.port}`);
};
