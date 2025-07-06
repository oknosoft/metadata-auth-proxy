
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

function reducer(sum, [moment, count]) {
  if(moment > sum[0]) {
    sum[0] = moment;
  }
  sum[1] += count;
  return sum;
}

function set(mgr) {
  const {class_name, slice, by_ref, _owner} = mgr;
  const {common} = _owner.$p.md.order;
  if(common.includes(class_name)) {
    commonRevs[mgr.metadata().id || class_name] = [slice.moment, Object.keys(by_ref).length];
    revs.common = Object.values(commonRevs).reduce(reducer, [0, 0]);
  }
  else {
    revs[mgr.metadata().id || class_name] = [slice.moment, Object.keys(by_ref).length];
    revs.other = Object.values(revs).reduce(reducer, [0, 0]);
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

function onChange(md, id) {
  const mgr = md.mgr_by_class_name(id.split('|')[0]);
  if (mgr?.slice) {
    set(mgr);
  }
}

function manifest({req, res, suffix, md}) {
  if(req.method === 'HEAD') {
    res.setHeader('manifest', JSON.stringify(revs));
  }
  else if(suffix === 'common') {
    res.setHeader('manifest', JSON.stringify({common: revs.common}));
  }
  else {
    const {query: {type}, headers:  {types}} = req;
    const value = {};
    if(type) {
      const mgr = md.mgr_by_class_name(type);
      if(mgr) {
        const id = mgr.metadata().id || type;
        value[id] = revs[id];
      }
    }
    else if(types) {
      for(const type of types.split(',')) {
        const mgr = md.mgr_by_class_name(type);
        if(mgr) {
          const id = mgr.metadata().id || type;
          value[id] = revs[id];
        }
      }
    }
    else {
      value.other = revs.other;
    }
    res.setHeader('manifest', JSON.stringify(value));
  }
}

module.exports = {init, onChange, manifest};
