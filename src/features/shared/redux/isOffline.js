import produce from 'immer';

import { SHARED_IS_OFFLINE } from './constants';

export function sharedIsOffline() {
  return {
    type: SHARED_IS_OFFLINE,
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHARED_IS_OFFLINE:
        draft.isOnline = false;
        break;
      default:
        return state;
    }
  });
