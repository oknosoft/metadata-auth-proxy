
module.exports = function log_processing({md, adapters: {pouch}, classes}, log) {

  if(!pouch.remote.log) {
    const {__opts} = pouch.remote.ram;
    pouch.remote.log = new classes.PouchDB(__opts.name.replace(/ram$/, 'log'), {
      skip_setup: true,
      adapter: 'http',
      owner: pouch,
      fetch: pouch.fetch,
    });
  }

  log.processing = function ({doc, action, register, error}) {
    const {id} = doc._metadata();
    if(!id) {
      return Promise.resolve();
    }
    const _id = `${id}|${doc.ref}|p`;
    return pouch.remote.log.get(_id)
      .catch((err) => {
        if(err.status !== 404) throw err;
        return {_id, events: []};
      })
      .then((logDoc) => {
        const {_rev} = doc;
        const actionKey = Object.keys(action)[0];
        let row = logDoc.events.find(v => v._rev === _rev && v.hasOwnProperty(actionKey) && v.register === register);
        const moment = new Date().toJSON();
        if(row) {
          row.attempt++;
          row.moment = moment;
          Object.assign(row, action);
        }
        else {
          row = {_rev, ...action, register, attempt: 1, moment};
          logDoc.events.push(row);
        }
        if(error) {
          row.error = error.message || error;
        }
        else if(row.error) {
          delete row.error;
        }
        return pouch.remote.log.put(logDoc);
      });
  }
}
