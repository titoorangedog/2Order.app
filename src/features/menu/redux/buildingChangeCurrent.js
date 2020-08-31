import produce from 'immer';

import { BUILDING_CHANGE_CURRENT } from './constants';

export function buildingChangeCurrent(values) {
  return {
    type: BUILDING_CHANGE_CURRENT,
    payload: values,
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BUILDING_CHANGE_CURRENT:
        draft.currentBuilding = action.payload;
        break;
      default:
        return state;
    }
  });
