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
require('../http/promisify');

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

module.exports = function auto_recalc($p, log) {

  const {cat: {branches, abonents, templates}, utils, job_prm, md, adapters: {pouch}} = $p;
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

      /**
       * 5 минут - чаще не надо
       */
      defer: 300000,
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
        if((now - timer.stamp) < (timer.defer / 2)) {
          clearTimeout(timer.id);
          timer.id = setTimeout(this.recalc.bind(this), timer.defer);
        }
        // иначе - выполним пересчет по расписанию прежней регистрации
      }
      else {
        // после пересчета прошло более 5 минут - запускаем таймер в лоб
        timer.id = setTimeout(this.recalc.bind(this), timer.defer);
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
        timer.id = setTimeout(this.recalc.bind(this), timer.defer);
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
          abonent.acl_objs.forEach(({obj}) => {
            if(obj) {
              objs.add(obj);
            }
          });
          dyn_mdm.prepare(Array.from(objs));

          const abranches = [];
          branches.find_rows({owner: abonent}, (o) => abranches.push(o));

          await recalc({
            abonent,
            branch: branches.get(),
            abranches,
            suffix: 'common',
            types,
          });
          for(const bref in branches.by_ref) {
            const branch = branches.by_ref[bref];
            if(branch.empty() || branch.owner !== abonent) {
              continue;
            }
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
    let changed;
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
          changed = true;
        }
      }
    }

    if(changed) {
      await fs.writeFileAsync(manifest, JSON.stringify(tags), 'utf8');
    }
  }

  // инициируем стартовый пересчет
  setTimeout(changes.register.bind(changes), changes.timer.defer);

  pouch.on('nom_price', changes.register.bind(changes, 'cat.nom'));

  // регистрируем для будущего пересчета
  pouch.on('ram_change', (change) => {
    try {
      changes.register(change.id.split('|')[0]);
    }
    catch (e) {}
  });

  return changes;

};

