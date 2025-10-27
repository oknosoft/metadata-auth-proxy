/**
 * couchdbFind c разыменованием справочников
 */

const {Writable} = require('node:stream');
const getBody = require('./raw-body');
const {end500} = require('./end');

module.exports = function ({cat, pouch, utils, _http, _agent}, log) {

  return function couchdbFind({req, res, query, path, server}) {
    const {paths} = req.parsed;
    if(req.method === 'POST' && query?.includes('dereference') && paths[paths.length-1].includes('_find')) {

      res.setHeader('Content-Type', 'application/json');
      const headers = {};
      for(const name in req.headers) {
        const lower = name.toLowerCase();
        if(lower.startsWith('x-') || lower.startsWith('content') ) {
          headers[name] = req.headers[name];
        }
      }
      const upstreamReq = _http[server.protocol].request({
        method: req.method,
        headers,
        hostname: server.hostname,
        port: parseInt(server.port, 10),
        path: path.replace('/couchdb/', '/').split('?')[0],
        agent: _agent[server.protocol],
      }, (upstreamRes) => {
        for(const header in upstreamRes.headers) {
          (header.startsWith('x-couch') || header === 'server') && res.setHeader(header, upstreamRes.headers[header]);
        }
        getBody(upstreamRes)
          .then(str => {
            const data = JSON.parse(str);
            for(const row of data.docs) {
              row.partner = cat.partners.get(row.partner).name;
              row.manager = cat.users.get(row.manager).name;
            }
            res.end(JSON.stringify(data));
          })
          .catch(err => end500({req, res, err, log}));
      });
      getBody(req)
        .then(data => {
          upstreamReq.write(data);
          upstreamReq.end();
        })
        .catch(err => end500({req, res, err, log}));

      return true;
    }
  };
}
