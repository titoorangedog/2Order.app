import produce from 'immer';

import { SHARED_IS_ONLINE } from './constants';

export function sharedIsOnline() {
  return {
    type: SHARED_IS_ONLINE,
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHARED_IS_ONLINE:
        draft.isOnline = true;
        break;
      default:
        return state;
    }
  });
