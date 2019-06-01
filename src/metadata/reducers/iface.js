/**
 * Reducer initial state
 */

import {ltitle} from '../../components/App/menu_items';

export default {
  'common': {
    title: ltitle,
  },
  OrderList: {
    state_filter: '',
  },
  NavDrawer: {
    open: false,
  },
  NavList: {
    orders: true,
  },
  LogDrawer: {
    open: false,
  },
};
