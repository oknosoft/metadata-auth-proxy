# модуль аутентификации
Получает на вход httpRequest и возвращает Promise с идентификатором пользователя или reject, усли авторизоваться не удалось

````javascript
// node_modules/pouchdb-adapter-http/lib/index.js
var ourFetch = function (url, options) {
  //...
  var prefix = opts.owner ? opts.owner.auth_prefix() : 'Basic ';
  options.headers.set('Authorization', prefix + token);
}
````
