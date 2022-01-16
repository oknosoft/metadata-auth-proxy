const http = require('http');
const httpProxy = require('http-proxy');
const {createHmac} = require('crypto');
const url = require('url');
const {name, version} = require('../../package.json');
const {user_node, zone, client_prefix} = require('../../config/app.settings')();
const keepAliveAgent = new http.Agent({ keepAlive: true });
const getBody = require('./raw-body');
const {end404, end401} = require('./end');

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

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxyServer({
  xfwd: true,
  agent: keepAliveAgent,
});

proxy.on('proxyRes', setVia);

module.exports = function ({cat, doc, job_prm, utils, adapters: {pouch}}, log) {

  proxy.on('error', (err) => {
    log(err.message || err, 'error');
  });

  const svgs = require('./svgs')({doc, pouch, utils}, log);

  return async function couchdbProxy(req, res, auth) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.

    let {parsed: {query, path}, headers, user}  = req;

    const { username, roles, token } = headerFields;
    headerFields.clear(headers);
    if(user) {
      headers[username] = user.latin || encodeURIComponent(user.id);
      headers[roles] = JSON.parse(user.roles).join(',');
      headers[token] = sign(headers[username], user_node.secret);
    }

    if((path.includes('/_utils') || path.includes('/_users')) && !(user.roles.includes('doc_full') || user.roles.includes('_admin'))) {
      return end401({res, err: {message: `patn ${path} for admins only, role 'doc_full' required`}, log});
    }

    if(!query && !path.endsWith('/') && !path.includes('_session')) {
      path += '/';
    }
    let parts = new RegExp(`/${client_prefix}(.*?)/`).exec(path);
    if((parts && parts[0] === 'meta') || path.includes(`/${client_prefix}meta`)) {
      parts = [zone, 'ram'];
    }
    else if(parts && parts[1]) {
      parts = parts[1].split('_');
    }
    else if(['/couchdb/', '/couchdb/_session', '/_session'].includes(path)) {
      parts = [zone, ''];
    }
    else {
      return end404(res, path);
    }
    const abonent = cat.abonents.by_id(parts[0]);

    let {branch} = user || {};
    // если пользователю разрешен доступ к корню и в заголовке передали branch - перенаправляем на базу отдела
    if(user && utils.is_guid(headers.branch) && user.branch.empty()) {
      if(cat.branches.by_ref[headers.branch]) {
        branch = cat.branches.by_ref[headers.branch];
      }
      if(branch && branch.suffix && parts[1] === 'doc') {
        path = path.replace('_doc/', `_doc_${branch.suffix}/`);
      }
    }
    else if(job_prm.server.branches && job_prm.server.branches.length === 1) {
      cat.branches.find_rows({suffix: job_prm.server.branches[0]}, (o) => {
        branch = o;
        path = path.replace('_doc/', `_doc_${branch.suffix}/`);
        return false;
      });
    }

    let server = branch && branch.server;
    if(!job_prm.server.branches || job_prm.server.branches.length !== 1) {
      switch (parts[1]) {
      case 'doc':
        // if(job_prm.server.single_db) {
        //   const tmp = url.parse(pouch.remote.doc.name);
        //   tmp.pathname = '';
        //   server = {http: url.format(tmp) , empty(){}};
        // }
        // else {
        //
        // }
        while (server.empty() && !branch.parent.empty()) {
          branch = branch.parent;
          server = branch.server;
        }
        if(server.empty()) {
          server = abonent.server;
        }
        break;

      case 'ram':
        const tmp = url.parse(pouch.remote.ram.name);
        tmp.pathname = '';
        server = {http: url.format(tmp) , empty(){}};
        path = path.replace(`_${parts[0]}_`, `_${zone}_`);
        break;

      case 'log':
      case '':
        server = abonent.server;
        break;

      default:
        const row = abonent.ex_bases.find({name: parts[1]});
        server = row ? row.server : abonent.server;
      }
    }

    if(!server && abonent) {
      server = abonent.server;
    }

    if(server.empty()) {
      throw new TypeError(`Не найден сервер для зоны '${parts[0]}'`);
    }

    server = url.parse(server.http);
    if(query && query.includes('feed=longpoll')) {
      const upstreamReq = http.request({
        method: req.method,
        headers: headers,
        hostname: server.hostname,
        port: parseInt(server.port, 10),
        path: path.replace('/couchdb/', '/'),
        agent: keepAliveAgent,
      }, (upstreamRes) => {
        for(const header in upstreamRes.headers) {
          (header.startsWith('x-couch') || header === 'server') && res.setHeader(header, upstreamRes.headers[header]);
        }
        setVia(upstreamRes, req, res);
        upstreamRes.pipe(res);
      });
      if(req.method === 'POST' || req.method === 'PUT') {
        try{
          upstreamReq.write(await getBody(req));
        }
        catch(err) {}
      }
      upstreamReq.end();
    }
    else {
      const target = `${server.href.replace(new RegExp(server.path + '$'), '')}${path.replace('/couchdb/', '/')}`;

      if(svgs({req, parts, query, target}, res)) {
        return;
      }

      if(path.includes('_session') && auth) {
        res.on('finish', () => {
          const cookie = res.getHeader('set-cookie');
          if(cookie) {
            auth.reg_cookie(cookie.join('; '), user);
          }
        });
      }

      proxy.web(req, res, {target, ignorePath: true});
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
}



