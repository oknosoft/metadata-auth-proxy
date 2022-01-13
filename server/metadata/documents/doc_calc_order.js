
module.exports = function ({DocCalc_order, classes: {DocObj}}, log) {

  DocCalc_order.prototype.toJSON = function toJSON() {
    const json = DocObj.prototype.toJSON.call(this);
    if(this instanceof DocCalc_order && this.obj_delivery_state == 'Шаблон') {
      json._rev = this._rev;
    }
    return json;
  };
};
