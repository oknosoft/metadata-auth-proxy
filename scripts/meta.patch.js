/**
 * Верхний уровень корректировки метаданных
 *
 * @module meta.patch.js
 *
 * Created by Evgeniy Malyarov on 18.05.2019.
 */

const include = [
  '*',
  // 'enm.mutual_contract_settlements',
  // 'enm.contract_kinds',
  // 'enm.text_aligns',
  // 'enm.gender',
  // 'enm.parameters_keys_applying',
  // 'enm.vat_rates',
  // 'enm.contact_information_types',
  // 'enm.individual_legal',
  //
  // 'cat.abonents',
  // 'cat.servers',
  // 'cat.branches',
  // 'cat.params_links',
  // 'cat.partner_bank_accounts',
  // 'cat.organization_bank_accounts',
  // 'cat.banks_qualifier',
  // 'cat.destinations',
  // 'cat.formulas',
  // 'cat.furns',
  // 'cat.inserts',
  // 'cat.currencies',
  // 'cat.contact_information_kinds',
  // 'cat.property_values',
  // 'cat.meta_ids',
  // 'cat.cashboxes',
  // 'cat.clrs',
  // 'cat.partners',
  // 'cat.organizations',
  // 'cat.parameters_keys',
  // 'cat.production_params',
  // 'cat.delivery_areas',
  // 'cat.divisions',
  // 'cat.users',
  // 'cat.stores',
  // 'cat.nom_prices_types',
  // 'cat.individuals',
  // 'cat.delivery_directions',
  // 'cat.choice_params',
  //
  // 'cch.predefined_elmnts',
  // 'cch.properties',
  //
  // 'doc.calc_order',
];
const exclude = [
  'doc.registers_correction',
  'doc.purchase',
  'doc.work_centers_task',
  'doc.credit_card_order',
  'doc.work_centers_performance',
  'doc.debit_bank_order',
  'doc.credit_bank_order',
  'doc.debit_cash_order',
  'doc.credit_cash_order',
  'doc.selling',
  'doc.nom_prices_setup',
  'doc.planning_event',
  'dp.builder_size',
  'dp.builder_coordinates',
  'dp.builder_price',
  'dp.builder_text',
  'dp.buyers_order',
  'dp.builder_lay_impost',
  'dp.builder_pen',
  'rep.invoice_execution',
  'rep.mutual_settlements',
  'rep.materials_demand',
  'rep.cash',
  'rep.selling',
  'rep.goods',
];
const minimal = [

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
