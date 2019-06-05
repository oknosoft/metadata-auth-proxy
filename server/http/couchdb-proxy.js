'use strict';

const http = require('http');
const httpProxy = require('http-proxy');
const {createHmac} = require('crypto');
const {name, version} = require('../../package.json');
const {user_node} = require('../../config/app.settings')();
const keepAliveAgent = new http.Agent({ keepAlive: true });
const getBody = require('./raw-body');

const headerFields = {
  username: 'X-Auth-CouchDB-UserName',
  roles: 'X-Auth-CouchDB-Roles',
  token: 'X-Auth-CouchDB-Token',
  cookie: 'Cookie',
  clear(req) {
    for(const field in this){
      if(typeof this[field] === 'string') {
        delete req.headers[this[field]];
        delete req.headers[this[field].toLowerCase()];
      }
    }
  }
};

module.exports = function ($p, log) {

  //
  // Create a proxy server with custom application logic
  //
  const proxy = httpProxy.createProxyServer({
    xfwd: true,
    agent: keepAliveAgent,
  });

  proxy.on('proxyRes', setVia);

  return async function couchdbProxy(req, res) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.

    const {query, path, paths} = req.parsed;

    const { username, roles, token } = headerFields;
    headerFields.clear(req);
    req.headers[username] = 'admin';
    req.headers[roles] = '_admin';
    req.headers[token] = sign('admin', user_node.secret);

    if(query && query.includes('feed=longpoll')) {
      const upstreamReq = http.request({
        method: req.method,
        headers: req.headers,
        hostname: 'cou221',
        port: 5984,
        path: path.replace('/couchdb', ''),
        agent: keepAliveAgent,
      }, (upstreamRes) => {
        for(const header in upstreamRes.headers) {
          (header.startsWith('x-couch') || header === 'server') && res.setHeader(header, upstreamRes.headers[header]);
        }
        setVia(upstreamRes, req, res);
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
        target: `http://cou221:5984${path.replace('/couchdb', '')}`,
        ignorePath: true,
      });
    }
  };

};

// set via header
function setVia(proxyRes, req, res) {
  const existing = res.getHeader('Via');
  const viaheader = `${existing ? existing + ', ' : ''} ${name}/${version}`;
  res.setHeader('Via', viaheader);
}

// couchdb proxy signed token
function sign(user, secret) {
  return createHmac('sha1', secret).update(user).digest('hex');
};



