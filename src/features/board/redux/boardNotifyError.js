import { actions as toastrActions } from 'react-redux-toastr';
import { put, takeLatest } from 'redux-saga/effects';
import { BOARD_GET_CLUB_MENUS_ERROR } from './constants';

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
  yield takeLatest([BOARD_GET_CLUB_MENUS_ERROR], doNotifyError);
}
