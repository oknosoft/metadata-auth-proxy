/**
 * Обрабатывает feed ram
 *
 * @module ram_changes
 *
 * Created by Evgeniy Malyarov on 14.06.2019.
 */

module.exports = function ram_changes({pouch, log}) {
  pouch.local.ram.changes({
    since: 'now',
    live: true,
    include_docs: true,
  })
    .on('change', (change) => {
      // формируем новый
      pouch.load_changes({docs: [change.doc]});
    })
    .on('error', (err) => {
      log(`change error ${err}`);
    });
  log(`loadind to ram: READY`);
  pouch.emit('pouch_complete_loaded');
}
