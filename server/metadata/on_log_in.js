/**
 * Создаёт базы meta в адаптере
 *
 * @module on_log_in
 *
 * Created by Evgeniy Malyarov on 02.06.2019.
 */

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
        })
        .then(() => {
          // грузим из doc_ram
          let res = Promise.resolve();
          const handler = (mgr) => {
            if(/^doc/.test(mgr.cachable) || /^doc/.test(mgr.metadata().original_cachable)) {
              if([
                //'cat.branches',
                //'cat.divisions',
                'cat.characteristics'].includes(mgr.class_name)) {
                return;
              }
              cat.abonents.forEach((abonent) => {
                if(job_prm.server.abonents.includes(abonent.id)) {
                  const filter = {_top: 100000};
                  if(mgr.class_name === 'cat.scheme_settings') {
                    filter.user = '';
                  }
                  res = res
                    .then(() => pouch.find_rows(mgr, filter, job_prm.server.single_db ? pouch.remote.doc : abonent.db('doc')))
                    .catch(log);
                }
              });
            }
          };
          cat.forEach(handler);
          ireg.forEach(handler);
          return res;
        });
  };
}
