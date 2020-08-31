import produce from 'immer';
import { BUILDING_UPDATE_BUILDING } from './constants';

export function buildingUpdateBuilding(building) {
  return {
    type: BUILDING_UPDATE_BUILDING,
    payload: building,
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BUILDING_UPDATE_BUILDING:
        // draft.buildings[0] = action.payload;
        draft.buildings = { ...state.building, '0': action.payload };
        break;
      default:
        return state;
    }
  });
