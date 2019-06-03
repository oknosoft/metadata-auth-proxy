/**
 *
 *
 * @module index
 *
 * Created by Evgeniy Malyarov on 03.06.2019.
 */

const http = require('http');
const httpProxy = require('http-proxy');
const keepAliveAgent = new http.Agent({ keepAlive: true });
const url = require('url');
const conf = require('../../config/app.settings')();
const {name, version} = require('../../package.json');

function setVia(proxyRes, req, res) {
  const existing = res.getHeader('Via');
  const viaheader = `${existing ? existing + ', ' : ''} ${name}/${version}`;
  res.setHeader('Via', viaheader);
}

module.exports = function (log) {

  //
  // Create a proxy server with custom application logic
  //
  const proxy = httpProxy.createProxyServer({
    xfwd: true,
    agent: keepAliveAgent,
  });

  proxy.on('proxyRes', setVia);

  //
  // Create your custom server and just call `proxy.web()` to proxy
  // a web request to the target passed in the options
  // also you can use `proxy.ws()` to proxy a websockets request
  //
  const server = http.createServer(function(req, res) {
    const parsed = url.parse(req.url);
    const paths = parsed.pathname.replace('/', '').split('/');

    switch (paths[0]) {
    case 'couchdb':
      // You can define here your custom logic to handle the request
      // and then proxy the request.
      if(parsed.query && parsed.query.includes('feed=longpoll')) {
        const upstreamReq = http.request({
          method: req.method,
          headers: req.headers,
          hostname: 'cou221',
          port: 5984,
          path: parsed.path.replace('/couchdb', ''),
          agent: keepAliveAgent,
        }, upstreamRes => {
          for(const header in upstreamRes.headers) {
            (header.startsWith('x-couch') || header === 'server') && res.setHeader(header, upstreamRes.headers[header]);
          }
          setVia(upstreamRes, req, res);
          upstreamRes.pipe(res);
        });
        if(req.method === 'POST') {

        }
        upstreamReq.end();
      }
      else {
        proxy.web(req, res, {
          target: `http://cou221:5984${parsed.path.replace('/couchdb', '')}`,
          ignorePath: true,
        });
      }

      break;
    case 'adm':
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{ok: true}', 'utf-8');
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(`path '${paths[0]}' not available`, 'utf-8');
    }
  });

  log(`listening on port ${conf.server.port}`);
  server.listen(conf.server.port);

}
