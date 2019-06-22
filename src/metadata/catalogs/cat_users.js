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

  // пользователей не выгружаем
  unload_obj() {	}

  // не надо пытаться
  find_rows_remote() {

  }

}

//exports.CatUsers = class CatUsers extends Object {};
