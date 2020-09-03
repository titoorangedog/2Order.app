import produce from 'immer';
import { call, put, takeEvery } from 'redux-saga/effects';

import { BOARD_DELETE_MENU, BOARD_DELETE_MENU_SUCCESS, BOARD_DELETE_MENU_ERROR } from './constants';
import { filter } from 'ramda';
import { deleteById } from '@src/services/api';

export function boardRemoveMenu(menu) {
  return {
    type: BOARD_DELETE_MENU,
    payload: menu,
  };
}

function* doBoardRemoveMenu({ payload: menu }) {
  try {
    if (!!menu) {
      yield call(deleteById, `clubs/1/menu`, menu.id);
      yield put({
        type: BOARD_DELETE_MENU_SUCCESS,
        payload: menu,
      });
    } else {
      yield put({
        type: BOARD_DELETE_MENU_ERROR,
        payload: 'No menu provided',
      });
    }
  } catch (error) {
    yield put({
      type: BOARD_DELETE_MENU_ERROR,
      payload: error.message,
    });
  }
}

export function* removeMenuSagas() {
  yield takeEvery(BOARD_DELETE_MENU, doBoardRemoveMenu);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BOARD_DELETE_MENU:
        draft.ui.busy.loading = true;
        break;
      case BOARD_DELETE_MENU_SUCCESS:
        draft.clubMenus = filter(b => b.id !== action.payload.id, draft.clubMenus);
        draft.ui.busy.loading = false;
        break;
      case BOARD_DELETE_MENU_ERROR:
        draft.ui.busy.loading = false;
        break;
      default:
        return state;
    }
  });
