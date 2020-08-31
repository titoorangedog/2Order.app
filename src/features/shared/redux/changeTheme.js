import produce from 'immer';

import { SHARED_CHANGE_THEME } from './constants';

export function sharedChangeTheme(theme) {
  return {
    type: SHARED_CHANGE_THEME,
    payload: theme,
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHARED_CHANGE_THEME:
        draft.theme = action.payload;
        break;
      default:
        return state;
    }
  });
