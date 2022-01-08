/**
 * Обрабатывает feed ram
 *
 * @module ram_changes
 *
 * Created by Evgeniy Malyarov on 14.06.2019.
 */


module.exports = function ram_changes({adapters: {pouch}, pricing}, log) {

  pouch.local.ram.changes({
    since: 'now',
    live: true,
    include_docs: true,
  })
    .on('change', (change) => {

      if(change.id.startsWith('doc.nom_prices_setup')) {
        // обновляем цены
        pricing.deffered_load_prices(log);
      }
      else {
        // обновляем ram
        pouch.load_changes({docs: [change.doc]});
        pouch.emit('ram_change', change);
      }
    })
    .on('error', (err) => {
      log(`change error ${err}`);
    });

  log(`load to ram: complete`);
  pouch.emit('pouch_complete_loaded');
}
