/**
 *
 *
 * @module event_source
 *
 * Created by Evgeniy Malyarov on 28.11.2019.
 */

module.exports = function event_source({wsql}, log) {

  const resps = new Set();
  let posti = 0;

  wsql.post_event = (data = {}) => {
    posti++;
    for(const res of resps) {
      res.write(`data: ${JSON.stringify(data)}\nid: ${posti}\n\n`);
    }
  };

  const ping = (test) => {
    for(const res of resps) {
      if(test) {
        res.write('\n');
      }
      else {
        wsql.post_event({test: `i-${posti}`});
      }
    }
  }

  setInterval(ping, 50000);

  setInterval(ping.bind(null, true), 300000);

  /**
   * Обрабатывает запросы к event-source
   * @param req
   * @return {Promise}
   */
  return async (req, res) => {

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
