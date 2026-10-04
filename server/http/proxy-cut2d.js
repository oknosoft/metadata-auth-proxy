const {createProxyServer} = require('http-proxy');

module.exports = function cut({job_prm}, log, route) {

  if(job_prm.server.cut_url) {
    log('cutting service started');
    proxy = createProxyServer({target: job_prm.server.cut_url, ignorePath: true});
    route.cut = function cut2d (req, res) {
      proxy.web(req, res);
    };
  }
  else {
    log('cutting service skipping');
  }

}
