const httpProxy = require('http-proxy');

// Create a proxy server with custom application logic
const proxy = httpProxy.createProxyServer({xfwd: true});

module.exports = async function proxyUPP(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.

  const {path} = req.parsed;
  proxy.web(req, res, {
    target: `http://eco-upp1c.gc.ru/${path}`,
    ignorePath: true,
  });
};
