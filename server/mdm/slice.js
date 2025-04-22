
// эти общие - их не режем и грузим сразу
const common = [
  'cch.properties',
  'cat.abonents',
  'cat.price_groups',
  'cat.property_values',
  'cat.property_values_hierarchy',
  'cat.contact_information_kinds',
  'cat.cash_flow_articles',
  'cat.clrs',
  'cat.color_price_groups',
  'cat.delivery_areas',
  'cat.delivery_directions',
  'cat.units',
  'cat.countries',
  'cat.currencies',
  'cat.scheme_settings',
  'cat.meta_ids',
  'cat.destinations',
  'cat.nom_groups',
  'cat.nom_kinds',
  'cat.elm_visualization',
  'cat.templates',
  'cat.http_apis',
  'cat.work_center_kinds',
  'cat.work_centers',
  'cat.work_shifts',
  'cat.stages',
  'cat.project_categories',
  'cat.lead_src',
];

// эти режем по отделу
const by_branch = [
  'cat.partners',
  'cat.branches',
  'cat.divisions',
  'cat.users',
  'cat.individuals',
  'cat.organizations',
  'cat.cashboxes',
  'cat.stores',
  'cch.predefined_elmnts',
];

const skip = [
  'cat.meta_objs',
  'cat.meta_fields',
  'cat.branches',
  'cat.abonents',
  'cat.partners',
  'cat.contracts',
  'cat.partner_bank_accounts',
  'cat.users',
  'cat.individuals',
  ];

const revs = {};
const commonRevs = {};

function set(mgr) {
  const {class_name, slice, by_ref} = mgr;
  if(common.includes(class_name)) {
    commonRevs[mgr.metadata().id || class_name] = [slice.moment, Object.keys(by_ref).length];
    revs.common = Object.values(commonRevs).reduce((sum, [moment, count]) => {
      if(moment > sum[0]) {
        sum[0] = moment;
      }
      sum[1] += count;
      return sum;
    }, [0,0]);
  }
  else {
    revs[mgr.metadata().id || class_name] = [slice.moment, Object.keys(by_ref).length];
  }
}

function init(md) {
  const classes = md.classes();
  for(const area of ['cat', 'cch']) {
    const collection = classes[area];
    for(const elm of collection) {
      const name = `${area}.${elm}`;
      const mgr = !skip.includes(name) && md.mgr_by_class_name(name);
      if (mgr?.slice) {
        set(mgr);
      }
    }
  }
}

function onCgange(md, id) {
  const mgr = md.mgr_by_class_name(id.split('|')[0]);
  if (mgr?.slice) {
    set(mgr);
  }
}

function manifest(res) {
  res.setHeader('manifest', JSON.stringify(revs));
}

module.exports = {init, onCgange, manifest, common, by_branch};
