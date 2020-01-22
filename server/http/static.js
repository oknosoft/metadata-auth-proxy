const handler = require('serve-handler');
const paths = require('../../config/paths');
const render_path = process.env.RENDER_PATH || paths.appBuild;

module.exports = async (req, res) => {
  await handler(req, res, {
    cleanUrls: true,
    'public': render_path,
    headers: [
      {
        source: 'service-worker.js',
        headers: [{
          key: 'Service-Worker-Allowed',
          value: '/'
        }]
      }
    ],
    rewrites: [
      {source: 'doc.**', destination: '/index.html'},
    ]
  });
};
