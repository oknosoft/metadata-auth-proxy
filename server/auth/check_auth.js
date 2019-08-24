
const fetch = require('node-fetch');
const conf = require('../../config/app.settings')();

module.exports = function check_auth(req) {
  const {authorization} = req.headers;
  let provider = authorization.substr(0, authorization.indexOf(' ')).toLowerCase();
  if(!provider || provider === 'basic') {
    provider = 'couchdb';
  }
  const url = `http://localhost:${conf.server.port}/auth/${provider}`;
  return fetch(url, {
    credentials: 'include',
    headers: {Accept: 'application/json', authorization},
  })
    .then(res => res.json())
    .then(res => {
      if(res.error) {
        throw res;
      }
      return res;
    });
};
