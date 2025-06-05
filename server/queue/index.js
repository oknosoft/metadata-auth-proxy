
const {end401, end404, end500} = require('../http/end');

module.exports = function ($p, log, route) {

  const queue = {};
  if(process.env.QUEUE) {
    let accumulation;
    if(process.env.PGPASSWORD) {
      log('claster changes starting');
      const Accumulation = require('./Accumulation');
      accumulation = new Accumulation($p, log);
      require('./subscription')($p, log, accumulation)
        .then(() => {
          log('claster changes started');
        });
    }

    queue.get = require('./get')($p, log, accumulation);
    queue.post = require('./post')($p, log, accumulation, queue.get);
  }
  else {
    queue.get = queue.post = (req, res) => end404(res, `claster changes stopped`);
    log('claster changes skipping');
  }

  route.queue = (req, res) => ['GET', 'HEAD'].includes(req.method) ? queue.get(req, res) : queue.post(req, res);
}
