/**
 * ### Дополнительные методы плана видов характеристик _Группы mdm_
 *
 * @module cch_mdm_groups
 *
 * Created by Evgeniy Malyarov on 31.08.2021.
 */

exports.CchMdm_groupsManager = class CchMdm_groupsManager extends Object {

  by_type(type) {
    if(!this._by_type) {
      this._by_type = {};
    }
    if(!this._by_type[type]) {
      this._by_type[type] = [];
      this.find_rows({use: true}, (o) => {
        if(o.type.types.includes(type)) {
          this._by_type[type].push(o);
        }
      });
    }
    return this._by_type[type];
  }

  check({o, name, abonent, branch}) {
    const groups = this.by_type(name);
    for(const group of groups) {
      let ok;
      for(const row of group.applying) {
        if(branch._hierarchy(row.branch) || row.branch === abonent) {
         ok = true;
         break;
        }
      }
      if(ok) {
        for(const row of group.elmnts) {
          if(o._hierarchy(row.elm)) {
            if(group.mode === 1) { // исключить
              return false;
            }
          }
          else {
            if(group.mode === 0) { // включить
              return false;
            }
          }
        }
      }
    }
    return true;
  }
}
