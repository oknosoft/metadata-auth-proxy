/**
 * Обрабатывает feed ram
 *
 * @module ram_changes
 *
 * Created by Evgeniy Malyarov on 14.06.2019.
 */


module.exports = function ram_changes($p, log) {
  const {pouch} = $p.adapters;
  const mdm_changes = require('../mdm/auto_recalc')($p, log);

  pouch.on('nom_price', () => {
    mdm_changes.register('cat.nom');
  });

  pouch.local.ram.changes({
    since: 'now',
    live: true,
    include_docs: true,
  })
    .on('change', (change) => {
      // обновляем ram
      pouch.load_changes({docs: [change.doc]});
      // регистрируем для будущего пересчета
      mdm_changes.register(change.doc._id.split('|')[0]);
    })
    .on('error', (err) => {
      log(`change error ${err}`);
    });

  pouch.emit('pouch_complete_loaded');
}
