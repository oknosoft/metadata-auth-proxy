/**
 * ### Обрабатывает запросы /mdm/
 * Возвращает обрезанную ram
 *
 * @module get
 *
 * Created by Evgeniy Malyarov on 05.02.2019.
 */

const {end404, end500} = require('../http/end');


module.exports = function ($p, log) {

  const {cat, utils} = $p;

  return async (req, res) => {
    const {query, path, paths} = req.parsed;
    res.setHeader('Content-Type', 'application/json');

    try{
      const {user, parsed: {query, path, paths}} = req;
      const zone = user && user.branch ? user.branch.suffix : paths[2];

      res.end(JSON.stringify({
        ok: true,
        zone,
      }));
    }
    catch(err){
      end500({res, err, log});
    }

  };
};

function prepare (md) {
  const res = ['00_cch.properties'];
  for(const class_name of md.classes().cat) {

  }
  if(doc.class_name === 'cch.properties') emit('00_' + doc._id, null)
  else if(doc.class_name === 'cat.property_values' || doc.class_name === 'cat.contact_information_kinds') emit('01_' + doc._id, null)
  else if(doc.class_name === 'cat.users') emit('02_' + doc._id, null)
  else if(doc.class_name && doc.class_name.indexOf('cat.nom') ===  0) emit('03_' + doc._id, null)
  else if(doc.class_name === 'cat.formulas') emit('90_' + doc._id, null)
  else if(doc.class_name === 'cch.predefined_elmnts') emit('91_' + doc._id, null)
  else emit('20_' + doc._id, null)
}
