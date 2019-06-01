/**
 * Создаёт базы meta в адаптере
 *
 * @module on_log_in
 *
 * Created by Evgeniy Malyarov on 02.06.2019.
 */

module.exports = function on_log_in(pouch, classes) {
  const {auth} = pouch.remote.ram.__opts;
  pouch.remote.meta = new classes.PouchDB(pouch.props.path + 'meta', {skip_setup: true, auth});
  Object.defineProperty(pouch.local, 'meta', {get(){ return pouch.remote.meta;}});
  return pouch.remote.meta.info();
}
