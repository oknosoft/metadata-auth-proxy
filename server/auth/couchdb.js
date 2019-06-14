/**
 * ### Провайдер авторизации couchdb
 * Может использоваться не связанный с серверами сервиса сервер - от него требуется только подтвердить пользователя
 *
 * @module couchdb
 *
 * Created by Evgeniy Malyarov on 13.06.2019.
 */

const fetch = require('node-fetch');

module.exports = function () {

  const authorization = this.settings.authPrefix + this.key;
  return fetch(this.settings.url, {
    credentials: 'include',
    headers: {Accept: 'application/json', authorization},
  })
    .then(res => res.json())
    .then(res => res.ok && `org.couchdb.user:${this.username}`);
}
