/**
 * Обрабатывает feed ram
 *
 * @module ram_changes
 *
 * Created by Evgeniy Malyarov on 14.06.2019.
 */


module.exports = function ram_changes($p, log) {
  const {pouch} = $p.adapters;

  pouch.local.ram.changes({
    since: 'now',
    live: true,
    include_docs: true,
  })
    .on('change', (change) => {
      // обновляем ram
      pouch.load_changes({docs: [change.doc]});
      pouch.emit('ram_change', change);
    })
    .on('error', (err) => {
      log(`change error ${err}`);
    });

  log(`loadind to ram: complete`);
  !pouch.props.user_node && pouch.emit('pouch_complete_loaded');
}
