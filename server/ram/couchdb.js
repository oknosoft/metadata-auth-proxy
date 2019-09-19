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
  const selector = {class_name: {$in: ['cat.clrs']}};
  return remote.info()
    .then((rinfo) => {
      log(`Подключение к ${rinfo.host}`);
      return local.replicate.from(remote, {selector})
    })
    .then(() => Promise.all([
      remote.changes({descending: true, limit: 1}),
      local.changes({descending: true, limit: 1}),
    ]))
    .then(([rc, lc]) => {
      const skip = parseInt(rc.last_seq.replace(/-.*$/, ''), 10) - lc.last_seq;
      const id = 'fake_seq';
      const fake_fn = ({rev}) => {
        const doc = {_id: id};
        if(rev) {
          doc._rev = rev;
        }
        return local.put(doc);
      };
      let fake = local.get(id)
        .then(({_rev}) => ({rev: _rev}))
        .catch(() => ({}));
      for(let i = 0; i < skip; i++) {
        fake = fake.then(fake_fn);
      }
      return fake.then(() => local.info());
    })
    .then((linfo) => {
      log(`Загружен образ в ram`);
      pouch.local.common = local;
      pouch.local.sync.common = local.replicate.from(remote, {
        selector,
        live: true,
        retry: true,
        since: 'now'
      })
        .on('error', (err) => {
          log(err);
        });
      return local;
    });
}
