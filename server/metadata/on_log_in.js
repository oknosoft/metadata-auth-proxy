/**
 * Создаёт базы meta в адаптере
 *
 * @module on_log_in
 *
 * Created by Evgeniy Malyarov on 02.06.2019.
 */

const {preserv_cachable} = require('../../scripts/meta.patch');

module.exports = function on_log_in(log) {
  return function on_log_in({pouch, classes, job_prm, cat, ireg}) {
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

          // грузим из meta
          let res = Promise.resolve();
          cat.forEach((mgr) => {
            if(mgr.cachable === 'meta' || mgr.class_name === 'cat.clrs') {
              res = res.then(() => pouch.find_rows(mgr, {_top: 1000}, pouch.remote.meta));
                //.then(() => log(`${mgr.class_name}: ${mgr.alatable.length}`));
            }
          });
          return res;
        });
  };
}
