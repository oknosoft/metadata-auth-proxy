const {Readable} = require('stream');

module.exports = function direct({stream, mgr, utils}) {
  const rows = [];
  for(const o of mgr) {
    rows.push(o);
  }
  const text = JSON.stringify({name: mgr.class_name, rows}) + '\r\n';
  stream.add(Readable.from([text]));
}
