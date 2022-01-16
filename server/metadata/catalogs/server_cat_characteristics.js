
module.exports = function ({CatCharacteristics, classes: {CatObj}}, log) {

  CatCharacteristics.prototype.toJSON = function toJSON() {
    const json = CatObj.prototype.toJSON.call(this);
    if(this instanceof CatCharacteristics && this.obj_delivery_state == 'Шаблон') {
      json._rev = this._rev;
    }
    return json;
  };
};
