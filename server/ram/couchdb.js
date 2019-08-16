/**
 * Создаёт базы ram local и remote
 *
 * @module couchdb
 *
 * Created by Evgeniy Malyarov on 14.08.2019.
 */

module.exports = function common({log, $p}) {
  const {job_prm: {couch_local, user_node}, adapters: {pouch}, classes: {PouchDB}} = $p;
  const local = new PouchDB('local', {adapter: 'memory', revs_limit: 3, auto_compaction: true});
  const remote = pouch.remote.meta;
  const selector = {_id: {$regex: "cat.clrs"}};
  return remote.info()
    .then((info) => {
      log(`Подключение к ${info.host}`);
      return local.replicate.from(remote, {selector});
    })
    .then(() => {
      log(`Загружен образ в ram`);
      pouch.local.common = local;
      return local;
    });
}
