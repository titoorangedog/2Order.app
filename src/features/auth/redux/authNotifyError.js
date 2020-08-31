import { actions as toastrActions } from 'react-redux-toastr';
import { put, takeLatest } from 'redux-saga/effects';
import { AUTH_GET_CUSTOMERS_ERROR, AUTH_LOGIN_ERROR } from './constants';

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
  yield takeLatest([AUTH_GET_CUSTOMERS_ERROR, AUTH_LOGIN_ERROR], doNotifyError);
}
