
exports.CatBranches = class CatBranches extends Object {

  get _server() {
    const {owner, parent, server} = this;
    if(!server.empty()) {
      return server;
    }
    if(!parent.empty()) {
      return parent._server;
    }
    return owner.server;
  }

  db(cachable) {
    let {_data, _manager: {adapter, _owner: {$p}}, _server, owner, suffix} = this;
    if(!_data.dbs) {
      _data.dbs = {};
    }
    if(_data.dbs[cachable]) {
      return _data.dbs[cachable];
    }
    const name = `${_server.http_local}${owner.id}_${cachable}_${suffix}`;
    const {auth} = adapter.remote.ram.__opts;
    const opts = {skip_setup: true, auth};
    _data.dbs[cachable] = new $p.classes.PouchDB(name, opts);
    return _data.dbs[cachable];
  }
};
