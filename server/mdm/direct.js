const {Readable} = require('stream');

module.exports = function direct({stream, mgr, utils}) {
  const rows = [];
  const {class_name} = mgr;
  const src = class_name === 'doc.calc_order' ?
    mgr.find_rows({obj_delivery_state: 'Шаблон'}) : mgr;
  for(const o of src) {
    rows.push(o);
  }
  const text = JSON.stringify({name: class_name, rows}) + '\r\n';
  stream.add(Readable.from([text]));
}
