import { actions as toastrActions } from 'react-redux-toastr';
import { put, takeLatest } from 'redux-saga/effects';
import { BUILDING_GET_QC_CAPEX_OBJECT_TYPE_ERROR, BUILDING_SAVE_ERROR } from './constants';

function* doNotifyError({ payload }) {
  yield put(
    toastrActions.add({
      type: 'error',
      attention: true,
      message: payload,
    }),
  );
}

export function* notifyErrorSagas() {
  yield takeLatest(BUILDING_SAVE_ERROR, doNotifyError);
  yield takeLatest(BUILDING_GET_QC_CAPEX_OBJECT_TYPE_ERROR, doNotifyError);
}
