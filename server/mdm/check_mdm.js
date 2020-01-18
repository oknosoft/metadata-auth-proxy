const dyn_mdm = require('./dyn_mdm');
const {common} = require('./index');

module.exports = function check_mdm({o, name, abonent, branch, abranches, job_prm}) {
  const zone = abonent.id;
  const {_obj} = o;
  // из старого mdm, учитываем только direct_zones
  if(_obj && _obj.direct_zones && _obj.direct_zones.includes(`'${zone}'`)) {
    return true;
  }

  if(name === 'cat.characteristics') {
    return check_characteristics(o);
  }
  if(common.includes(name)) {
    return true;
  }
  else if(name === 'doc.calc_order') {
    return check_calc_order(o);
  }
  else if(name === 'cch.predefined_elmnts' || name === 'cat.formulas') {
    return !o.disabled && (o.context !== 2) && (o.is_folder || o.zone === 0 || o.zone == zone);
  }

  if(abonent.no_mdm && branch.empty() || branch.no_mdm) {
    return true;
  }

  if(!branch.empty()) {
    if(name === 'cat.users') {
      return o.branch.empty() ? o.subscribers.find(abonent, 'abonent') : (o.branch == branch || o.branch.parent == branch);
    }
    else if(name === 'cat.branches') {
      return o == branch || branch._parents().includes(o);
    }
    else if(name === 'cat.partners') {
      const rows = o.is_folder ? o._children().concat(o) : [o];
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
    else if(name === 'cat.cashboxes' || name === 'cat.stores') {
      const rows = o.department._children().concat(o.department);
      return rows.some((o) => branch.divisions.find({acl_obj: o}));
    }
  }
  else {
    if(name === 'cat.users') {
      return o.subscribers.find(abonent, 'abonent');
    }
    else if(name === 'cat.branches') {
      return o.owner == abonent || o._children().some((branch) => branch.owner == abonent);
    }
    else if(name === 'cat.partners') {
      const rows = o.is_folder ? o._children().concat(o) : [o];
      return rows.some((o) => abranches.some((branch) => branch.partners.find({acl_obj: o})));
    }
    else if(name === 'cat.organizations') {
      return abranches.some((branch) => branch.organizations.find({acl_obj: o}));
    }
    else if(name === 'cat.contracts') {
      return abranches.some((branch) => branch.partners.find({acl_obj: o.owner}) && branch.organizations.find({acl_obj: o.organization}));
    }
    else if(name === 'cat.divisions') {
      const rows = o._children().concat(o);
      return rows.some((o) => abranches.some((branch) => branch.divisions.find({acl_obj: o})));
    }
    else if(name === 'cat.cashboxes' || name === 'cat.stores') {
      const rows = o.department._children().concat(o.department);
      return rows.some((o) => abranches.some((branch) => branch.divisions.find({acl_obj: o})));
    }
  }
  return dyn_mdm.check(o);
}



function check_characteristics(o) {
  if(o.calc_order.empty()) return true;
  if(!check_characteristics.cache) {
    check_characteristics.cache = new Set();
    o._manager._owner.templates.forEach((template) => {
      template.templates.forEach(({template}) => {
        check_characteristics.cache.add(template);
      });
    });
  }
  return check_characteristics.cache.has(o);
}

function check_calc_order(o) {
  if(o.obj_delivery_state != 'Шаблон') return false;
  if(!check_calc_order.cache) {
    check_calc_order.cache = new Set();
    o._manager._owner.$p.cat.templates.forEach((template) => {
      template.templates.forEach(({template}) => {
        check_calc_order.cache.add(template.calc_order);
      });
    });
  }
  return check_calc_order.cache.has(o);
}
