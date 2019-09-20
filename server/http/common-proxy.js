const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy');
const url = require('url');
const keepAliveAgent = new http.Agent({ keepAlive: true });
const getBody = require('./raw-body');

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxyServer({
  xfwd: true,
  agent: keepAliveAgent,
});

module.exports = async function commonProxy(req, res, conf) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.

  const {query, path}  = req.parsed;

  const server = url.parse(conf.server.common_url);

  if(query && query.includes('feed=longpoll')) {
    const upstreamReq = http.request({
      method: req.method,
      headers: req.headers,
      hostname: server.hostname,
      port: parseInt(server.port, 10),
      path: path.replace('/couchdb', ''),
      agent: keepAliveAgent,
    }, (upstreamRes) => {
      for(const header in upstreamRes.headers) {
        (header.startsWith('x-couch') || header === 'server') && res.setHeader(header, upstreamRes.headers[header]);
      }
      upstreamRes.pipe(res);
    });
    if(req.method === 'POST') {
      try{
        upstreamReq.write(await getBody(req));
      }
      catch(err) {}
    }
    upstreamReq.end();
  }
  else {
    proxy.web(req, res, {
      target: `${conf.server.common_url}/${path.replace('/couchdb', '')}`,
      ignorePath: true,
    });
  }
};
