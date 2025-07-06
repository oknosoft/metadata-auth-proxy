/**
 * Дополняет поток ram сырыми данными, типы которых заданы в константе raw
 *
 *
 * Created 06.05.2021.
 */

const {Readable} = require('stream');

const raw = {
  cat: {cert_ppk: []},

  async init(pouch) {
    for(const area in raw) {
      for(const name in raw[area]) {
        const res = await pouch.remote.ram.allDocs({
          include_docs: true,
          startkey: `${area}.${name}|`,
          endkey: `${area}.${name}|\u0fff`,
        });
        raw[area][name] = res.rows.map(v => v.doc);
      }
    }
  }
};

module.exports = function raw_handler(pouch) {

  raw.init(pouch);

  pouch.on('ram_change', (change) => {
    const {doc: {ref, ...other}, id} = change;
    const parts = id.split('|')[0]?.split('.');
    const rows = parts && raw[parts[0]][parts[1]];
    const doc = {_id: id, ...other};
    if(rows) {
      const row = rows.find(v => v._id === id);
      if(row) {
        rows[rows.indexOf(row)] = doc;
      }
      else {
        rows.push(doc);
      }
    }
  });

  return function raw_data(stream) {
    for(const area in raw) {
      for(const name in raw[area]) {
        const text = JSON.stringify({name: `raw.${area}.${name}`, rows: raw[area][name]}) + '\r\n';
        const readable = Readable.from([text]);
        stream.add(readable);
      }
    }
  }

};
