/**
 *
 *
 * @module auth.settings
 *
 * Created by Evgeniy Malyarov on 13.06.2019.
 */

module.exports = {
  providers: ['couchdb','google','ldap'],
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
    callbackURL: 'http://localhost:3006/auth/google/callback',
    passReqToCallback   : true,
    scope: ['https://www.googleapis.com/auth/profile.emails.read', 'https://www.googleapis.com/auth/userinfo.profile'],
  },
  ldap: {
    authPrefix: 'LDAP ',
    server: {
      url: 'ldap://217.197.251.200:65389',
      bindDN: 'cn=ldap_auth,ou=Service Accounts SCOM,dc=ecookna,dc=ru',
      bindCredentials: process.env.LDAP_PASSWORD,
      searchBase: 'dc=ecookna,dc=ru',
      searchFilter: '(cn={{username}})',
    }
  },
  vkontakte: {
    authPrefix: 'Vkontakte ',
  },
  facebook: {
    authPrefix: 'Facebook ',
  }

}
