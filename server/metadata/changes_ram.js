/**
 * Обрабатывает feed ram
 *
 * @module ram_changes
 *
 * Created by Evgeniy Malyarov on 14.06.2019.
 */


module.exports = function ram_changes({adapters: {pouch}, pricing, cat}, log, is_common) {

  pouch.local.ram.changes({
    since: 'now',
    live: true,
    include_docs: true,
  })
    .on('change', (change) => {

      // обновляем ram
      if(change.id.startsWith('doc.nom_prices_setup')) {
        if(!cat.abonents.price_types.map(v => v.valueOf()).includes(change.doc.price_type)) {
          return;
        }
        if(!is_common) {
          pricing.deffered_load_prices(log, false, change.doc.price_type);
        }
      }
      else {
        pouch.load_changes({docs: [change.doc]});
      }
      pouch.emit('ram_change', change);
    })
    .on('error', (err) => {
      log(`change error ${err}`);
    });
};
