
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

function init(md) {
  const classes = md.classes();
  for(const area of ['cat', 'cch']) {
    const collection = classes[area];
    for(const elm of collection) {
      const name = `${area}.${elm}`;
      const mgr = !skip.includes(name) && md.mgr_by_class_name(name);
      if (mgr?.slice) {
        revs[mgr.metadata().id || name] = [mgr.slice.moment, Object.keys(mgr.by_ref).length];
      }
    }
  }
}

function onCgange(md, id) {
  const mgr = md.mgr_by_class_name(id.split('|')[0]);
  if (mgr?.slice) {
    revs[mgr.metadata().id || name] = [mgr.slice.moment, Object.keys(mgr.by_ref).length];
  }
}

function manifest(res) {
  res.setHeader('manifest', JSON.stringify(revs));
}

module.exports = {init, onCgange, manifest};
