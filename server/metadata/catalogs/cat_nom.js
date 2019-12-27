/**
 * ### Дополнительные методы справочника _Номенклатура_
 *
 * @module cat_nom
 *
 * Created by Evgeniy Malyarov on 25.10.2019.
 */

module.exports = function ($p) {

  const {CatNom, classes: {CatObj}} = $p;

  /**
   * ### Ценообразование
   *
   * @class Pricing
   * @param $p {MetaEngine} - контекст
   * @static
   */
  class Pricing {

    // грузит в ram цены номенклатуры
    load_prices() {

      // сначала, пытаемся из local
      return this.by_range()
        .then(() => {
          const {pouch} = $p.adapters;

          // следим за изменениями документа установки цен, чтобы при необходимости обновить кеш
          if(pouch.local.doc === pouch.remote.doc) {
            pouch.local.doc.changes({
              since: 'now',
              live: true,
              include_docs: true,
              selector: {class_name: {$in: ['doc.nom_prices_setup', 'cat.scheme_settings']}}
            }).on('change', (change) => {
              if(change.id.startsWith('doc.nom_prices_setup')) {
                // формируем новый
                this.by_doc(change.doc);
                pouch.emit('nom_price');
              }
              else if(change.id.startsWith('cat.scheme_settings')) {
                pouch.load_changes({docs: [change.doc]});
                pouch.emit('ram_change', change);
              }
            });
          }
        });
    }

    build_cache(rows) {
      const {nom} = $p.cat;
      for(const {key, value} of rows){
        const onom = nom.get(key[0], false, true);
        if (!onom || !onom._data){
          // $p.record_log({
          //   class: 'error',
          //   note,
          //   obj: {nom: key[0], value}
          // });
          continue;
        }
        if (!onom._data._price){
          onom._data._price = {};
        }
        const {_price} = onom._data;

        if (!_price[key[1]]){
          _price[key[1]] = {};
        }
        _price[key[1]][key[2]] = value.map((v) => ({
          date: new Date(v.date),
          currency: v.currency,
          price: v.price
        }));
      }
    }

    /**
     * Перестраивает кеш цен номенклатуры по длинному ключу
     * @param startkey
     * @param step
     * @return {Promise}
     */
    by_range(startkey, step = 0) {

      const {pouch} = $p.adapters;
      const {doc} = pouch.local;

      return doc.query('doc/doc_nom_prices_setup_slice_last',
        {
          limit: 600,
          include_docs: false,
          startkey: startkey || [''],
          endkey: ['\ufff0'],
          reduce: true,
          group: true,
        })
        .then((res) => {
          this.build_cache(res.rows);
          pouch.emit('nom_prices', ++step);
          if (res.rows.length === 600) {
            return this.by_range(res.rows[res.rows.length - 1].key, step);
          }
        })
        .catch((err) => {
          $p.record_log(err);
        });
    }

    /**
     * Перестраивает кеш цен номенклатуры по массиву ключей
     * @param startkey
     * @return {Promise}
     */
    by_doc({goods}) {
      const keys = goods.map(({nom, nom_characteristic, price_type}) => [nom, nom_characteristic, price_type]);
      const {doc} = $p.adapters.pouch.local;
      return doc.query("doc/doc_nom_prices_setup_slice_last",
        {
          include_docs: false,
          keys: keys,
          reduce: true,
          group: true,
        })
        .then((res) => {
          this.build_cache(res.rows);
        });
    }

  }

  $p.pricing = new Pricing();


  CatNom.prototype.toJSON = function toJSON() {
    const json = CatObj.prototype.toJSON.call(this);
    if(this instanceof CatNom && this._data._price) {
      json._price = this._data._price;
    }
    return json;
  };

};
