/**
 * ### feed общих данных
 * На него может подписаться 1С или любой другой приёмник-репликатор, поддерживающий протокол couchdb
 *
 * @module common
 *
 * Created by Evgeniy Malyarov on 14.08.2019.
 */


module.exports = async function common({req, res, local, remote}) {
  const {parsed, query} = req;
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
    local.info().then(end);
    break;

  case '_changes':
    local.changes(query).then(end);
    break;

  case '_bulk_get':
    if(req.body && req.body.docs) {
      query.docs = req.body.docs;
    }
    local.bulkGet(query).then(end);
    break;

  case '_local':
    parsed.paths[1] += `/${decodeURIComponent(parsed.paths[2])}`

  default:
    if(req.method === 'GET') {
      local.get(parsed.paths[1], query).then(end).catch(end);
    }
    else if(req.method === 'PUT') {
      local.put(req.body, query).then(end).catch(end);
    }
  }

}
