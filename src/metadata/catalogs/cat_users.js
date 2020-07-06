/**
 * ### Дополнительные методы справочника _Пользователи_
 *
 * &copy; Evgeniy Malyarov http://www.oknosoft.ru 2014-2017
 *
 * @module cat_users_acl
 */


exports.CatUsersManager = class CatUsersManager extends Object {

  constructor(owner, class_name) {
    super(owner, class_name);
    const authenticated = (user) => {
      return this.create(user);
    }
    this.adapter.on({authenticated});
  }

  // при загрузке пользователей, извлекаем acl
  // load_array(aattr, forse) {
  //   const res = [];
  //   for (let aobj of aattr) {
  //     let obj = this.by_ref[aobj.ref];
  //     if(!aobj.acl_objs) {
  //       aobj.acl_objs = [];
  //     }
  //     const {acl} = aobj;
  //     delete aobj.acl;
  //     if(obj) {
  //       obj._mixin(aobj);
  //     }
  //     else {
  //       obj = new $p.CatUsers(aobj, this, true);
  //     }
  //
  //     const {_obj} = obj;
  //     if(_obj && !_obj._acl) {
  //       _obj._acl = acl;
  //       obj._set_loaded();
  //       res.push(obj);
  //     }
  //   }
  //   return res;
  // }

  // пользователей не выгружаем
  unload_obj() {	}

  // не надо пытаться
  find_rows_remote() {

  }

}

//exports.CatUsers = class CatUsers extends Object {};
