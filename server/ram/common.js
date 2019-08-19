/**
 * ### feed общих данных
 * На него может подписаться 1С или любой другой приёмник-репликатор, поддерживающий протокол couchdb
 *
 * @module common
 *
 * Created by Evgeniy Malyarov on 14.08.2019.
 */


module.exports = async function common({req, res, $p, polling}) {
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
    res.setHeader('Content-Type', 'application/json');
    if(result.status) {
      res.statusCode = result.status;
    }
    res.end(JSON.stringify(result));
  }

  switch (parsed.paths[1]) {
  case '':
  case undefined:
    db.info().then(end);
    break;

  case '_changes':
    if(query.feed === 'longpoll') {
      polling.add({query, res});
    }
    else {
      db.changes(query).then(end);
    }
    break;

  case '_bulk_get':
    if(req.body && req.body.docs) {
      query.docs = req.body.docs;
    }
    db.bulkGet(query).then(end);
    break;

  case '_save':
    const parts = parsed.paths[2] && parsed.paths[2].split('.');
    const mgrs = parts && $p[parts[0]];
    const mgr = mgrs && mgrs[parts[1]];
    mgr && mgr.create(req.body)
      .then((doc) => {
        doc._mixin(req.body);
        return doc.save();
      })
      .then(end)
      .catch(end);
    break;

  case '_local':
    parsed.paths[1] += `/${decodeURIComponent(parsed.paths[2])}`

  case 'cat.clrs':
    if(parsed.paths[2] === 'composite' && req.body) {
      $p.cat.clrs.create_composite(req.body).then(end).catch(end);
    }
    else {
      end({status: 404, error: true, message: `path '${parsed.paths[1]}/${parsed.paths[2]}' not available`});
    }
    break;

  default:
    if(req.method === 'GET') {
      db.get(parsed.paths[1], query).then(end).catch(end);
    }
    else if(req.method === 'PUT' && parsed.paths[1].startsWith('_local')) {
      db.put(req.body, query).then(end).catch(end);
    }
    else {
      end({status: 404, error: true, message: `path '${parsed.paths[1]}' not available`});
    }
  }

}
