/**
 *
 *
 * @module auth.settings
 *
 * Created by Evgeniy Malyarov on 13.06.2019.
 */

module.exports = {
  providers: ['couchdb'],
  couchdb: {
    url: 'http://cou221:5984/_session',
    authPrefix: 'Basic ',
  },
  github: {
    authPrefix: 'Github ',
  },
  google: {
    authPrefix: 'Google ',
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
