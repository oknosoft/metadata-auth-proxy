
exports.CatAbonents = class CatAbonents extends Object {

  /**
   * Возвращает базу PouchDB абонента
   * @param cachable {String}
   * @return {PouchDB}
   */
  db(cachable) {
    const {job_prm: {server}, adapters: {pouch}} = this._manager._owner.$p;
    return server.abonents.length < 2 && !server.single_db ? pouch.remote[cachable] : this.server.db(this, cachable);
  }

  /**
   * Возвращает все типы цен, задействованные в абоненте
   * @return {Array.CatNom_prices_types}
   */
  get price_types() {
    const res = new Set();
    this._manager._owner.branches.find_rows({owner: this}, (branch) => {
      for(const {acl_obj} of branch.price_types) {
        res.add(acl_obj);
      }
    });
    return Array.from(res).map((acl_obj) => ({acl_obj}));
  }

  /**
   * Сериализация
   * @return {Object}
   */
  toJSON() {
    const {ref, id, name, no_mdm, servers} = this;
    return {
      ref,
      id,
      name,
      no_mdm,
      servers: servers._obj.map(({key, proxy, name}) => ({key, proxy, name})),
    };
  }
};
