'use strict';

const http = require('http');
const httpProxy = require('http-proxy');
const {createHmac} = require('crypto');
const url = require('url');
const {name, version} = require('../../package.json');
const {user_node, zone} = require('../../config/app.settings')();
const keepAliveAgent = new http.Agent({ keepAlive: true });
const getBody = require('./raw-body');

const headerFields = {
  username: 'X-Auth-CouchDB-UserName',
  roles: 'X-Auth-CouchDB-Roles',
  token: 'X-Auth-CouchDB-Token',
  cookie: 'Cookie',
  clear(headers) {
    for(const field in this){
      if(typeof this[field] === 'string') {
        delete headers[this[field]];
        delete headers[this[field].toLowerCase()];
      }
    }
    delete headers.authorization;
  }
};

module.exports = function ({cat}, log) {

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

    const {parsed: {query, path, paths}, headers, user}  = req;

    const { username, roles, token } = headerFields;
    headerFields.clear(headers);
    headers[username] = user.latin || user.id;
    headers[roles] = user.roles.replace(/\[|\]|"/g, '');
    headers[token] = sign(headers[username], user_node.secret);

    let {branch} = user;
    let {server} = branch;
    while (server.empty() && !branch.parent.empty()) {
      branch = branch.parent;
      server = branch.server;
    }
    if(server.empty()) {
      server = cat.abonents.by_id(zone).server;
    }
    server = url.parse(server.http);

    if(query && query.includes('feed=longpoll')) {
      const upstreamReq = http.request({
        method: req.method,
        headers: headers,
        hostname: server.hostname,
        port: parseInt(server.port, 10),
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
        target: `${server.href.replace(new RegExp(server.path + '$'), '')}${path.replace('/couchdb', '')}`,
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



