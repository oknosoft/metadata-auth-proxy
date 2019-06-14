/**
 * ### аутентификатор
 */

const user_pass_regexp = /^([^:]*):(.*)$/;
const cache = require('./cache');

// контекст авторизации
const auth = {
  settings: require('../../config/auth.settings'),
  providers: {

  },
};
const oauth = require('./oauth')(auth);

// создаём методы провайдеров
for(const provider of auth.settings.providers) {
  auth.providers[provider] = require(`./${provider}`);
}

function decodeBase64 (str) {
  return Buffer.from(str, 'base64').toString();
}

function extractAuth(req) {
  let {authorization} = req.headers;
  if(authorization) {
    authorization = authorization.replace('Basic', 'Google');
    for(const provider in auth.providers) {
      const settings = auth.settings[provider];
      const {authPrefix} = settings;
      if(authorization.startsWith(authPrefix)) {
        try{
          const key = authorization.substr(authPrefix.length);
          const decoded = user_pass_regexp.exec(decodeBase64(key));
          if(decoded) {
            return {
              provider,
              settings,
              key,
              username: decoded[1],
              password: decoded[2],
              method: auth.providers[provider],
            };
          }
        }
        catch (e) {

        }
      }
    }
  }
}

module.exports = function ({cat}, log) {

  /**
   * Получает на вход httpRequest и возвращает Promise с идентификатором пользователя или reject, усли авторизоваться не удалось
   * @param req
   * @return {Promise<string>}
   */
  return async (req, res) => {

    if(req.parsed.paths[0] === 'auth') {
      return oauth(req, res);
    }

    // проверяем авторизацию
    const authorization = extractAuth(req);
    if(!authorization) {
      throw new TypeError('Отсутствует заголовок авторизации');
    }

    let token = cache.get(authorization.key);
    if(!token) {
      token = await authorization.method(req, res);
      if(!token) {
        throw new TypeError(`Неверный логин/пароль для провайдера ${authorization.provider}`);
      }
      cache.put(authorization.key, token);
    }
    const user = cat.users.by_auth(token);
    if(!user) {
      throw new TypeError(`Пользователь '${authorization.username}' авторизован провайдером '${authorization.provider
      }', но отсутствует в справочнике 'Пользователи'`);
    }
    if(!user.roles || !user.roles.includes('ram_reader') || user.invalid) {
      throw new TypeError(`Пользователю '${user.name}' запрещен вход в программу`);
    }

    return user;
  }
}
