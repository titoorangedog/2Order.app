import { post } from '@src/services/api';
import produce from 'immer';
import { call, select, put, takeLatest } from 'redux-saga/effects';
import {
  BUILDING_CREATE_INSPECTION,
  BUILDING_CREATE_INSPECTION_ERROR,
  BUILDING_CREATE_INSPECTION_SUCCESS,
} from './constants';
import { selectCurrentBuilding } from './selectors';

export function buildingCreateInspection() {
  return {
    type: BUILDING_CREATE_INSPECTION,
  };
}

function* doBuildingCreateInspection() {
  try {
    const building = yield select(selectCurrentBuilding);
    if (!!building) {
      yield call(post, 'inspections/insertinspection', {
        buildingId: building.buildingId,
      });
      yield put({
        type: BUILDING_CREATE_INSPECTION_SUCCESS,
      });
    } else {
      yield put({
        type: BUILDING_CREATE_INSPECTION_ERROR,
        payload: "Error: Current building doesn't exists.",
      });
    }
  } catch (error) {
    yield put({
      type: BUILDING_CREATE_INSPECTION_ERROR,
      payload: error.message,
    });
  }
}

export function* buildingCreateInspectionSagas() {
  yield takeLatest(BUILDING_CREATE_INSPECTION, doBuildingCreateInspection);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BUILDING_CREATE_INSPECTION:
        draft.ui.busy = true;
        break;
      case BUILDING_CREATE_INSPECTION_SUCCESS:
        draft.ui.busy = false;
        break;
      case BUILDING_CREATE_INSPECTION_ERROR:
        draft.ui.busy = false;
        break;
      default:
        return state;
    }
  });
