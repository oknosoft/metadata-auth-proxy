
exports.CatAbonents = class CatAbonents extends Object {

  db(cachable) {
    return this.server.db(this, cachable);
  }
};
