import { actions as toastrActions } from 'react-redux-toastr';
import { put, takeLatest } from 'redux-saga/effects';
import { PROFILE_GET_USER_PROFILE_ERROR } from './constants';

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
  yield takeLatest([PROFILE_GET_USER_PROFILE_ERROR], doNotifyError);
}
