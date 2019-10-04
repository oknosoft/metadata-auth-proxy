/**
 * ### Обрабатывает запросы /mdm/
 * Возвращает обрезанную ram
 *
 * @module get
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

const {end404, end500} = require('../http/end');
const fs = require('fs');
const {resolve} = require('path');
const merge2 = require('merge2');

// эти режем по отделу
const by_branch = [
  'cat.partners',
  'cat.contracts',
  'cat.branches',
  'cat.divisions',
  'cat.users',
  'cat.individuals',
  'cat.organizations',
];

module.exports = function ($p, log) {

  const {md, cat: {branches}, utils} = $p;
  // порядок загрузки, чтобы при загрузке меньше оборванных ссылок
  const load_order = order(md);

  return async (req, res) => {
    const {query, path, paths} = req.parsed;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    try{
      const {user, parsed: {query, path, paths}} = req;
      const zone = paths[2];
      let suffix = paths[3];
      let branch = user && user.branch;
      if(branch && !branch.empty()) {
        suffix = branch.suffix;
      }
      else if(suffix) {
        branches.find_rows({suffix}, (o) => {
          branch = o;
        })
      }
      if(!suffix) {
        suffix = '0000';
      }

      if(query && query.includes('file=true')) {
        // путь настроек приложения
        if(!fs.existsSync(resolve(__dirname, `./cache/${zone}`))) {
          fs.mkdirSync(resolve(__dirname, `./cache/${zone}`));
        }
        if(!fs.existsSync(resolve(__dirname, `./cache/${zone}/${suffix}`))) {
          fs.mkdirSync(resolve(__dirname, `./cache/${zone}/${suffix}`));
        }
      }

      const tags = {};
      const stream = merge2();
      for(const names of load_order) {
        for(const name of names) {
          const mgr = md.mgr_by_class_name(name);
          if(mgr) {
            const fname = resolve(__dirname, `./cache/${zone}/${by_branch.includes(name) ? suffix : '0000'}/${name}.json`);
            if(query.includes('file=true')) {

              // в папках отделов держим только фильтруемые по отделу файлы
              if(!branch.empty() && !by_branch.includes(name)){
                continue;
              }

              const rows = [];
              mgr.forEach((o) => {
                if(check_mdm(o, name, zone, branch)) {
                  rows.push(patch(o, name));
                }
              });
              const text = JSON.stringify({name, rows});
              fs.writeFileSync(fname, text, 'utf8');
              res.write(`${name}\r\n`);
              tags[name] = utils.crc32(text);
            }
            else {
              stream.add(fs.createReadStream(fname));
            }
          }
        }
      }
      if(query.includes('file=true')) {
        res.end();
        const fname = resolve(__dirname, `./cache/${zone}/${suffix}/${manifest}.json`);
        fs.writeFileSync(fname, JSON.stringify(tags), 'utf8');
      }
      else {
        stream.pipe(res);
        res.on('close', () => {
          stream.destroy();
        });
      }
    }
    catch(err){
      end500({res, err, log});
    }

  };
};

function check_mdm(o, name, zone, branch) {
  const zones = o._obj.direct_zones || o._obj.zones;
  if(typeof zones === 'string' && !zones.includes(`'${zone}'`)) {
    return false;
  }
  if(name === 'cat.characteristics') {
    return o.calc_order.empty();
  }
  if(!branch.empty()) {
    if(name === 'cat.users') {
      return o.branch.empty() || o.branch == branch;
    }
    else if(name === 'cat.branches') {
      return o == branch || branch._parents().includes(o);
    }
    else if(name === 'cat.partners') {
      return branch.partners.find({acl_obj: o});
    }
    else if(name === 'cat.organizations') {
      return branch.organizations.find({acl_obj: o});
    }
    else if(name === 'cat.contracts') {
      return branch.partners.find({acl_obj: o.owner}) && branch.organizations.find({acl_obj: o.organization});
    }
    else if(name === 'cat.divisions') {
      const rows = o._children().concat(o);
      return rows.some((o) => branch.divisions.find({acl_obj: o}));
    }

  }
  return true;
}

function patch(o, name, cat) {
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

function order (md) {
  const res = [
    new Set(['cch.properties']),
    new Set(),
    new Set(),
    new Set(),
    new Set(),
    new Set(),
    new Set(['cch.predefined_elmnts'])
  ];

  for(const class_name of md.classes().cat) {
    if(['abonents', 'servers', 'nom_units', 'meta_fields', 'meta_objs'].includes(class_name)) {
      continue;
    }
    else if(class_name === 'property_values' || class_name === 'contact_information_kinds') {
      res[1].add(`cat.${class_name}`);
    }
    else if(class_name === 'users') {
      res[2].add(`cat.${class_name}`);
    }
    else if(class_name.includes('nom')) {
      res[3].add(`cat.${class_name}`);
    }
    else if(class_name === 'formulas') {
      res[5].add(`cat.${class_name}`);
    }
    else{
      res[4].add(`cat.${class_name}`);
    }
  }
  return res;
}
