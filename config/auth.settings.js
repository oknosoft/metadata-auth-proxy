/**
 *
 *
 * @module auth.settings
 *
 * Created by Evgeniy Malyarov on 13.06.2019.
 */

module.exports = {
  providers: ['couchdb','google'],
  couchdb: {
    url: 'http://cou221:5984/_session',
    authPrefix: 'Basic ',
  },
  github: {
    authPrefix: 'Github ',
  },
  google: {
    authPrefix: 'Google ',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3016/auth/google/callback',
    passReqToCallback   : true,
    scope: ['https://www.googleapis.com/auth/profile.emails.read', 'https://www.googleapis.com/auth/userinfo.profile'],
  },
  ldapauth: {
    authPrefix: 'LDAP ',
  },
  vkontakte: {
    authPrefix: 'Vkontakte ',
  },
  facebook: {
    authPrefix: 'Facebook ',
  }

}
