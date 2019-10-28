const handler = require('serve-handler');
const paths = require('../../config/paths');

module.exports = async (req, res) => {
  await handler(req, res, {
    cleanUrls: true,
    'public': paths.appBuild,
    headers: [
      {
        source: 'light/service-worker.js',
        headers: [{
          key: 'Service-Worker-Allowed',
          value: '/'
        }]
      }
    ],
    rewrites: [
      {source: 'light/doc.**', destination: '/light/index.html'},
    ]
  });
};
