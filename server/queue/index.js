
const {end401, end404, end500} = require('../http/end');

module.exports = function ($p, log) {

  const route = {};
  if(process.env.QUEUE && process.env.PGPASSWORD) {
    log('claster changes starting');
    const Accumulation = require('./Accumulation');
    const accumulation = new Accumulation($p, log);
    require('./subscription')($p, log, accumulation)
      .then(() => {
        log('claster changes started');
      });

    route.get = require('./get')($p, log, accumulation);
    route.post = require('./post')($p, log, accumulation, route.get);
  }
  else {
    route.get = route.post = (req, res) => end404(res, `claster changes stopped`);
    log('claster changes skipping');
  }

  return (req, res) => req.method === 'GET' ? route.get(req, res) : route.post(req, res);
}
