/**
 * Читает характеристики и заказы шаблонов
 * по ссылкам из справочника шаблонов + объектов доступа абонента
 *
 * @module linked_templates
 *
 * Created by Evgeniy Malyarov on 20.10.2019.
 */

module.exports = function linked_templates({cat, doc, job_prm, adapters: {pouch}}) {
  let res = Promise.resolve();

  cat.abonents.forEach((abonent) => {
    if(job_prm.server.abonents.includes(abonent.id)) {
      res = res.then(() => {
        // читаем заказы-шаблоны текущего абонента
        const refs = new Set();
        abonent.acl_objs.forEach(({obj}) => {
          if(obj && obj._manager === cat.templates) {
            obj.templates.forEach(({template}) => {
              template.is_new() && refs.add(template);
            });
          }
        });
        return refs.size && pouch.load_array(
          cat.characteristics, Array.from(refs).map((v) => v.ref), false, job_prm.server.single_db ? pouch.remote.doc : abonent.db('doc'))
          .then(() => !job_prm.server.single_db && pouch.remote.doc.name !== abonent.db('doc').name && pouch.load_array(
            cat.characteristics, Array.from(refs).map((v) => v.ref), false, pouch.remote.doc));
      })
        .then(() => {
          const all_tmplts = new Set();
          const tmplts = new Set();
          abonent.acl_objs.forEach(({obj}) => {
            if(obj) {
              if(obj._manager === doc.calc_order) {
                all_tmplts.add(obj);
                obj.is_new() && tmplts.add(obj);
              }
              else if(obj._manager === cat.templates) {
                obj.templates.forEach(({template}) => {
                  all_tmplts.add(template.calc_order);
                  template.calc_order.is_new() && tmplts.add(template.calc_order);
                });
              }
            }
          });
          return pouch.load_array(
            doc.calc_order, Array.from(tmplts).map((v) => v.ref), false, job_prm.server.single_db ? pouch.remote.doc : abonent.db('doc'))
            .then(() => !job_prm.server.single_db && pouch.remote.doc.name !== abonent.db('doc').name && pouch.load_array(
              doc.calc_order, Array.from(tmplts).map((v) => v.ref), false, pouch.remote.doc))
            .then(() => all_tmplts);
        })
        .then((all_tmplts) => {
          const refs = new Set();
          for (const tmpl of all_tmplts) {
            tmpl.production.forEach((row) => {
              if(row.characteristic.is_new()) {
                refs.add(row.characteristic);
              }
            })
          }
          if(refs.size){
            return pouch.load_array(
              cat.characteristics, Array.from(refs).map((v) => v.ref), false, job_prm.server.single_db ? pouch.remote.doc : abonent.db('doc'))
              .then(() => !job_prm.server.single_db && pouch.remote.doc.name !== abonent.db('doc').name && pouch.load_array(
                cat.characteristics, Array.from(refs).map((v) => v.ref), false, pouch.remote.doc));
          }
        });
    }
  });

  return res;
}
