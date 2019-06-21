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

function fin(res, err, user, info) {
  if(err) {
    throw err;
  }
  user.issued = Date.now();

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
    <title>${err ? 'Ошибка авторизации' : 'Успешная авторизация'}</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
</head>
<body>
<script type="text/javascript">
  const {opener} = window;
  if (opener) {
    opener.focus();
    const err = ${JSON.stringify(err)};
    const user = ${JSON.stringify(user)};    
    const info = ${JSON.stringify(info)};
    if (opener.superlogin && opener.superlogin.oauthSession) {
      opener.superlogin.oauthSession(err, user, info);
    }
  }
  window.close();
</script>
</body>
</html>`;

  res.write(html);
  res.end();
}

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
        if(err) {
          throw err;
        }
      });
      break;

    case 'success':
    case 'failure':
      res.write(html);
      res.end();
      break;

    case 'callback':
      method(req, res, {
        successRedirect: `/auth/${paths[1]}/success`,
        failureRedirect: `/auth/${paths[1]}/failure`
      }, (err, user, info) => fin(res, err, user, info));
      break;

    default:
      const err = new TypeError(`Неизвестный url '${paths[0]}/${paths[1]}/${paths[2]}'`);
      err.status = 404;
      throw err;
    }
  };
};
