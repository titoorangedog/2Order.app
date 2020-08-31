import produce from 'immer';
import { call, select, put, takeLatest } from 'redux-saga/effects';
import { selectIsBuildingViewRoute, selectCurrentBuilding } from './selectors';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  BUILDING_GET_INSPECTION,
  BUILDING_GET_INSPECTION_SUCCESS,
  BUILDING_GET_INSPECTION_ERROR,
  BUILDING_CREATE_INSPECTION_SUCCESS,
} from './constants';
import { get } from '@services/api';

export function buildingGetInspection() {
  return {
    type: BUILDING_GET_INSPECTION,
  };
}

function* doBuildingGetInspectionOnOtherActions() {
  const isBuildingViewRoute = yield select(selectIsBuildingViewRoute);
  if (!!isBuildingViewRoute) {
    yield put(buildingGetInspection());
  }
}

function* doBuildingGetInspection() {
  const building = yield select(selectCurrentBuilding);
  if (!!building) {
    try {
      const inspection = yield call(get, `inspections/${building.buildingId}`);
      if (!!inspection && !inspection.isTransient) {
        yield put({
          type: BUILDING_GET_INSPECTION_SUCCESS,
          payload: inspection,
        });
      } else {
        yield put({
          type: BUILDING_GET_INSPECTION_SUCCESS,
          payload: null,
        });
      }
    } catch (error) {
      yield put({
        type: BUILDING_GET_INSPECTION_ERROR,
        payload: error.message,
      });
    }
  } else {
    yield put({
      type: BUILDING_GET_INSPECTION_ERROR,
      payload: "Error: Current building doesn't exists.",
    });
  }
}

export function* buildingGetInspectionSagas() {
  yield takeLatest(LOCATION_CHANGE, doBuildingGetInspectionOnOtherActions);
  yield takeLatest(BUILDING_GET_INSPECTION, doBuildingGetInspection);
  yield takeLatest(BUILDING_CREATE_INSPECTION_SUCCESS, doBuildingGetInspectionOnOtherActions);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BUILDING_GET_INSPECTION:
        draft.ui.busy = true;
        break;
      case BUILDING_GET_INSPECTION_SUCCESS:
        draft.ui.busy = false;
        draft.inspection = action.payload;
        break;
      case BUILDING_GET_INSPECTION_ERROR:
        draft.ui.busy = false;
        break;
      default:
        return state;
    }
  });
