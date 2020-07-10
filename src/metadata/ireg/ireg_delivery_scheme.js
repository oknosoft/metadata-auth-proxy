/**
 * Схема доставки от складов к геозонам
 *
 * @module ireg_delivery_scheme
 *
 * Created 09.07.2020.
 */

exports.IregDelivery_schemeManager = class IregDelivery_schemeManager extends Object {

  route({warehouse, delivery_area}) {
    const tmp = [];
    const res = [];
    this.find_rows({warehouse, delivery_area}, (row) => {
      tmp.push(row);
    });
    if(!tmp.length) {
      return tmp;
    }
    tmp.sort((a, b) => a.chain - b.chain);
    const prev = tmp[0];
    res.push({
      warehouse,
      chain_area: prev.chain_area,
      rstore: !prev.chain_warehouse.empty(),
      chain: prev.chain,
    });
    for(let i=1; i<tmp.length; i++) {
      const prev = tmp[i - 1];
      const curr = tmp[i];
      res.push({
        warehouse: prev.chain_warehouse,
        chain_area: curr.chain_area,
        rstore: !curr.chain_warehouse.empty(),
        chain: curr.chain,
      });
    }

    return res;
  }
}
