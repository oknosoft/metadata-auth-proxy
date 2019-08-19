/**
 * ### Провайдер авторизации ldap
 *
 * @module ldap
 *
 * Created by Evgeniy Malyarov on 21.06.2019.
 */

const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');
const {ldap} = require('../../config/auth.settings');


passport.use(new LdapStrategy(
  // {
  //   server: Object.assign({
  //     log: {
  //       trace(...args) {
  //         console.log(...args);
  //       },
  //       debug(...args) {
  //         console.log(...args);
  //       },
  //       child(...args) {
  //         return this;
  //       }
  //     }}, ldap.server)
  // },
  {
    server: ldap.server
  },
  function(profile, done) {
    // asynchronous verification, for effect...
    return done(null, profile);
  }
));

module.exports = function (req, res) {
  return new Promise((resolve, reject) => {
    req.query.username = this.username;
    req.query.password = this.password;
    passport.authenticate('ldapauth', {session: false}, (err, user, info) => {
      if(err) {
        return reject(err);
      }
      if(!user) {
        return reject(new TypeError(info.message));
      }
      // убираем ou из идентификатора
      resolve(user.dn.split(',').filter((part) => part.toLowerCase().startsWith('cn') || part.toLowerCase().startsWith('dc')).join(','));
    })(req, res);
  });
}
