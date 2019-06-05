
exports.CatServers = class CatServers extends Object {

  db(abonent, cachable) {
    if(!this._dbs) {
      this._dbs = new Map();
    }
    if(!this._dbs.get(abonent)) {
      this._dbs.set(abonent, {});
    }
    const dbs = this._dbs.get(abonent);
    if(!dbs[cachable]) {
      const {adapter, _owner: {$p}} = this._manager;
      const {auth} = adapter.remote.ram.__opts;
      const opts = {skip_setup: true, auth};
      dbs[cachable] = new $p.classes.PouchDB(
        cachable[0] === '_' ?
          this.http.replacs($p.job_prm.local_storage_prefix, cachable)
          :
          `${this.http}${abonent.id}_${cachable}`, opts);
    }
    return dbs[cachable];
  }

};
