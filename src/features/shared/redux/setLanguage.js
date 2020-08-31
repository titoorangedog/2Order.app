import produce from 'immer';

import { SHARED_SET_LANGUAGE } from './constants';

export function sharedSetLanguage(language) {
  return {
    type: SHARED_SET_LANGUAGE,
    payload: language,
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHARED_SET_LANGUAGE:
        draft.language = action.payload;
        break;
      default:
        return state;
    }
  });
