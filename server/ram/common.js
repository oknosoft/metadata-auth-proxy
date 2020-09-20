/**
 * ### feed общих данных
 * На него может подписаться 1С или любой другой приёмник-репликатор, поддерживающий протокол couchdb
 *
 * @module common
 *
 * Created by Evgeniy Malyarov on 14.08.2019.
 */

const check_auth = require('../auth/check_auth');

module.exports = function common($p, log, polling) {

  const {utils} = $p;
  const route = {};
  require('./upp_calc_order')($p, log, route);
  require('./pay')($p, log, route);

  return async function common({req, res}) {

    const {parsed, query} = req;
    const {db} = polling;
    for(const fld in query) {
      if(query[fld] === 'true') {
        query[fld] = true;
      }
      else if(query[fld] === 'false') {
        query[fld] = false;
      }
      else {
        try{
          query[fld] = JSON.parse(query[fld]);
        }
        catch (e) {}
      }

    }

    function end(result) {
      res.setHeader('Server', 'metadata-common-catalogs');
      if(req.headers.accept === 'multipart/mixed') {
        const boundary = utils.generate_guid().replace(/-/g, '');
        if(Array.isArray(result) && result.length === 1 && result[0].ok) {
          res.removeHeader('Connection');
          res.setHeader('Content-Type', `multipart/mixed; boundary=${boundary}`);
          const CRLF = '\r\n';
          const body = `--${boundary}${CRLF}Content-Type: application/json${CRLF}${CRLF}${JSON.stringify(Object.assign({_id: '', _rev: ''}, result[0].ok))}${CRLF}--${boundary}--`;
          res.write(body);
          res.end();
          //console.log(body.substr(0,220));
        }
        else {
          throw {status: 404, error: true, message: `path '${parsed.paths[1]}/${parsed.paths[2]}' multipart/mixed`};
        }
      }
      else {
        res.setHeader('Content-Type', 'application/json');
        const body = JSON.stringify(result);
        res.end(body);
      }
    }

    function continuous(changes) {
      res.setHeader('Server', 'metadata-common-catalogs');
      res.setHeader('Content-Type', 'application/json');
      for(const ch of changes.results) {
        ch.id !== 'fake_seq' && res.write(`${JSON.stringify(ch)}\r\n`);
      }
      res.write(JSON.stringify({last_seq: changes.last_seq}));
      res.end();
      //console.log(JSON.stringify({last_seq: changes.last_seq}));
    }

    function err(result) {
      if(result.status) {
        res.statusCode = result.status;
      }
      if(!result.reason && result.message) {
        result.reason = result.message;
        delete result.message;
      }
      if(result.error && typeof result.error !== 'string' && result.name) {
        result.error = result.name;
        delete result.name;
      }
      return end(result);
    }

    switch (parsed.paths[1]) {
    case '':
    case undefined:
      db.info().then((info) => end(Object.assign({instance_start_time: "0"}, info)));
      break;

    case '_changes':
      if(query.feed === 'longpoll') {
        polling.add({query, res});
      }
      else if(query.feed === 'continuous') {
        db.changes(query).then((changes) => {
          if(changes.results.length) {
            continuous(changes);
          }
          else {
            let timeout = parseInt(query.timeout);
            if(!timeout || timeout < 15000) {
              timeout = 15000;
            }
            setTimeout(() => continuous(changes), timeout);
          }
        })
          .catch(err);
      }
      else {
        db.changes(query).then(end).catch(err);
      }
      break;

    case '_bulk_get':
      if(req.body && req.body.docs) {
        query.docs = req.body.docs;
      }
      db.bulkGet(query).then(end).catch(err);
      break;

    case '_revs_diff':
      err({status: 404, error: true, message: `path '${parsed.paths[1]}/${parsed.paths[2]}' not available`});
      break;

    case '_ensure_full_commit':
      err({status: 201, instance_start_time: "0", ok: true});
      break;

    case '_save':
      check_auth(req)
        .then((user) => {
          const parts = parsed.paths[2] && parsed.paths[2].split('.');
          const mgrs = parts && $p[parts[0]];
          const mgr = mgrs && mgrs[parts[1]];
          if(!mgr || mgr.class_name !== 'cat.clrs') {
            throw {status: 404, error: true, message: `path '${parsed.paths[1]}/${parsed.paths[2]}' not available`};
          }
          return mgr.create(req.body);
        })
        .then((doc) => {
          doc._mixin(req.body);
          return doc.save();
        })
        .then(end)
        .catch(err);
      break;

    case 'cat.clrs':
      if(parsed.paths[2] === 'composite' && req.body) {
        $p.cat.clrs.create_composite(req.body).then(end).catch(err);
      }
      else {
        err({status: 404, error: true, message: `path '${parsed.paths[1]}/${parsed.paths[2]}' not available`});
      }
      break;

    default:
      if(route[parsed.paths[1]]) {
        route[parsed.paths[1]]({req, res});
      }
      else {
        if(parsed.paths[1].startsWith('_local')) {
          parsed.paths[1] += `/${parsed.paths[2]}`;
        }
        if(req.method === 'GET') {
          db.get(parsed.paths[1], query).then(end).catch(err);
        }
        else if(req.method === 'PUT' && parsed.paths[1].startsWith('_local')) {
          db.put(req.body, query).then(end).catch(err);
        }
        else {
          err({status: 404, error: true, message: `path '${parsed.paths[1]}' not available`});
        }
      }
    }

  };

}

