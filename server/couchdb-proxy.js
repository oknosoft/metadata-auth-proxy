'use strict';

const join = require('url').resolve;
const rp = require('request-promise-native');
const requestLib = require('request');

const options = {
  host: 'http://cou221:5984',
  match: /^\/couchdb\//,
  map: (path) => path.replace('/couchdb', ''),
};
// if (!(options.host || options.map || options.url)) {
//   throw new Error('miss options');
// }

module.exports = function (runtime) {

  return async function proxy(ctx, next) {
    const url = resolve(ctx.path, options);

    if (typeof options.suppressRequestHeaders === 'object') {
      options.suppressRequestHeaders.forEach((h, i) => {
        options.suppressRequestHeaders[i] = h.toLowerCase();
      });
    }

    const suppressResponseHeaders = []; // We should not be overwriting the options object!
    if (typeof options.suppressResponseHeaders === 'object') {
      options.suppressResponseHeaders.forEach((h) => suppressResponseHeaders.push(h.toLowerCase()));
    }

    // don't match
    if (!url) {
      return next();
    }

    // if match option supplied, restrict proxy to that match
    if (options.match) {
      if (!ctx.path.match(options.match)) {
        return next();
      }
    }

    const parsedBody = getParsedBody(ctx);

    let opt = {
      jar: options.jar === true,
      url: url + (ctx.querystring ? '?' + ctx.querystring : ''),
      headers: ctx.request.header,
      encoding: null,
      followRedirect: options.followRedirect === false ? false : true,
      method: ctx.method,
      body: parsedBody,
      simple: false,
      resolveWithFullResponse: true // make request-promise respond with the complete response object
    };

    // set "Host" header to options.host (without protocol prefix), strip trailing slash
    if(options.host) {
      opt.headers.host = options.host
        .slice(options.host.indexOf('://') + 3)
        .replace(/\/$/, '');
    }

    if(options.requestOptions) {
      if(typeof options.requestOptions === 'function') {
        opt = options.requestOptions(ctx.request, opt);
      }
      else {
        Object.keys(options.requestOptions).forEach(function (option) {
          opt[option] = options.requestOptions[option];
        });
      }
    }

    for (const name in opt.headers) {
      if (
        options.suppressRequestHeaders &&
        options.suppressRequestHeaders.indexOf(name.toLowerCase()) >= 0
      ) {
        delete opt.headers[name];
      }
    }

    const res = (parsedBody || ctx.method === 'GET') ? await rp(opt) : await pipe(ctx.req, opt);

    for (const name in res.headers) {
      // http://stackoverflow.com/questions/35525715/http-get-parse-error-code-hpe-unexpected-content-length
      if (suppressResponseHeaders.indexOf(name.toLowerCase()) >= 0) {
        continue;
      }
      if (name === 'transfer-encoding') {
        continue;
      }
      ctx.set(name, res.headers[name]);
    }

    ctx.body = ctx.body || res.body;
    ctx.status = res.statusCode;

    if (options.yieldNext) {
      return next();
    }
  };

};

function resolve(path, options) {
  let url = options.url;
  if (url) {
    if (!/^http/.test(url)) {
      url = options.host ? join(options.host, url) : null;
    }
    return ignoreQuery(url);
  }

  if (typeof options.map === 'object') {
    if (options.map && options.map[path]) {
      path = ignoreQuery(options.map[path]);
    }
  } else if (typeof options.map === 'function') {
    path = options.map(path);
  }

  return options.host ? join(options.host, path) : null;
}

function ignoreQuery(url) {
  return url ? url.split('?')[0] : null;
}

function getParsedBody(ctx) {
  let {body} = ctx.request;
  if (body === undefined || body === null) {
    return undefined;
  }
  const contentType = ctx.request.header['content-type'];
  if (!Buffer.isBuffer(body) && typeof body !== 'string') {
    if (contentType && contentType.indexOf('json') !== -1) {
      body = JSON.stringify(body);
    } else {
      body = body + '';
    }
  }
  return body;
}

/**
 * Pipes the incoming request body through request()
 */
function pipe(incomingRequest, opt) {
  return new Promise((resolve, reject) => {
    incomingRequest.pipe(requestLib(opt, (error, response) => {
      if (error) return reject(error);
      resolve(response);
    }))
  });
}
