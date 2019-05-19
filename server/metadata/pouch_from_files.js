/**
 *
 *
 * @module pouch_from_files
 *
 * Created by Evgeniy Malyarov on 24.02.2019.
 */

module.exports = {
  proto({classes}) {
    classes.AdapterPouch.prototype.from_files = function (local, remote, opts = {}) {
      const li = local.name.lastIndexOf('_');
      const id = local.name.substr(li + 1);
      return Promise.resolve(false);
    }
  }
};
