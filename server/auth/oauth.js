/**
 * ### Редирект и окно oAuth-авторизации
 *
 * @module oauth
 *
 * Created by Evgeniy Malyarov on 14.06.2019.
 */

const passport = require('passport');
const init_passport = passport.initialize();

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

function redirect(url, status) {
  this.statusCode = status || 302;
  this.setHeader('Location', url);
  this.setHeader('Content-Length', '0');
  this.end();
};

const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <title><%= error ? 'Ошибка авторизации' : 'Успешная авторизация' %></title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
</head>
<body>
<script type="text/javascript">
    if (window.opener) {
        window.opener.focus();
        var session = <%- JSON.stringify(session) %>;
        var error = <%- JSON.stringify(error) %>;
        var link = <%- JSON.stringify(link) %>;
        if (window.opener.superlogin && window.opener.superlogin.oauthSession) {
            window.opener.superlogin.oauthSession(error, session, link);
        }
    }
    window.close();
</script>
</body>
</html>`;

module.exports = function (auth) {
  return function (req, res) {
    res.redirect = redirect;
    const {paths} = req.parsed;
    const method = auth.providers[paths[1]];
    if(!method) {
      const err = new TypeError(`Неизвестный провайдер '${paths[1]}'`);
      err.status = 404;
      throw err;
    }
    switch (paths[2]) {
    case '':
    case undefined:
      method(req, res, (err, user, info) => {
        err = null;
      });
      break;

    case 'success':
    case 'failure':
      res.write(html);
      res.end();
      break;

    case 'callback':
      method(req, res, {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
      }, (err, user, info) => {
        if(err) {
          throw err;
        }
        res.write(html);
        res.end();
      });
      break;

    default:
      const err = new TypeError(`Неизвестный url '${paths[0]}/${paths[1]}/${paths[2]}'`);
      err.status = 404;
      throw err;
    }
  };
};
