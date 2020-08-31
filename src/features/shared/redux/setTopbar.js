import produce from 'immer';

import { SHARED_SET_TOPBAR } from './constants';

export function sharedSetTopbar(topbar) {
  return {
    type: SHARED_SET_TOPBAR,
    payload: {
      title: !!topbar.title ? topbar.title : '2Order',
      titlePrimary: !topbar.title && topbar.title,
      subtitle: !!topbar.subtitle && topbar.subtitle,
      back: !!topbar.back && topbar.back,
    },
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHARED_SET_TOPBAR:
        draft.topbar = action.payload;
        break;
      default:
        return state;
    }
  });
