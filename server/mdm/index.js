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

module.exports = function ($p, log) {

  const {md, cat: {branches}, utils} = $p;
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
            const fname = resolve(__dirname, `./cache/${zone}/${suffix}/${name}.json`);
            if(query.includes('file=true')) {
              const rows = [];
              mgr.forEach((o) => {
                if(check_mdm(o, zone, branch)) {
                  rows.push(o);
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

function check_mdm(o, zone, branch) {
  return true;
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
    if(['abonents', 'characteristics', 'servers'].includes(class_name)) {
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
