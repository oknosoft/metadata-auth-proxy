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
  'cat.branches',
  'cat.params_links',
  'cat.partner_bank_accounts',
  'cat.organization_bank_accounts',
  'cat.banks_qualifier',
  'cat.destinations',
  'cat.formulas',
  'cat.furns',
  'cat.inserts',
  'cat.currencies',
  'cat.contact_information_kinds',
  'cat.property_values',
  'cat.meta_ids',
  'cat.cashboxes',
  'cat.clrs',
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

  'doc.calc_order',
];
const exclude = [];
const minimal = [
  'cat.delivery_areas',
  'cat.delivery_directions',
  'cat.furns',
  'cat.inserts',
  'cat.production_params',
  'doc.calc_order',
];
const writable = [
  'cat.abonents',
  'cat.branches',
  'cat.clrs',
  'cat.servers',
  'cat.users',
];
const read_only = [];


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
      else if(minimal.includes(`${cls}.${name}`)) {
        for(const fld in mgrs[name].fields) {
          if(['parent', 'owner'].includes(fld)) continue;
          delete mgrs[name].fields[fld];
        }
        for(const fld in mgrs[name].tabular_sections) {
          delete mgrs[name].tabular_sections[fld];
        }
      }

      if(mgrs[name]) {
        if(/^doc/.test(mgrs[name].cachable)) {
          mgrs[name].original_cachable = mgrs[name].cachable;
          mgrs[name].cachable = 'ram';
        }

        if(!writable.includes('*') && !writable.includes(`${cls}.${name}`)) {
          mgrs[name].read_only = true;
          delete mgrs[name].form;
        }
        else if(read_only.includes(`${cls}.${name}`)) {
          mgrs[name].read_only = true;
        }
      }
    }
  }
}
