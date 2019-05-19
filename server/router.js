/**
 * Маршрутизация верхнего уровня
 *
 * @module router
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */


// функция установки параметров сеанса
const settings = require('../config/app.settings')();

const metadata = require('./metadata');
const get = require('./get');
const post = require('./post');

// Router
const Router = require('koa-better-router');

// Rater
const RateLimit = require('koa2-ratelimit').RateLimit;
const limiter = RateLimit.middleware({
  interval: { min: 10 }, // 15 minutes = 15*60*1000
  max: 100, // limit each IP to 100 requests per interval
});

module.exports = function (runtime) {

  // Настройки
  const {prefix} = settings.server;

  // Router
  const router = Router({prefix});

  // Logger
  const log = require('./logger')(runtime);

  const $p = metadata(runtime);

  router.loadMethods()
    .get('/:class/:ref', limiter, get($p, log))
    .post('/:class/:ref', limiter, post($p, log));
  return router;

}
