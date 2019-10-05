
module.exports = function check_mdm({o, name, zone, branch, job_prm}) {
  const zones = o._obj && (o._obj.direct_zones || o._obj.zones);
  if(typeof zones === 'string' && !zones.includes(`'${zone}'`)) {
    if(zones) {
      return false;
    }
    else if(zone !== job_prm.zone) {
      return false;
    }
  }

  if(name === 'cat.characteristics') {
    return o.calc_order.empty();
  }
  else if(name === 'cch.predefined_elmnts') {
    return o.is_folder || o.zone === 0 || o.zone == zone;
  }
  else if(name === 'cat.formulas') {
    return o.is_folder || o.zone === 0 || o.zone == zone;
  }

  if(!branch.empty()) {
    if(name === 'cat.users') {
      return o.branch.empty() || o.branch == branch;
    }
    else if(name === 'cat.branches') {
      return o == branch || branch._parents().includes(o);
    }
    else if(name === 'cat.partners') {
      const rows = o._children().concat(o);
      return rows.some((o) => branch.partners.find({acl_obj: o}));
    }
    else if(name === 'cat.organizations') {
      return branch.organizations.find({acl_obj: o});
    }
    else if(name === 'cat.contracts') {
      return branch.partners.find({acl_obj: o.owner}) && branch.organizations.find({acl_obj: o.organization});
    }
    else if(name === 'cat.divisions') {
      const rows = o._children().concat(o);
      return rows.some((o) => branch.divisions.find({acl_obj: o}));
    }

  }
  return true;
}
