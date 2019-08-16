import Lazy from 'metadata-react/DumbLoader/Lazy';

const lazy = {
  FieldColor: Lazy,
};

import('./FieldColor')
  .then((module) => lazy.FieldColor = module.default);

export default lazy;
