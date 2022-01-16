/**
 * ### Дополнительные методы справочника _Пользователи_
 *
 * &copy; Evgeniy Malyarov http://www.oknosoft.ru 2014-2017
 *
 * @module cat_users_acl
 */

const cache = Object.create(null);

function refresh(user) {
  const del = [];
  for(const key in cache) {
    if(cache[key] === user) {
      del.push(key);
    }
  }
  for(const key of del) {
    delete cache[key];
  }
  if(user.ids.count()) {
    user.ids.forEach(({identifier}) => {
      cache[identifier] = user;
    });
  }
  else if(!user.ancillary && !user.invalid && user.roles.includes('ram_reader') && user.roles.includes('doc_editor')) {
    cache[`org.couchdb.user:${user.id}`] = user;
  }
}

module.exports = function ({cat: {users}, CatUsers, classes: {RefDataManager}}) {

  CatUsers.prototype.after_save = function after_save() {
    refresh(this);
    return this;
  };

  users.load_array = function load_array(aattr, forse) {
    const res = RefDataManager.prototype.load_array.call(this, aattr, forse);
    res.forEach(refresh);
    return res;
  };

  users.by_auth = function by_auth(id) {
    return cache[id];
  };
};
