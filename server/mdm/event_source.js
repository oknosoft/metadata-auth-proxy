/**
 *
 *
 * @module event_source
 *
 * Created by Evgeniy Malyarov on 28.11.2019.
 */

const {end401} = require('../http/end');

module.exports = function event_source({adapters: {pouch}, wsql, cat: {users}}, log) {

  const resps = new Set();

  pouch.on({
    doc_change(change) {
      const data = `event: doc\ndata: ${JSON.stringify(change.doc)}\n`;
      for(const res of resps) {
        res.posti++;
        res.write(`${data}id: ${res.posti}\n\n`);
      }
    },
    ram_change(change) {
      const data = `event: ram\ndata: ${JSON.stringify(change.doc)}\n`;
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

  //setInterval(ping, 50000);

  setInterval(ping.bind(null, true), 70000);

  /**
   * Обрабатывает запросы к event-source
   * @param req
   * @return {Promise}
   */
  return async (req, res) => {

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
      'Access-Control-Allow-Origin': '*',
    });
    res.write('\n');

    resps.add(res);
    res.socket.on('close', resps.delete.bind(resps, res));

  }
};
