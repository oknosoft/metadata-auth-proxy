/**
 *
 *
 * @module get
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

// формирует json описания продукции заказа
async function calc_order(ctx, next) {

}

module.exports = function ($p, log) {
  return async (ctx, next) => {

    try{
      switch (ctx.params.class){
      case 'doc.calc_order':
        return await calc_order(ctx, next);
      default:
        ctx.status = 403;
        ctx.body = {
          error: true,
          message: `Неизвестный класс ${ctx.params.class}`,
        };
      }
    }
    catch(err){
      ctx.status = 500;
      ctx.body = {
        error: true,
        message: err.stack || err.message,
      };
      log(err);
    }

  };
}

