/**
 *
 *
 * @module event_source
 *
 * Created by Evgeniy Malyarov on 28.11.2019.
 */

const {end401, end404} = require('../http/end');
const getBody = require('../http/raw-body');

module.exports = function event_source({adapters: {pouch}, wsql, cat: {users}}, log, auth) {

  const resps = new Set();

  pouch.on({
    doc_change(change) {
      const data = `event: doc\ndata: ${JSON.stringify(change.doc)}\n`;
      for(const res of resps) {
        // фильтруем по контрагенту и подразделению
        const {user} = res;
        res.posti++;
        res.write(`${data}id: ${res.posti}\n\n`);
      }
    },
    mdm_change(attr) {
      const {abonent, branch, types} = attr;
      const data = `event: ram\ndata: ${JSON.stringify(types)}\n`;
      for(const res of resps) {
        res.posti++;
        res.write(`${data}id: ${res.posti}\n\n`);
      }
    },
    nom_price(change) {

    }
  });


  wsql.post_event = (data = {}) => {
    for(const res of resps) {
      res.posti++;
      res.write(`data: ${JSON.stringify(data)}\nid: ${res.posti}\n\n`);
    }
  };

  const ping = (test) => {
    for(const res of resps) {
      if(test) {
        res.write('\n');
      }
      else {
        wsql.post_event({test: `test`});
      }
    }
  }

  setInterval(ping.bind(null, true), 70000);

  const incoming = (req, res) => {
    const {paths} = req.parsed;
    return (req.connection.remoteAddress.includes('127.0.0.1') ? Promise.resolve(true) : auth(req, res))
      .then(async (user) => {
        if(user) {
          if(['broadcast', 'mdm_change'].includes(paths[2])) {
            return getBody(req)
              .then((data) => {
                pouch.emit_async(paths[2], JSON.parse(data));
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ok: true}));
              });
          }
          return end404(res, paths[2]);
        }
        else if(!res.finished) {
          return end401({res, err: paths[2], log});
        }
      })
      .catch((err) => {
        end401({res, err, log});
      });
  }

  /**
   * Обрабатывает запросы к event-source
   * @param req
   * @return {Promise}
   */
  return async (req, res) => {

    if(req.method === 'POST' || req.method === 'PUT') {
      return incoming(req, res);
    }

    const user = users.by_ref[req.parsed.paths[2]];
    if(!user || user.is_new() || user.empty()) {
      return end401({res, err: req.parsed.paths[2], log});
    }

    res.user = user;
    res.posti = 0;
    res.removeHeader('Transfer-Encoding');
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*',
    });
    res.write('\n');

    resps.add(res);
    res.socket.on('close', resps.delete.bind(resps, res));

  }
};
