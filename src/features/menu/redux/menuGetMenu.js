import produce from 'immer';
import { call, select, put, takeLatest } from 'redux-saga/effects';
import { selectIsMenuViewRoute, selectCurrentMenuUrlParams } from './selectors';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  MENU_GET_MENU,
  MENU_GET_MENU_SUCCESS,
  MENU_GET_MENU_ERROR,
  MENU_CREATE_MENU_SUCCESS,
} from './constants';
import { get } from '@services/api';

export function menuGetMenu() {
  return {
    type: MENU_GET_MENU,
  };
}

function* doMenuGetMenuOnOtherActions() {
  const isMenuViewRoute = yield select(selectIsMenuViewRoute);
  if (!!isMenuViewRoute) {
    yield put(menuGetMenu());
  }
}

function* doMenuGetMenu() {
  const params = yield select(selectCurrentMenuUrlParams);
  if (!!params) {
    try {
      const menu = yield call(get, `clubs/1/menu/${params.id}`);
      if (!!menu) {
        yield put({
          type: MENU_GET_MENU_SUCCESS,
          payload: menu,
        });
      } else {
        yield put({
          type: MENU_GET_MENU_SUCCESS,
          payload: null,
        });
      }
    } catch (error) {
      yield put({
        type: MENU_GET_MENU_ERROR,
        payload: error.message,
      });
    }
  } else {
    yield put({
      type: MENU_GET_MENU_ERROR,
      payload: "Error: Current building doesn't exists.",
    });
  }
}

export function* menuGetMenuSagas() {
  yield takeLatest(LOCATION_CHANGE, doMenuGetMenuOnOtherActions);
  yield takeLatest(MENU_GET_MENU, doMenuGetMenu);
  yield takeLatest(MENU_CREATE_MENU_SUCCESS, doMenuGetMenuOnOtherActions);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MENU_GET_MENU:
        draft.ui.busy = true;
        break;
      case MENU_GET_MENU_SUCCESS:
        draft.ui.busy = false;
        draft.menu = action.payload;
        break;
      case MENU_GET_MENU_ERROR:
        draft.ui.busy = false;
        break;
      default:
        return state;
    }
  });
