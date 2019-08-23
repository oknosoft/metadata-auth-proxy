/**
 * Дерево метаданных
 */

// global $p
//import {classes} from 'metadata-core';

const struct = {
  cat: {
    icon: 'icon_1c_cat'
  },
  doc: {
    icon: 'icon_1c_doc'
  },
  enm: {
    icon: 'icon_1c_enm'
  }
};

class BaseItem {
  constructor(name, key, icon, _owner, children = []) {
    this.key = key;
    this.icon = icon;
    this._owner = _owner;
    this.children = children;
    this.name = name || this.meta.name;
  }

  get meta() {
    return this._owner.meta[this.key];
  }
}

class MetaDescription extends BaseItem {
  constructor(meta) {
    super('Метаданные', 'root', 'icon_1c_root', meta);
    for(const key in struct) {
      this.children.push(new MetaCollection(key, this));
    }
    this.children.push(new BaseItem('Схемы компоновки', 'schamas', 'icon_1c_tsk', this));
    this.toggled = true;
  }

  get meta() {
    return this._owner;
  }
}

class MetaCollection extends BaseItem {
  constructor(key, _owner) {
    super($p[key].toString(), key, struct[key].icon, _owner);
    for(const name in this.meta) {
      if (key == 'enm') {
        this.children.push(new MetaEnmObj(name, this));
      }
      else if (key.includes('reg')) {

      }
      else {
        this.children.push(new MetaObj(name, this));
      }
    }
  }
}

class MetaEnmObj extends BaseItem {
  constructor(key, _owner) {
    super(syns(key), key, struct[_owner.key].icon, _owner);
    this.children.push(new MetaEnmValues(this));
  }
}

class MetaEnmValues extends BaseItem {
  constructor(_owner) {
    super('Значения', 'values', 'icon_1c_props', _owner);
    for(const val of this.meta) {
      this.children.push(new BaseItem(val.synonym, val.name, 'icon_1c_props', this, null));
    }
  }

  get meta() {
    return this._owner.meta;
  }
}

class MetaTabularObj extends BaseItem {
  constructor(key, _owner) {
    super(syns(key), key, 'icon_1c_tabular', _owner);
    this.children.push(new MetaFields(this));
  }
}

class MetaTabulars extends BaseItem {
  constructor(_owner) {
    super('Табличные части', 'tabs', 'icon_1c_tabular', _owner);
    for(const key in this.meta) {
      this.children.push(new MetaTabularObj(key, this));
    }
  }

  get meta() {
    return this._owner.meta.tabular_sections;
  }
}

class MetaFieldObj extends BaseItem {
  constructor(key, _owner) {
    super(syns(key), key, 'icon_1c_props', _owner, null);
  }
}

class MetaFields extends BaseItem {
  constructor(_owner) {
    super('Реквизиты', 'fields', 'icon_1c_props', _owner);
    for(const key in this.meta.fields) {
      if(key !== 'predefined_name') {
        this.children.push(new MetaFieldObj(key, this));
      }
    }
  }

  get meta() {
    return this._owner.meta;
  }
}

class MetaForms extends BaseItem {
  constructor(_owner) {
    super('Формы', 'frms', 'icon_1c_frm', _owner);
  }

  get meta() {
    return this._owner.meta;
  }
}

class MetaObj extends BaseItem {
  constructor(key, _owner) {
    super(null, key, struct[_owner.key].icon, _owner);
    this.children.push(new MetaFields(this));
    this.children.push(new MetaTabulars(this));
    this.children.push(new MetaForms(this));
  }
}

function syns(name) {
  if(name === 'parent') return 'Родитель';
  if(name === 'owner') return 'Владелец';
  return $p.md.syns_1с(name);
}

async function get_meta() {

  const {adapters: {pouch}, utils} = $p;

  if(!pouch.remote.meta) {
    return new Promise((resolve, reject) => {
      if(get_meta.attempts > 3) {
        return reject(new TypeError('Нет базы meta'));
      }
      setTimeout(() => {
        if(!get_meta.attempts) {
          get_meta.attempts = 0;
        }
        get_meta.attempts++;
        return get_meta();
      }, 1000);
    });
  }

  return pouch.remote.meta.allDocs({
    include_docs: true,
    attachments: true,
    startkey: 'meta',
    endkey: 'meta\ufff0',
  })
    .then(({rows}) => {
      const _m = {};
      for(const {doc} of rows) {
        utils._patch(_m, doc);
      }
      const meta = new MetaDescription(_m);

      return meta;

    });
}

export default get_meta;
