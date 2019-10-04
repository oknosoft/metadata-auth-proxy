/**
 * Создаёт базы meta в адаптере
 *
 * @module on_log_in
 *
 * Created by Evgeniy Malyarov on 02.06.2019.
 */

module.exports = function on_log_in({pouch, classes, job_prm, cat}) {
  const {auth} = pouch.remote.ram.__opts;
  const opts = {skip_setup: true, auth, owner: pouch};
  if(!pouch.local.meta) {
    pouch.remote.meta = new classes.PouchDB(pouch.props.path + 'meta', opts);
    Object.defineProperty(pouch.local, 'meta', {get(){ return pouch.remote.meta;}});
  }
  const meta = pouch.remote.meta.info();
  return !job_prm || !job_prm.is_node
    ?
    meta
    :
    meta
      .then(() => {

        // грузим из meta или doc
        let res = Promise.resolve();
        cat.forEach((mgr) => {
          if(mgr.cachable === 'meta') {
            res = res.then(() => mgr.find_rows_remote({_top: 1000}));
          }
          else if(mgr.cachable === 'doc' || mgr.original_cachable === 'doc') {
            res = res.then(() => mgr.adapter.find_rows(mgr, {_top: 100000}, pouch.remote.doc));
          }
        });
        return res;
      })
      .then(() => {
        // грузим из doc_ram
        let res = Promise.resolve();
        cat.forEach((mgr) => {
          if(/^doc/.test(mgr.metadata().original_cachable)) {
            cat.abonents.forEach((abonent) => {
              res = res.then(() => pouch.find_rows(mgr, {_top: 10000}, abonent.db('doc')));
            });
          }
        });
        cat.abonents.forEach((abonent) => {
          res = res.then(() => pouch.find_rows(cat.scheme_settings, {_top: 10000, user: ''}, abonent.db('doc')));
        });
        return res.catch((err) => {
          return null;
        });
      });
};
