/**
 *
 *
 * @module post
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

const getBody = require('./body');

async function calc_order_sent(ctx, next, $p) {
  const {cat, doc, enm, Editor, utils: {moment}} = $p;
  const {_query} = ctx;

  // получаем заказ, продукции и шаблоны
  const options = {
    include_docs: true,
    keys: [`doc.calc_order|${_query.ref}`],
  };
  _query.production.forEach((row) => options.keys.push(`cat.characteristics|${row.ref}`));
  return doc.calc_order.pouch_db.allDocs(options)
    .then(({rows}) => {
      let calc_order;
      let res = Promise.resolve();
      for(const row of rows) {
        const key = row.key.split('|');
        const attr = !row.error && row.doc ? row.doc : {};
        delete attr._id;
        attr.ref = key[1];
        if(key[0] === 'doc.calc_order') {
          attr.number_doc = _query.key;
          attr.date = moment(_query.date).toDate();
          calc_order = doc.calc_order.create(attr, true, true);
          if(calc_order.obj_delivery_state === enm.obj_delivery_states.Черновик) {
            calc_order.production.clear();
            if(attr._rev) {
              calc_order._obj._rev = attr._rev;
            }
          }
          else {
            throw new Error('Запрещено изменять отправленные в работу заказы');
          }
        }
        else {
          let row_prod;
          _query.production.some((v) => {
            if(v.ref === key[1]) {
              row_prod = v;
              return true;
            }
          });
          attr.id = row_prod.key;
          const prod = cat.characteristics.create(attr, true, true);
          if(attr._rev) {
            prod._obj._rev = attr._rev;
          }
          // добавляем продукцию в заказ
          const calc_order_row = prod_add({
            calc_order,
            template: cat.characteristics.get(row_prod.template),
            prod,
            quantity: row_prod.quantity,
          });
          // пересчитываем продукции
          res = res.then(() => prod_recalc({prod, row: row_prod, Editor}));
        }
      }
      return res.then(() => calc_order);
    })
    .then((calc_order) => {
      // записываем с установкой статуса
      const {client, delivery} = _query;
      //calc_order.obj_delivery_state = enm.obj_delivery_states.Отправлен;
      calc_order.client_of_dealer = `${client.surname}\u00A0${client.name}\u00A0${client.patronymic}\u00A0\u00A0${client.email}`;
      calc_order.phone = client.phone;
      calc_order.delivery_area = delivery.area;
      calc_order.shipping_address = delivery.address;
      calc_order.coordinates = JSON.stringify(delivery.coordinates);
      //calc_order.address_fields = '';
      return calc_order.save();
    })
    .then((calc_order) => {
      const production = [];
      calc_order.production.forEach(({characteristic, price, quantity}) => {
        production.push({
          ref: characteristic.ref,
          key: characteristic.id,
          price: price,
          quantity: quantity,
          svg: characteristic.svg,
        });
      });
      ctx.body = {
        ref: calc_order.ref,
        total: calc_order.doc_amount,
        state: calc_order._obj.state,
        production,
      };
    });
}

async function calc_order_pay(ctx, next) {
  ctx.body = {
    ok: true,
  };
}

// формирует json описания продукции заказа
function calc_order(ctx, next, $p) {
  switch (ctx.params.ref){
  case 'send':
    return calc_order_sent(ctx, next, $p);
  case 'pay':
    return calc_order_pay(ctx, next, $p);
  default:
    ctx.status = 403;
    ctx.body = {
      error: true,
      message: `Неизвестный метод '${ctx.params.ref}' класса 'calc_order'`,
    };
  }
}

// добавляем продукцию в заказ
function prod_add({calc_order, template, prod, quantity}) {
  prod.calc_order = calc_order;
  if(!calc_order.production.find_rows({characteristic: prod}).length) {
    calc_order.production.add({characteristic: prod});
  }
  const {calc_order_row} = prod;
  calc_order_row.quantity = quantity;

  // заполняем продукцию по снапшоту
  const src = Object.assign({_not_set_loaded: true}, template._obj);
  prod._mixin(src, null,
    'ref,name,calc_order,product,leading_product,leading_elm,origin,base_block,note,partner,obj_delivery_state,_not_set_loaded,_rev'.split(','), true);
  prod.base_block = template;

  return calc_order_row;
}

function prod_recalc({prod, row, Editor, ctx, calc_order_row}) {
  const {x, y, i1, i2, clr} = row;

  // загружаем продукцию в рисовалку
  const {project} = new Editor();
  return project.load(prod, true)
    .then(() => {

      // устанавливаем размеры
      let redraw;
      const {right, bottom} = project.l_dimensions;
      if(bottom.size != x) {
        bottom._move_points({name: 'right', size: x}, 'x');
        redraw = true;
      }
      if(right.size != y) {
        right._move_points({name: 'top', size: y}, 'y');
        redraw = true;
      }
      if(redraw) {
        project.redraw();
        redraw = false;
      }
      if(i1 && project.contours[0].l_dimensions.children.length){
        const dimension = project.contours[0].l_dimensions.children[0];
        if(dimension.size != i1) {
          let name, xy;
          switch(dimension.pos) {
          case 'right':
            name = 'top';
            xy = 'y';
            break;
          case 'bottom':
            name = 'right';
            xy = 'x';
            break;
          case 'left':
            name = 'bottom';
            xy = 'y';
            break;
          case 'top':
            name = 'left';
            xy = 'x';
            break;
          }
          dimension._move_points({name, size: i1}, xy);
          redraw = true;
        }
      }
      if(redraw) {
        project.redraw();
        redraw = false;
      }
      if(i2 && project.contours[0].l_dimensions.children.length){
        const dimension = project.contours[0].l_dimensions.children[1];
        if(dimension.size != i2) {
          let name, xy;
          switch(dimension.pos) {
          case 'right':
            name = 'top';
            xy = 'y';
            break;
          case 'bottom':
            name = 'right';
            xy = 'x';
            break;
          case 'left':
            name = 'bottom';
            xy = 'y';
            break;
          case 'top':
            name = 'left';
            xy = 'x';
            break;
          }
          dimension._move_points({name, size: i2}, xy);
          redraw = true;
        }
      }
      if(redraw) {
        project.redraw();
        redraw = false;
      }

      // выполняем пересчет
      return project.save_coordinates(ctx ? {save: false, svg: false} : {save: true, svg: true});
    })
    .then(() => {
      // возвращаем результат
      if(ctx && calc_order_row) {
        ctx.body = {
          svg: project.get_svg(),
          price: calc_order_row.price,
        };
      }

      project.ox = null;
      project._scope.unload();
    })
    .catch((err) => {
      if(project) {
        project.ox = null;
        if(project._scope) {
          project._scope.unload();
        }
      }
      if(err.status === 404) {
        err.status = 500;
      }
      throw err;
    });
}

// рассчитывает изделие
async function product(ctx, next, $p) {
  const {cat, doc, Editor} = $p;
  const {ref} = ctx.params;
  const {x, y, i1, i2, clr, quantity} = ctx._query;
  let project;

  // получаем объекты заказа, шаблона и продукции
  return Promise.all([
    doc.calc_order.get({ref: ctx._query.calc_order, number_doc: ctx._query.order_key}, 'promise'),
    cat.characteristics.get({ref: ctx._query.template}, 'promise'),
    cat.characteristics.get({ref}, 'promise'),
  ])
    .then(([calc_order, template, prod]) => {

      // добавляем продукцию в заказ
      const calc_order_row = prod_add({calc_order, template, prod, quantity});
      return prod_recalc({prod, row: ctx._query, Editor, ctx, calc_order_row});

    });
}

module.exports = function ($p, log) {
  return async (ctx, next) => {

    try{

      const post_data = await getBody(ctx.req);
      ctx._query = post_data.length > 0 ? JSON.parse(post_data) : {};

      // контролируем загруженность справочников
      if(!$p.job_prm.complete_loaded) {
        ctx.status = 403;
        ctx.body = 'Загрузка справочников, повторите запрос через минуту';
        return;
      }

      switch (ctx.params.class){
      case 'product':
        return await product(ctx, next, $p);
      case 'doc.calc_order':
        return await calc_order(ctx, next, $p);
      default:
        ctx.status = 403;
        ctx.body = {
          error: true,
          message: `Неизвестный класс '${ctx.params.class}'`,
        };
      }
    }
    catch(err){
      ctx.status = err.status || 500;
      ctx.body = {
        error: true,
        message: err.stack || err.message,
      };
      log(err);
    }

  };
}
