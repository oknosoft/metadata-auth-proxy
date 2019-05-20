/**
 * Верхний уровень корректировки метаданных
 *
 * @module meta.patch.js
 *
 * Created by Evgeniy Malyarov on 18.05.2019.
 */

const include = [
  'enm.mutual_contract_settlements',
  'enm.contract_kinds',
  'enm.text_aligns',
  'enm.gender',
  'enm.parameters_keys_applying',
  'enm.vat_rates',
  'enm.contact_information_types',
  'enm.individual_legal',

  'cat.abonents',
  'cat.servers',
  'cat.params_links',
  'cat.partner_bank_accounts',
  'cat.organization_bank_accounts',
  'cat.banks_qualifier',
  'cat.destinations',
  'cat.formulas',
  'cat.branches',
  'cat.currencies',
  'cat.contact_information_kinds',
  'cat.property_values',
  'cat.meta_ids',
  'cat.cashboxes',
  'cat.partners',
  'cat.organizations',
  'cat.parameters_keys',
  'cat.production_params',
  'cat.delivery_areas',
  'cat.divisions',
  'cat.users',
  'cat.stores',
  'cat.nom_prices_types',
  'cat.individuals',
  'cat.delivery_directions',
  'cat.choice_params',

  'cch.predefined_elmnts',
  'cch.properties',

];
const exclude = [];
const minimsl = [
  'cat.delivery_areas',
  'cat.delivery_directions',
  'cat.formulas',
  'cat.production_params',
];


module.exports = function(meta) {
  for(const cls in meta) {
    const mgrs = meta[cls];
    if(Array.isArray(mgrs)) {
      continue;
    }
    for(const name in mgrs) {
      if(!include.includes('*') && !include.includes(`${cls}.${name}`)) {
        delete mgrs[name];
      }
      else if(exclude.includes(`${cls}.${name}`)) {
        delete mgrs[name];
      }
      else if(minimsl.includes(`${cls}.${name}`)) {
        for(const fld in mgrs[name].fields) {
          fld !== 'parent' && fld !== 'owner' && delete mgrs[name].fields[fld];
        }
        for(const fld in mgrs[name].tabular_sections) {
          delete mgrs[name].tabular_sections[fld];
        }
      }
      if(mgrs[name] && mgrs[name].cachable === 'doc') {
        mgrs[name].cachable = 'ram';
      }
    }
  }
}
