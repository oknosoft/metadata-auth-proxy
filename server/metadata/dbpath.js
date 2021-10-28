/**
 * Переопределяем dbpath адаптера pouchdb
 *
 * @module dbpath
 *
 * Created by Evgeniy Malyarov on 28.10.2021.
 */

module.exports = function dbpath(name) {
  const {props: {path, zone, _suffix}, $p: {wsql, job_prm}} = this;
  if(name == 'meta') {
    return path + 'meta';
  }
  else if(name == 'ram') {
    return path + zone + '_ram';
  }
  else if(name === 'pgsql') {
    return (job_prm.pg_path.startsWith('/') && !wsql.alasql.utils.isNode ? location.origin + job_prm.pg_path : job_prm.pg_path) + zone;
  }
  else {
    if(name === 'doc' && job_prm.couch_doc) {
      return job_prm.couch_doc;
    }
    return path + zone + '_' + name + (_suffix ? '_' + _suffix : '');
  }
};
