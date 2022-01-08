/**
 * Читает характеристики и заказы шаблонов
 * по ссылкам из справочника шаблонов + объектов доступа абонента
 *
 * @module linked_templates
 *
 * Created by Evgeniy Malyarov on 20.10.2019.
 */

module.exports = function linked_templates({cat, doc, job_prm, adapters: {pouch}, utils}, log) {

  function by_range({bookmark, step=1, limit=100}) {

    (log || console.log)(`load templates: page №${step}`);

    return utils.sleep(100)
      .then(() => pouch.remote.ram.find({
        selector: {
          class_name: {$in: ['cat.characteristics', 'doc.calc_order']},
          obj_delivery_state: 'Шаблон',
        },
        limit,
        bookmark,
      }))
      .then((res) => {
        step++;
        bookmark = res.bookmark;
        for (const doc of res.docs) {
          pouch.load_changes({docs: [doc]});
        }
        return res.docs.length === limit ? by_range({bookmark, step, limit}) : 'done';
      });
  }

  return by_range({});
}
