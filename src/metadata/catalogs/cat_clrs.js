/**
 * ### Дополнительные методы справочника Цвета
 *
 */

exports.CatClrs = class CatClrs extends Object {

  inverted() {
    return this._manager.inverted(this);
  }

  // перед сохранением попытаемся заполнить grouping
  before_save() {
    const {clr_in, clr_out, grouping, is_folder, _manager} = this;
    const {cat, cch} = _manager._owner.$p;
    const owner = cch.properties.predefined('clr_grp');
    if(!is_folder && owner && !owner.empty()) {
      if(clr_in.empty() && clr_out.empty()) {
        if(grouping.empty()) {
          throw {status: 403, error: true, reason: 'Укажите значение группировки'};
        }
        return this;
      }
      this.set_grouping(cat.property_values.find_rows({owner}));
    }

    return this;
  }

  set_grouping(values) {
    const {clr_in, clr_out, _manager} = this;
    const white = _manager.predefined('Белый');
    const grp_in = clr_in === white ? 'Белый' : clr_in.grouping.name.split(' ')[0];
    const grp_out = clr_out === white ? 'Белый' : clr_out.grouping.name.split(' ')[0];
    if(!grp_in || grp_in === 'Нет' || !grp_out || grp_out === 'Нет') {
      this.grouping = values.find((v) => v.name === 'Нет');
    }
    else {
      this.grouping = values.find((v) => v.name.startsWith(grp_in) && v.name.endsWith(grp_out));
    }
  }

  save(post, operational, attachments, attr) {
    const {_manager} = this;
    if(!_manager.metadata().common) {
      return super.save(post, operational, attachments, attr);
    }
    const {job_prm, adapters: {pouch}} = _manager._owner.$p;
    const {remote: {meta}, props} = pouch;
    if(job_prm.is_node) {
      return super.save(false, false, null, {db: meta});
    }
    else {
      return pouch.fetch(props.path.replace(job_prm.local_storage_prefix, `common/_save/cat.clrs`), {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(this),
      })
        .then((res) => res.json())
        .then((res) => {
          if(res.error && (res.reason || res.message)) {
            throw res;
          }
          return this;
        });
    }
  }

  new_number_doc() {
    return super.new_number_doc('00');
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

  // разовый сервисный метод
  patch_grouping() {
    const {cat, cch} = this._owner.$p;
    const owner = cch.properties.predefined('clr_grp');
    const values = cat.property_values.find_rows({owner});
    const service = this.predefined('СЛУЖЕБНЫЕ');
    const {meta} = this.adapter.remote;
    return meta.allDocs({
      include_docs: true,
      startkey: 'cat.clrs|',
      endkey: 'cat.clrs|\u0fff',
    })
      .then(({rows}) => {

        // сначала обработаем несоставные цвета
        for(const {doc} of rows) {
          for(const row of doc.rows) {
            const clr = this.get(row.ref);
            let {clr_in, clr_out, parent, grouping} = clr;
            if(row.is_folder || parent === service || clr.predefined_name) {
              continue;
            }
            if(clr_in.empty() && clr_out.empty()) {
              if(['Moeller','Верзалит','Дерево','Кристаллит','Данке','Лишние','Шелкография','ФСФ'].includes(parent.name)) {
                clr.grouping = values.find((v) => v.name === 'Нет');
              }
              else if(grouping.empty()) {
                clr.grouping = owner.calculated.execute({elm: {clr}});
                if(clr.grouping.name === 'Нет') {
                  if(parent.name === 'RAL') {
                    clr.grouping = values.find((v) => v.name.startsWith(parent.name) && v.name.endsWith(parent.name));
                  }
                  else if(parent.name === 'Ламинация ПВХ') {
                    clr.grouping = values.find((v) => v.name.startsWith('Renolit') && v.name.endsWith('Renolit'));
                  }
                  else {
                    console.log(clr.name);
                  }
                }
              }
            }
            row.grouping = clr.grouping.ref;
          }
        }

        // затем, составные
        let res = Promise.resolve();
        for(const {doc} of rows) {
          for(const row of doc.rows) {
            const clr = this.get(row.ref);
            let {clr_in, clr_out, parent, grouping} = clr;
            if(row.is_folder || parent === service || clr.predefined_name) {
              continue;
            }
            if(clr_in.empty() && clr_out.empty()) continue;
            if(clr_in.empty() && !clr_out.empty() || !clr_in.empty() && clr_out.empty()) {
              console.log(clr.name);
              continue;
            };

            clr.set_grouping(values);
            row.grouping = clr.grouping.ref;
          }
          res = res.then(() => meta.put(doc));
        }
        return res;
      });
  }
}
