/**
 *
 *
 * @module static
 *
 * Created by Evgeniy Malyarov on 06.02.2019.
 */

const srv = require('koa-static');
const mount = require('koa-mount');
const paths = require('../config/paths');
const serve = mount('/quick', srv(paths.appBuild));
const send = require('koa-send');

module.exports = async function (ctx, next) {
  try {
    await serve(ctx, next);
    if (ctx.status === 404) {
      await send(ctx, 'index.html', { root: paths.appBuild });
      // do somthing here
    }
  } catch (err) {
    // handle error
  }
}
