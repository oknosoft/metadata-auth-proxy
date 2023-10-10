
const fetch = require('node-fetch');
const {Headers} = fetch;

module.exports = function ({DocCalc_order, classes: {DocObj}, job_prm: {server, user_node}, utils, cat, doc}, log) {

  DocCalc_order.prototype.toJSON = function toJSON() {
    const json = DocObj.prototype.toJSON.call(this);
    if(this instanceof DocCalc_order && this.obj_delivery_state == 'Шаблон') {
      json._rev = this._rev;
    }
    return json;
  };

  /**
   * @summary Получает документ и его продукции из удалённой базы
   * @desc Если год и зона, обслуживаются текущим proxy - выполняет стандартную обработку.
   * Иначе - перенаправляет запрос стороннему proxy и тот выполняет стандартную обработку.
   * @param {String} ref - ссылка документа
   * @param {String|Number|CatAbonents} zone - номер зоны или ссылка абонента, или сам абонент
   * @param {String|Number} year - год
   * @param {String|Number|CatBranches} branch - ссылка отдела абонента или номер отдела сам отдел
   */
  doc.calc_order.routedGet = async function ({ref, zone, year, branch}) {
    const key = parseFloat(year);
    const abonent = utils.is_guid(zone) ? cat.abonents.get(zone) : cat.abonents.by_id(zone);
    if(abonent.is_new()) {
      throw new Error(`unknown zone=${zone}`);
    }
    const yrow = abonent.servers.find({key});
    if(!yrow?.proxy) {
      throw new Error(`unknown proxy for zone=${zone} year=${year}`);
    }
    branch = typeof branch === 'number' ? cat.branches.find({suffix: branch}) : cat.branches.get(branch);
    if(!branch.empty() && branch.owner !== abonent) {
      throw new Error(`branch owner ${branch.owner.id}!==${abonent.id}`);
    }
    const headers = new Headers({
      zone,
      year,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(user_node.username + ':' + user_node.password, 'utf8').toString('base64')}`});
    const url = `${yrow.proxy}/couchdb/wb_${zone}_doc${branch.empty() ? '' : `_${branch.suffix}`}/${this.class_name}|${ref}`;
    let raw = await fetch(url, {headers})
      .then(res => res.json());
    raw.ref = raw._id.substring(15);
    delete raw._id;
    const calc_order = this.create(raw, false, true);
    const keys = [];
    for(const {characteristic} of calc_order.production) {
      if(!characteristic.empty() && characteristic.is_new()) {
        keys.push(`${characteristic.class_name}|${characteristic.ref}`);
      }
    }
    raw = await fetch(url.replace(`${this.class_name}|${ref}`, '_all_docs?include_docs=true'), {
      headers,
      method: 'POST',
      body: JSON.stringify({keys}),
    })
      .then(res => res.json());
    this.adapter.load_changes(raw, {});
    return calc_order;
  }
};

