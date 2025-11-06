const fs = require('node:fs/promises');
const {resolve, join} = require('path');

const class_name = {
  $in: [
    'cat.abonents',
    'cat.banks_qualifier',
    'cat.clrs',
    'cat.contact_information_kinds',
    'cat.currencies',
    'cat.insert_bind',
    'cat.delivery_areas',
    'cat.destinations',
    'cat.params_links',
    'cat.parameters_keys',
    'cat.property_values',
    'cat.property_values_hierarchy',
    'cat.scheme_settings',
    'cat.work_center_kinds',
    'cat.work_centers',
    'cat.work_shifts',
    'cat.units',
    'cch.properties',
    'cch.predefined_elmnts',
    'ireg.currency_courses',
  ]
};
const _id = {$in: []};
const selector = {
  $or: [{class_name}, {_id}]
};

module.exports = async function repl_task(abonent) {
  const path = resolve(__dirname, `./cache/${abonent.id}/0000`);
  const files = await fs.readdir(path);
  const mask = /^(doc|cat|cch|ireg)\..*\.json$/;
  _id.$in.length = 0;
  for(const file of files) {
    if(mask.test(file)) {
      const text = await fs.readFile(join(path, file), 'utf8');
      const {name, rows} = JSON.parse(text);
      if(name && rows) {
        if(class_name.$in.includes(name)) {
          continue;
        }
        for (const o of rows) {
          _id.$in.push(`${name}|${o.ref}`);
        }
      }
    }
  }
  await fs.writeFile(join(path, 'repl_selector.json'), JSON.stringify(selector), 'utf8');
}
