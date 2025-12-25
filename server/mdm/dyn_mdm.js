/**
 * Динамически рассчитывает принадлежность
 *
 * @module dyn_mdm
 *
 * Created by Evgeniy Malyarov on 01.11.2019.
 */

const break_types = ['cch.properties', 'cat.destinations', 'cat.users', 'cat.partners', 'cat.units', 'cat.nom_units', 'cat.nom_kinds', 'cat.nom_group',
'cat.parameters_keys', 'cat.params_links',
];
const restrict = ['cat.furns', 'cat.nom', 'cat.inserts', 'cat.cnns', 'cat.clrs', 'cat.production_params'];

module.exports = {

  dedup: new Set(),

  // добавляем ссылку в кеш и ищем её вложенные ссылки
  add(v) {
    if(v && v._manager && !v.empty()) {
      if(!this.dedup.has(v)) {
        this.dedup.add(v);
        this.links(v, true);
      }
    }
  },

  // цикл по полям объекта или строки
  sub_links(obj, fields) {
    for(const fld in fields) {
      const {type} = fields[fld];
      if(type.is_ref && !type.types.some(v => break_types.includes(v)) && !type.types[0].startsWith('enm.')) {
        this.add(obj[fld]);
      }
    }
  },

  // цикл по объекту и строкам табчастей
  links(obj, force, children) {
    if(!obj || !obj.empty || obj.empty()) {
      return;
    }
    if(!force && this.dedup.has(obj)) {
      return;
    }
    const {fields, tabular_sections} = obj._metadata();
    this.sub_links(obj, fields);
    for(const ts in tabular_sections) {
      const {fields, skip_mdm_links} = tabular_sections[ts];
      if(skip_mdm_links) {
        continue;
      }
      obj[ts].forEach((row) => {
        row && this.sub_links(row, fields);
      });
    }
    this.dedup.add(obj);
    // если объект является папкой, добавляем всех его детей
    if(children && obj.is_folder && obj._children) {
      for(const child of obj._children()) {
        this.links(child, force, children);
      }
    }
  },

  check(o) {
    return !restrict.includes(o._manager.class_name) || !this.dedup.size || this.dedup.has(o) || o.is_folder || o.predefined_name;
  },

  cnns({cnns}) {
    const {dedup} = this;
    cnns.forEach((cnn) => {
      if(!dedup.has(cnn)) {
        cnn.cnn_elmnts.forEach(({nom1, nom2}) => {
          if(!nom1.empty() && dedup.has(nom1) || !nom2.empty() && dedup.has(nom2)) {
            this.links(cnn);
            return false;
          }
        });
      }
    });
  },

  // номенклатуры с кодом цветового аналога
  clr_key(CatNom, cat, job_prm) {
    const {dedup} = this;
    const clr_key = {property: job_prm.properties.clr_key};
    const keys = new Set();
    for(const obj of dedup) {
      if(obj instanceof CatNom) {
        const row = obj.extra_fields.find(clr_key);
        if(row?.value) {
          keys.add(row?.value);
        }
      }
    }
    for(const obj of cat.nom) {
      const row = obj.extra_fields.find(clr_key);
      if(row?.value && keys.has(row.value) && !dedup.has(obj)) {
        dedup.add(obj);
      }
    }
  },

  discrete_series(CatInserts) {
    const {dedup} = this;
    const skip = ['cat.color_price_groups', 'cat.clrs', 'cat.property_values'];
    for(const obj of dedup) {
      if(obj instanceof CatInserts) {
        for(const {param, list} of obj.product_params) {
          if(list && param.type.is_ref && !skip.includes(param.type.types[0])) {
            try{
              for(const ref of JSON.parse(list)) {
                dedup.add(param.fetch_type(ref));
              }
            }
            catch (e) {

            }
          }
        }
      }
    }
  },

  // кеш для внешних модулей
  templates: new Set(),

  prepare(objs, tmplts, {cat, job_prm, CatNom, CatInserts}) {
    // чистим кеш ссылок
    this.dedup.clear();
    if(!Array.isArray(objs)) {
      objs = Object.values(objs);
    }

    let res = Promise.resolve();

    // дополняем предопределенными элементами
    Object.values(job_prm.nom).forEach((obj) => {
      if(!obj.is_folder) {
        res = res.then(() => this.links(obj));
      }
    });

    // формируем кеш по массиву входящих ссылок
    for(const obj of objs) {
      res = res.then(() => this.links(obj, true, true));
    }

    return res
      // дополняем кеш ссылками соединений
      .then(() => objs.length && (this.cnns(cat), this.clr_key(CatNom, cat, job_prm), this.discrete_series(CatInserts)))
      .then(() => {
        // чистим кеш заказов-шаблонов и характеристик
        this.templates.clear();
        for(const tmpl of tmplts) {
          this.templates.add(tmpl);
        }
      });
  },

};

