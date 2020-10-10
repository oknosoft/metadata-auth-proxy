// модификаторы справочников

export default function ($p) {

  const fld = $p.cat.clrs.metadata('grouping');
  fld.choice_params = [{
    name: 'owner',
    get path() {
      return $p.cch.properties.predefined('clr_grp');
    }
  }];
}
