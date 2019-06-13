/**
 *
 *
 * @module proxy
 *
 * Created by Evgeniy Malyarov on 14.06.2019.
 */

import urlJoin from 'url-join';
import urlParse from 'url-parse';
import ajaxCore from 'pouchdb-ajax';
import {toPromise} from 'pouchdb-utils';

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
    this.name = 'authentication_error';
    this.error = true;
    try {
      Error.captureStackTrace(this, AuthError);
    } catch (e) {}
  }
}

function getBaseUrl(db) {
  // Parse database url
  let url;
  if (typeof db.getUrl === 'function') { // pouchdb pre-6.0.0
    url = urlParse(db.getUrl());
  } else { // pouchdb post-6.0.0
    // Use PouchDB.defaults' prefix, if any
    const prefix = db.__opts && db.__opts.prefix ? db.__opts.prefix + '/' : '';
    url = urlParse(prefix + db.name);
  }

  // Compute parent path for databases not hosted on domain root (see #215)
  let path = url.pathname;
  path = path.substr(-1, 1) === '/' ? path.substr(0, -1) : path;
  const parentPath = path.split('/').slice(0, -1).join('/');

  return url.origin + parentPath;
}


function getSessionUrl(db) {
  return urlJoin(getBaseUrl(db), '/_session');
}

function getBasicAuthHeaders({prefix = 'Basic ', username, password}) {
  const str = username + ':' + password;
  const token = btoa(unescape(encodeURIComponent(str)));
  return {Authorization: prefix + token};
}

function wrapError(callback) {
  // provide more helpful error message
  return function (err, res) {
    if (err) {
      if (err.name === 'unknown_error') {
        err.message = (err.message || '') +
          ' Unknown error!  Did you remember to enable CORS?';
      }
    }
    return callback(err, res);
  };
}

const logIn = toPromise(function (username, password, opts, callback) {
  if (typeof callback === 'undefined') {
    callback = opts;
    opts = {};
  }
  if (['http', 'https'].indexOf(this.type()) === -1) {
    return callback(new AuthError('this plugin only works for the http/https adapter'));
  }

  if (!username) {
    return callback(new AuthError('you must provide a username'));
  } else if (!password) {
    return callback(new AuthError('you must provide a password'));
  }

  const ajaxOpts = Object.assign({
    method: 'POST',
    url: getSessionUrl(this),
    headers: Object.assign({'Content-Type': 'application/json'}, getBasicAuthHeaders({username, password})),
    body: {name: username, password: password},
  }, opts.ajax || {});
  ajaxCore(ajaxOpts, wrapError(callback));
});

const logOut = toPromise(function (opts, callback) {
  if (typeof callback === 'undefined') {
    callback = opts;
    opts = {};
  }
  const ajaxOpts = Object.assign({
    method: 'DELETE',
    url: getSessionUrl(this),
    headers: getBasicAuthHeaders(this.__opts.auth),
  }, opts.ajax || {});
  ajaxCore(ajaxOpts, wrapError(callback));
});

export default {
  login: logIn,
  logIn: logIn,
  logout: logOut,
  logOut: logOut,
};
