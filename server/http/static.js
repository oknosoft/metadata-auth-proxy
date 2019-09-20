
const handler = require('serve-handler');
const paths = require('../../config/paths');

module.exports = async (req, res) => {
  await handler(req, res, {
    cleanUrls: true,
    "public": paths.appBuild
  });
};
