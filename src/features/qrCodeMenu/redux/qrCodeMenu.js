import produce from 'immer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { QRCODE_GET_MENU, QRCODE_GET_MENU_ERROR, QRCODE_GET_MENU_SUCCESS } from './constants';
import { LOCATION_CHANGE } from 'connected-react-router';
import { selectMatchUrlPath } from '@features/shared/redux/selectors';
import { qrCodeMenuRoutes } from '../routes';
import { getQrCode } from '@services/api';
import { selectCurrentQrCodeUrlParams } from './selectors';

export function qrCodeMenu() {
  return {
    type: QRCODE_GET_MENU,
  };
}

function* doQrCodeMenu() {
  try {
    const menu = null; //yield call(getQrCode, `clubs/${params.idClub}/tables/${params.idMenu}`);

    yield put({
      type: QRCODE_GET_MENU_SUCCESS,
      payload: menu,
    });
  } catch (error) {
    yield put({
      type: QRCODE_GET_MENU_ERROR,
      payload: error.message,
    });
  }
}

function* doQrCodeMenuOnOtherActions() {
  const isRouteQrCodeMenu = yield select(selectMatchUrlPath(qrCodeMenuRoutes.qrCodeMenu));
  if (isRouteQrCodeMenu) {
    yield put(qrCodeMenu());
  }
}

export function* qrCodeMenuSagas() {
  yield takeLatest(QRCODE_GET_MENU, doQrCodeMenu);
  yield takeLatest(LOCATION_CHANGE, doQrCodeMenuOnOtherActions);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case QRCODE_GET_MENU:
        draft.ui.busy = true;
        break;
      case QRCODE_GET_MENU_SUCCESS:
        draft.ui.busy = false;
        draft.qrCodeMenu = action.payload;
        break;
      case QRCODE_GET_MENU_ERROR:
        draft.ui.busy = false;
        break;
      default:
        return state;
    }
  });
