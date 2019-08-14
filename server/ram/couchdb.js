/**
 * Создаёт базы ram local и remote
 *
 * @module couchdb
 *
 * Created by Evgeniy Malyarov on 14.08.2019.
 */

const PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-adapter-http'))
  .plugin(require('pouchdb-replication'))
  .plugin(require('pouchdb-mapreduce'))
  .plugin(require('pouchdb-find'))
  .plugin(require('pouchdb-adapter-memory'));

module.exports = function common({log, conf: {couch_local, user_node}}) {
  const local = new PouchDB('local', {adapter: 'memory', revs_limit: 3, auto_compaction: true});
  const remote = new PouchDB(couch_local + 'meta', {auth: user_node, skip_setup: true});
  const selector = {_id: {$regex: "cat.clrs"}};
  return remote.info()
    .then((info) => {
      log(`Подключение к ${info.host}`);
      return local.replicate.from(remote, {selector});
    })
    .then(() => {
      log(`Загружен образ в ram`);
      return local.info().then(() => {
        return {local, remote};
      })
    });
}
