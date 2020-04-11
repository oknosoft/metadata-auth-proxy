/**
 * записывает или читает лог сканирований
 *
 * @module scan
 *
 * Created by Evgeniy Malyarov on 09.02.2020.
 */

const {end404} = require('./end');
const getBody = require('./raw-body');

module.exports = function bar($p, log) {

  const {job_prm: {user_node: auth, server}, adapters: {pouch}, classes: {PouchDB}, utils} = $p;
  if(!pouch.remote.events) {
    pouch.remote.events = new PouchDB(server.eve_url, {skip_setup: true, owner: pouch, adapter: 'http', auth});
  }

  return async function bar(req, res) {

    const {parsed: {path}, method, query} = req;
    if(method === 'GET') {
      if(!query.period || !['month','year'].includes(query.period)) {
        query.period = 'day';
      }
      if(query.bar) {
        return Promise.resolve({ok: true})
          .then((rsp) => {
            res.end(JSON.stringify(rsp));
          });
      }
      else if(query.user) {
        if(!query.moment) {
          query.moment = utils.moment().format('YYYYMMDDHHmmssSSS');
        }

        const opts = {reduce: true, group: true};
        if(query.period === 'day') {
          const year = parseFloat(query.moment.substr(0,4));
          const month = parseFloat(query.moment.substr(4,2));
          const day = parseFloat(query.moment.substr(6,2));
          if(query.place) {
            opts.key = [year, month, day, query.user, query.place];
          }
          else {
            opts.startkey = [year, month, day, query.user, ''];
            opts.endkey = [year, month, day, query.user, '\ufff0'];
          }
          opts.group_level = 3;
        }
        else if(query.period === 'month') {
          opts.keys = [];
          const start = utils.moment(`${query.moment.substr(0,4)}-${query.moment.substr(4,2)}-${query.moment.substr(6,2)}`);
          for(let i = 0; i < 31; i++) {
            const key = start.subtract(i ? 1 : 0, 'day').format('YYYY-MM-DD').split('-').map(v => parseFloat(v));
            key.push(query.user, query.place);
            opts.keys.unshift(key);
          }
        }
        // [ 2020, 2, 9, "ef5294e3-bdf3-11e6-81b5-00155d001639", "furn1" ]
        // query.totals_only
        return pouch.remote.events.query('events', opts)
          .then(({rows}) => {
            if(query.totals_only && query.period === 'day') {
              const value = rows[0] ? rows[0].value : {length: 0, distinct: []};
              value.distinct = value.distinct.length;
              res.end(JSON.stringify(value));
            }
            else if(query.totals_only && query.period === 'month') {
              for(const key of opts.keys) {
                if(!rows.some((row) => {
                  for(let i = 0; i < key.length; i++) {
                    if(key[i] !== row.key[i]) {
                      return;
                    }
                  }
                  const {length, distinct} = row.value || {};
                  key.push(length || 0, distinct ? distinct.length : 0);
                  return true;
                })) {
                  key.push(0, 0);
                }
              }
              res.end(JSON.stringify(opts.keys));
            }
            else {
              end404(res, `${method} ${path}`);
            }
          });
      }
      else {
        end404(res, `${method} ${path}`);
      }
    }
    else if(method === 'PUT' || method === 'POST') {
      return getBody(req)
        .then((body) => {
          const doc = JSON.parse(body);
          const code = doc._id.substr(18);
          if(code.length < 3 || code === 'undefined') {
            return end404(res, `${method} ${path}`);
          }
          const barcode = `bar|${code}`;
          return pouch.remote.events.put(doc)
            .catch(() => null)
            .then(() => pouch.remote.events.get(barcode))
            .catch(() => pouch.remote.doc.get(`_local/${barcode}`))
            .then((rsp) => {
              res.end(JSON.stringify(rsp));
            });
      });
    }
    else {
      end404(res, `${method} ${path}`);
    }
  };
};
