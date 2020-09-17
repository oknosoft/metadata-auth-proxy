/**
 * ### Дополнительные методы справочника _Номенклатура_
 *
 * @module cat_nom
 *
 * Created by Evgeniy Malyarov on 25.10.2019.
 */

const doc_changes = require('../changes_doc');

module.exports = function ($p, log) {

  const {CatNom, classes: {CatObj}, pricing, cat: {nom_units}} = $p;

  // грузит в ram цены номенклатуры
  pricing.load_prices  = function load_prices() {
    return this.by_range()
      .then(() => {
        // затем, подписываемся на изменения doc
        doc_changes($p, log);
      });
  };

  function planify(price) {
    const _price = {};
    for(const cx in price) {
      _price[cx] = {};
      for(const pt in price[cx]) {
        _price[cx][pt] = price[cx][pt].map(({date, currency, price}) => ({date, currency: currency.valueOf(), price}));
      }
    }
    return _price;
  }

  CatNom.prototype.toJSON = function toJSON() {
    const json = CatObj.prototype.toJSON.call(this);
    if(this instanceof CatNom && this._data._price) {
      json._price = planify(this._data._price);
    }
    json.units = nom_units.find_rows({owner: this})
      .map((v) => `${v.ref},${v.id},${v.name},${v.qualifier_unit.ref},${v.heft},${v.volume},${v.coefficient},${v.rounding_threshold}`)
      .join('\n');

    return json;
  };

};
