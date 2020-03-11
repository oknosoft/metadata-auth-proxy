/**
 * Автоматический пересчет кеша
 * - слушаем с фильтром базы doc, ram, meta, формируем очередь изменений
 *
 * @module auto_recalc
 *
 * Created by Evgeniy Malyarov on 20.11.2019.
 */

const fs = require('fs');
const {resolve} = require('path');
const check_mdm = require('./check_mdm');
const load_predefined = require('./load_predefined');
const dyn_mdm = require('./dyn_mdm');
const fetch = require('node-fetch');
require('../http/promisify');

// корректировка данных
function patch(o, name) {
  if(!o.toJSON) {
    return o;
  }
  const v = o.toJSON();
  // единицы измерения храним внутри номенклатуры
  if(name === 'cat.nom') {
    v.units = o.units;
  }
  // физлиц храним внутри пользователей
  else if(name === 'cat.users') {
    if(!o.individual_person.empty()) {
      v.person = o.individual_person.toJSON();
    }
  }
  return v;
}

// оповещает клиентский поток об изменениях
function notify(abonent, branch, types, port) {
  fetch(`http://localhost:${port}/couchdb/events/mdm_change`, {
    method: 'POST',
    body: JSON.stringify({abonent: abonent.ref, branch: branch.ref, types}),
  });
}

module.exports = function auto_recalc($p, log) {

  const {cat: {branches, abonents, templates}, doc: {calc_order}, utils, job_prm, md, adapters: {pouch}} = $p;
  const {by_branch, order} = require('./index');
  const load_order = order(md);

  const changes = {

    timer: {
      /**
       * текущий идентификатор timeout
       */
      id: null,

      /**
       * текущий штамп
       */
      stamp: 0,
    },

    /**
     * флаг пересчета
     */
    recalcing: false,

    /**
     * очередь изменений
     */
    queue: {
      _1: new Set(),
      _2: new Set(),

      /**
       * признак использования второй очереди
       */
      swap: false,

      get() {
        return this.swap ? this._2 : this._1;
      }
    },

    /**
     * Регистрирует изменения одного или всех типов данных
     * @param type {string|array|undefined}
     */
    register(type) {
      const queue = this.queue.get();
      if(!type) {
        for (const types of load_order) {
          for (const type of types) {
            queue.add(type);
          }
        }
      }
      else if(Array.isArray(type)) {
        for (const el of type) {
          queue.add(el);
        }
      }
      else {
        queue.add(type);
      }

      const now = Date.now();
      const {timer} = this;
      if(timer.id) {
        // если с момента прошлой регистрации прошло немного времени - откладываем
        if((now - timer.stamp) < (job_prm.server.defer / 2)) {
          clearTimeout(timer.id);
          timer.id = setTimeout(this.recalc.bind(this), job_prm.server.defer);
        }
        // иначе - выполним пересчет по расписанию прежней регистрации
      }
      else {
        // после пересчета прошло более 5 минут - запускаем таймер в лоб
        timer.id = setTimeout(this.recalc.bind(this), job_prm.server.defer);
        timer.stamp = now;
      }

    },

    /**
     * Пересчет для всех абонентов и всех отделов абонентов
     */
    async recalc() {
      const {timer, recalcing} = this;
      if(timer.id) {
        clearTimeout(timer.id);
        timer.id = null;
      }
      if(recalcing) {
        timer.id = setTimeout(this.recalc.bind(this), job_prm.server.defer);
        timer.stamp = Date.now();
        return;
      }
      this.recalcing = true;

      const queue = this.queue.get();
      const types = Array.from(queue);
      this.queue.swap = !this.queue.swap;
      queue.clear();
      log(`Recalcing ${types.length > 6 ? types.length.toFixed() + ' types' : types.join(',')}`);

      try {
        for(const aref in abonents.by_ref) {
          const abonent = abonents.by_ref[aref];
          if(!job_prm.server.abonents.includes(abonent.id)) {
            continue;
          }

          // рассчитаем динамический mdm по табчасти acl_objs текущего абонента
          const objs = new Set();
          const tmplts = new Set();
          abonent.acl_objs.forEach(({obj}) => {
            if(obj) {
              objs.add(obj);
              if(obj._manager === calc_order && obj.obj_delivery_state == 'Шаблон') {
                tmplts.add(obj);
              }
              else if(obj._manager === templates) {
                obj.templates.forEach(({template}) => {
                  tmplts.add(template.calc_order);
                });
              }
            }
          });
          dyn_mdm.prepare(Array.from(objs), Array.from(tmplts));

          const abranches = [];
          branches.find_rows({owner: abonent}, (o) => abranches.push(o));

          // пересчет корня текущего абонента
          await recalc({
            abonent,
            branch: branches.get(),
            abranches,
            suffix: 'common',
            types,
          });

          // пересчет продукций текущих шаблонов
          if(types.includes('doc.calc_order')) {
            await recalc_templates({abonent, tmplts});
          }

          for(const bref in branches.by_ref) {
            const branch = branches.by_ref[bref];

            if(branch.empty() || !branch.use || branch.owner !== abonent) {
              continue;
            }

            if(job_prm.server.branches && !job_prm.server.branches.includes(branch.suffix)) {
              continue;
            }

            // пересчет текущего отдела
            await recalc({
              abonent,
              branch,
              abranches,
              suffix: branch.suffix,
              types,
            });
          }
        }
      }
      catch (e) {
        this.register(types);
      }

      this.recalcing = false;
    },

  };

  async function recalc({abonent, branch, abranches, suffix, types}) {

    const zone = abonent.id;
    const ctypes = [];

    // путь кеша текущей зоны
    if(!fs.existsSync(resolve(__dirname, `./cache/${zone}`))) {
      fs.mkdirSync(resolve(__dirname, `./cache/${zone}`));
    }
    // путь кеша текущего отдела
    if(!fs.existsSync(resolve(__dirname, `./cache/${zone}/${suffix === 'common' ? '0000' : suffix}`))) {
      fs.mkdirSync(resolve(__dirname, `./cache/${zone}/${suffix === 'common' ? '0000' : suffix}`));
    }

    const manifest = resolve(__dirname, `./cache/${zone}/${suffix === 'common' ? '0000' : suffix}/manifest.json`);
    const tags = fs.existsSync(manifest) ? JSON.parse(await fs.readFileAsync(manifest, 'utf8')) : {};
    for(const name of types) {
      const mgr = md.mgr_by_class_name(name);
      if(mgr) {
        const fname = suffix === 'common' ?
          resolve(__dirname, `./cache/${zone}/0000/${name}.json`)
          :
          resolve(__dirname, `./cache/${zone}/${by_branch.includes(name) ? suffix : '0000'}/${name}.json`);

        // в папках отделов держим только фильтруемые по отделу файлы
        if(!branch.empty() && !by_branch.includes(name)){
          continue;
        }

        const rows = [];
        (name === 'cch.predefined_elmnts' ? await load_predefined(pouch.remote.ram) : mgr).forEach((o) => {
          if(check_mdm({o, name, abonent, branch, abranches, job_prm})) {
            rows.push(patch(o, name));
          }
        });
        const text = JSON.stringify({name, rows}) + '\r\n';
        const tag = tags[name];
        // если данные реально изменены - записываем
        if(!tag || tag.count !== rows.length || tag.size !== text.length || tag.crc32 !== utils.crc32(text)) {
          tags[name] = {
            count: rows.length,
            size: text.length,
            crc32: utils.crc32(text),
          };
          await fs.writeFileAsync(fname, text, 'utf8');
          ctypes.push(name);
        }
      }
    }

    if(ctypes.length) {
      await fs.writeFileAsync(manifest, JSON.stringify(tags), 'utf8');
      notify(abonent, branch, ctypes, job_prm.server.port);
    }
  }

  async function recalc_templates({abonent, tmplts}) {
    const name = 'cat.characteristics';
    for (const tmpl of tmplts) {
      const fname = resolve(__dirname, `./cache/${abonent.id}/0000/doc.calc_order.${tmpl.ref}.json`);
      const rows = [];
      tmpl.production.forEach(({characteristic: o}) => {
        !o.empty() && rows.push(patch(o, name));
      });
      const text = JSON.stringify({name, rows}) + '\r\n';
      const old = fs.existsSync(fname) && await fs.readFileAsync(fname, 'utf8');

      // если данные реально изменены - записываем
      if(text !== old) {
        await fs.writeFileAsync(fname, text, 'utf8');
        const mname = fname.replace('.json', '.manifest');
        await fs.writeFileAsync(mname, utils.crc32(text), 'utf8');
      }
    }
  }

  // инициируем стартовый пересчет
  setTimeout(changes.register.bind(changes), job_prm.server.defer / 2);

  pouch.on('nom_price', changes.register.bind(changes, 'cat.nom'));

  // регистрируем для будущего пересчета
  pouch.on('ram_change', (change) => {
    try {
      const class_name = change.id.split('|')[0];
      changes.register(class_name === 'cat.branches' ? '' : class_name);
      if(class_name === 'cch.predefined_elmnts') {
        const {types} = change.doc.type;
        types && types.forEach((type) => {
          type.includes('.') && changes.register(type);
        });
      }
    }
    catch (e) {}
  });

  return changes;

};

