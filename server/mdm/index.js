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
const {manifest} = require('./slice');
const current_branch = require('./current_branch');
const direct = require('./direct');
require('../http/promisify');


function mdm ($p, log) {

  const {md, cat: {branches, templates, users}, utils, job_prm, adapters: {pouch}} = $p;
  // порядок загрузки, чтобы на старте было меньше оборванных ссылок
  const {common} = md.order;
  const load_order = md.order();
  const raw_data = require('./raw_data')(pouch);

  return async (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    try{
      const {user, query, parsed: {path, paths}, headers} = req;
      const zone = paths[2];
      let suffix = paths[3];
      let branch = user && user.branch;

      const {abonents} = job_prm.server;
      if(!abonents.some((id) => id == zone)) {
        return end500({req, res, err: {status: 406, message: `Текущий proxy обслуживает зоны ${abonents.join(', ')}, но запрошена зона ${zone}`}, log});
      }

      if(suffix === 'templates') {
        // возвращаем характеристики шаблона
        const fname = resolve(__dirname, `./cache/${zone}/0000/doc.calc_order.${paths[4]}.json`);
        const mname = fname.replace('.json', '.manifest');
        const mtext = fs.existsSync(mname) && await fs.readFileAsync(mname, 'utf8');
        res.setHeader('manifest', mtext || '');
        if(req.method === 'HEAD') {
          res.end();
        }
        else if(!fs.existsSync(fname)) {
          return end404(res, fname);
        }
        else {
          const stream = fs.createReadStream(fname);
          stream.pipe(res);
          res.on('close', () => stream.destroy());
        }
        return;
      }
      else if(branch && !branch.empty() && suffix !== 'common') {
        suffix = branch.suffix;
      }
      else if(suffix && (!branch || branch.empty())) {
        branches.find_rows({suffix}, (o) => {
          branch = o;
          return false;
        });
      }
      if(!suffix) {
        suffix = '0000';
      }
      if(!branch) {
        branch = branches.get();
      }

      // если данные не общие, проверяем пользователя
      if(suffix !== 'common' && !user) {
        return end500({req, res, err: {status: 403, message: 'Пользователь не авторизован'}, log});
      }

      // дополнительные маршруты
      if(paths[4] === 'prices') {

      }

      if(req.method === 'HEAD') {
        manifest({req, res, suffix, md});
        return res.end();
      }

      // проверяем наличие каталога
      // if(!fs.existsSync(resolve(__dirname, `./cache/${zone}/${suffix === 'common' ? '0000' : suffix}`))) {
      //   return end404(res, `/couchdb/mdm/${zone}/${suffix === 'common' ? '0000' : suffix}`);
      // }
      // пишем манифест в head
      manifest({req, res, suffix, md});

      const tags = {};
      const stream = merge2();
      const types = query.type ? [query.type] : (headers.types ? headers.types.split(',') : null);
      for(const names of load_order) {
        for(const name of names) {
          // если запросили определенные типы данных, возвращаем только их
          if(types && !types.includes(name)) {
            continue;
          }
          const meta = md.get(name);
          const mgr = md.mgr_by_class_name(name);
          if(mgr && !meta.joint) {
            if(suffix === 'common' && !common.includes(name)) {
              continue;
            }
            if(suffix !== 'common' && common.includes(name)) {
              continue;
            }
            // добавляем данные в поток
            direct({stream, mgr, utils});
          }
        }
      }
      suffix === 'common' && current_branch({stream, branches, users, headers, utils});
      suffix !== 'common' && (!types || types.length > 50) && raw_data(stream);
      stream.pipe(res);
      res.on('close', () => stream.destroy());
    }
    catch(err){
      end500({req, res, err, log});
    }

  };
}

module.exports = mdm;
