// модификаторы справочников

export default function ($p) {

  const {adapters, cat, cch} = $p;

  // параметры выбора для группировки цветов
  adapters.pouch.on({
    pouch_doc_ram_loaded() {
      const path = cch.properties.predefined('clr_grp');
      if(path && !path.empty()) {
        const fld = cat.clrs.metadata('grouping');
        fld.choice_params = [{name: 'owner', path}];
      }
    },
  });

}
