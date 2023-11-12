
const {end404} = require('../end');
const getBody = require('../raw-body');

function upsert(acc, {date, state, department, partner, manager, doc, nom, sys, quantity, s, amount}) {
  return acc.client.query(`INSERT INTO calc_stat (date, state, department, partner, manager, doc, nom, sys, quantity, s, amount)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (date, state, department, manager, doc, nom, sys) DO UPDATE SET
        date = EXCLUDED.date,
        state = EXCLUDED.state,
        department = EXCLUDED.department,
        partner = EXCLUDED.partner,
        manager = EXCLUDED.manager,
        doc = EXCLUDED.doc,
        nom = EXCLUDED.nom,
        sys = EXCLUDED.sys,
        quantity = EXCLUDED.quantity,
        s = EXCLUDED.s,
        amount = EXCLUDED.amount;`, [date, state, department, partner, manager, doc, nom, sys, quantity, s, amount]);
}

module.exports = function reg($p, log, acc) {
  const {blank} = $p.utils;
  return async function reg(req, res) {
    if(acc.client && acc.client.query) {
      const body = await getBody(req);
      const docs = JSON.parse(body);
      const date = new Date();
      for(const doc of docs) {
        doc.date = date;
        doc.manager = req.user.ref;
        if(!doc.partner) {
          doc.partner = blank.guid;
        }
        await upsert(acc, doc);
      }
    }
    res.end(JSON.stringify({ok: true}));
  }
}
