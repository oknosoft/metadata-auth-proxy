/**
 *
 *
 * @module index
 *
 * Created by Evgeniy Malyarov on 03.06.2019.
 */

const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');
const conf = require('../../config/app.settings')();

module.exports = function (log) {

  //
  // Create a proxy server with custom application logic
  //
  const proxy = httpProxy.createProxyServer({});

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
      proxy.web(req, res, {
        target: `http://cou221:5984${parsed.path.replace('/couchdb', '')}`,
        ignorePath: true,
      });
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
