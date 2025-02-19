
exports.CatAbonents = class CatAbonents extends Object {

  /**
   * Возвращает базу PouchDB абонента
   * @param cachable {String}
   * @return {PouchDB}
   */
  db(cachable) {
    const {job_prm: {server, zone}, adapters: {pouch}} = this._manager._owner.$p;
    return server.abonents.length < 2 && !server.single_db && zone == this.id ? pouch.remote[cachable] : this.server.db(this, cachable);
  }

  /**
   * Возвращает все типы цен, задействованные в абоненте
   * @return {Array.CatNom_prices_types}
   */
  get price_types() {
    const {job_prm: {pricing}} = this._manager._owner.$p;
    return [pricing.price_type_first_cost];
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
