
module.exports = function log_processing({md, adapters: {pouch}, utils}, log) {

  log.processing = function ({doc, action, register, error}) {
    const key = md.get(doc.class_name);
    return Promise.resolve();
  }
}
