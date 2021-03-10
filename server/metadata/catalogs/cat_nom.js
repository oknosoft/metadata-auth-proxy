/**
 * ### Дополнительные методы справочника _Номенклатура_
 *
 * @module cat_nom
 *
 * Created by Evgeniy Malyarov on 25.10.2019.
 */

const doc_changes = require('../changes_doc');

module.exports = function ($p, log) {

  const {CatNom, classes: {CatObj}, pricing, adapters, cat: {nom_units}} = $p;

  // грузит в ram цены номенклатуры
  pricing.load_prices  = function load_prices() {
    return this.by_range()
      .then(() => {
        // затем, подписываемся на изменения doc и meta
        doc_changes($p, log);
        adapters.pouch.emit('pouch_complete_loaded');
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
    if(this instanceof CatNom) {
      if(this._data._price) {
        json._price = planify(this._data._price);
      }
      const owner = this.ref;
      json.units =nom_units.alatable
        .filter((v) => v.owner === owner)
        .map((v) => {
          return `${v.ref},${v.id},${v.name},${v.qualifier_unit},${v.heft||0},${v.volume||0},${v.coefficient||1},${v.rounding_threshold||0}`;
        })
        .join('\n');
    }
    return json;
  };

};
