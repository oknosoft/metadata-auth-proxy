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

// создаём методы провайдеров
for(const provider of auth.settings.providers) {
  auth.providers[provider] = require(`./${provider}`);
}

function decodeBase64 (str) {
  return Buffer.from(str, 'base64').toString();
}

function extractAuth(req) {
  const {authorization} = req.headers;
  if(authorization) {
    for(const provider in auth.providers) {
      const {authPrefix} = auth.settings[provider];
      if(authorization.startsWith(authPrefix)) {
        try{
          const key = authorization.substr(authPrefix.length);
          const decoded = user_pass_regexp.exec(decodeBase64(key));
          if(decoded) {
            return {
              provider,
              authPrefix,
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

module.exports = function ($p, log) {

  /**
   * Получает на вход httpRequest и возвращает Promise с идентификатором пользователя или reject, усли авторизоваться не удалось
   * @param req
   * @return {Promise<string>}
   */
  return async (req) => {

    //return true;

    // проверяем авторизацию
    const authorization = extractAuth(req);
    if(!authorization) {
      throw new TypeError('Отсутствует заголовок авторизации');
    }

    let token = cache.get(authorization.key);
    if(!token) {
      token = await authorization.method();
    }
    if(!token) {
      throw new TypeError(`Неверный логин/пароль для провайдера ${authorization.provider}`);
    }
    cache.put(authorization.key, token);
    return token;
  }
}
