/**
 * Читает характеристики и заказы шаблонов
 *
 * @module linked_templates
 *
 * Created by Evgeniy Malyarov on 20.10.2019.
 */

module.exports = function linked_templates({cat, doc, adapters: {pouch}}) {
  let res = Promise.resolve();
  cat.templates.forEach((o) => {
    if(!o.empty()) {
      res = res.then(() => pouch.load_array(cat.characteristics, o.templates.unload_column('template'), false, pouch.remote.doc));
      return true;
    }
  });
  return res.then((r) => {
    const s = new Set();
    const refs = [];
    cat.templates.forEach((o) => {
      if(!o.empty()) {
        o.templates.forEach(({template}) => {
          if(!template.base_block.empty()) {
            template.base_block = '';
          }
          if(template.calc_order.is_new() && !s.has(template.calc_order)) {
            s.add(template.calc_order);
            refs.push(template.calc_order.ref);
          }
        });
        return true;
      }
    });
    return pouch.load_array(doc.calc_order, refs, false, pouch.remote.doc);
  });
}
