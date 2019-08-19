/**
 * ### Дополнительные методы справочника Цвета
 *
 */

exports.CatClrs = class CatClrs extends Object {

  inverted() {
    return this._manager.inverted(this);
  }

  save(post, operational, attachments, attr) {
    const {_manager} = this;
    if(!_manager.metadata().common) {
      return super.save(post, operational, attachments, attr);
    }
    const {job_prm, adapters: {pouch: {remote: {ram}, local: {common}, props}}} = _manager._owner.$p;
    if(job_prm.is_node) {
      return super.save(false, false, null, {db: common});
    }
    else {
      const authHeader = ram.getBasicAuthHeaders({prefix: props._auth_provider.toUpperCase() + ' ', ...ram.__opts.auth});
      return fetch(props.path.replace(job_prm.local_storage_prefix, `common/_save/cat.clrs`), {
        method: 'POST',
        headers: Object.assign({'Content-Type': 'application/json'}, authHeader),
        body: JSON.stringify(this),
      })
        .then((res) => res.json())
        .then((res) => {
          return this;
        });
    }

  }
}

exports.CatClrsManager = class CatClrsManager extends Object {

  // ищет по цветам снаружи-изнутри
  by_in_out({clr_in, clr_out}) {
    const {wsql, utils: {blank}} = this._owner.$p;
    // скомпилированный запрос
    if(!this._by_in_out) {
      this._by_in_out = wsql.alasql.compile('select top 1 ref from ? where clr_in = ? and clr_out = ? and (not ref = ?)');
    }
    // ищем в справочнике цветов
    return this._by_in_out([this.alatable, clr_in.valueOf(), clr_out.valueOf(), blank.guid]);
  }

  // ищет инверсный
  inverted(clr) {
    if(clr.clr_in == clr.clr_out || clr.clr_in.empty() || clr.clr_out.empty()) {
      return clr;
    }
    const ares = this.by_in_out({clr_in: clr.clr_out, clr_out: clr.clr_in});
    return ares.length ? this.get(ares[0]) : clr;
  }

  // создаёт при необходимости составной цвет
  create_composite({clr_in, clr_out, with_inverted = true}) {
    const {job_prm, utils: {blank}} = this._owner.$p;
    if(!clr_in || clr_in == blank.guid || !clr_out || clr_out == blank.guid) {
      return Promise.reject(new TypeError('Для составного цвета не задан цвет снаружи или изнутри'));
    }
    clr_in = this.get(clr_in);
    clr_out = this.get(clr_out);
    const ares = this.by_in_out({clr_in, clr_out});
    const res = with_inverted ? this.create_composite({clr_in: clr_out, clr_out: clr_in, with_inverted: false}) : Promise.resolve();
    return res.then(() => (
      ares.length ?
        Promise.resolve(this.get(ares[0])) :
        this.create({
          clr_in,
          clr_out,
          name: `${clr_in.name} \\ ${clr_out.name}`,
          parent: job_prm.builder.composite_clr_folder
        })
    ))
      .then((clr) => clr._modified ? clr.save() : clr)
      .then((clr) => (with_inverted ? {clr, inverted: this.inverted(clr)} : clr));
  }
}
