import produce from 'immer';

import { MENU_CHANGE_CURRENT } from './constants';

export function buildingChangeCurrent(values) {
  return {
    type: MENU_CHANGE_CURRENT,
    payload: values,
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MENU_CHANGE_CURRENT:
        draft.currentBuilding = action.payload;
        break;
      default:
        return state;
    }
  });
