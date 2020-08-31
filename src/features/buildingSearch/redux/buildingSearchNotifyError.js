import { actions as toastrActions } from 'react-redux-toastr';
import { put, takeLatest } from 'redux-saga/effects';
import { BUILDING_SEARCH_ERROR } from './constants';

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
  yield takeLatest([BUILDING_SEARCH_ERROR], doNotifyError);
}
