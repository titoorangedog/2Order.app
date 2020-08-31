import { LOCATION_CHANGE } from 'connected-react-router';
import produce from 'immer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { get } from '@services/api';
import {
  BUILDING_GET_QC_CAPEX_OBJECT_TYPE_ERROR,
  BUILDING_GET_QC_CAPEX_OBJECT_TYPE_SUCCESS,
} from './constants';
import { selectIsBuildingNewRoute } from './selectors';

function* doGetQCCapexObjectTypes() {
  const isBuildingNewRoute = yield select(selectIsBuildingNewRoute);
  if (isBuildingNewRoute) {
    try {
      const qccapexobjecttypes = yield call(get, 'buildings/qccapexobjecttypes');
      yield put({
        type: BUILDING_GET_QC_CAPEX_OBJECT_TYPE_SUCCESS,
        payload: qccapexobjecttypes,
      });
    } catch (error) {
      yield put({
        type: BUILDING_GET_QC_CAPEX_OBJECT_TYPE_ERROR,
        payload: error.message,
      });
    }
  }
}

export function* switchGetQCCapexObjectTypes() {
  yield takeLatest(LOCATION_CHANGE, doGetQCCapexObjectTypes);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BUILDING_GET_QC_CAPEX_OBJECT_TYPE_SUCCESS:
        draft.qccapexobjecttypes = action.payload.objectTypes;
        break;
      case BUILDING_GET_QC_CAPEX_OBJECT_TYPE_ERROR:
        draft.qccapexobjecttypes = null;
        break;
      default:
        return state;
    }
  });
