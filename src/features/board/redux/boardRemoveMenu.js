import produce from 'immer';
import { call, put, takeEvery } from 'redux-saga/effects';

import { BOARD_REMOVE_MENU, BOARD_REMOVE_MENU_SUCCESS, BOARD_REMOVE_MENU_ERROR } from './constants';
import { filter } from 'ramda';
import { post } from '@src/services/api';

export function boardRemoveMenu(building) {
  return {
    type: BOARD_REMOVE_MENU,
    payload: building,
  };
}

function* doBoardRemoveMenu({ payload: building }) {
  try {
    if (!!building) {
      yield call(post, `board/unbookmark`, { buildingId: building.buildingId });
      yield put({
        type: BOARD_REMOVE_MENU_SUCCESS,
        payload: building,
      });
    } else {
      yield put({
        type: BOARD_REMOVE_MENU_ERROR,
        payload: 'No menu provided',
      });
    }
  } catch (error) {
    yield put({
      type: BOARD_REMOVE_MENU_ERROR,
      payload: error.message,
    });
  }
}

export function* removeMenuSagas() {
  yield takeEvery(BOARD_REMOVE_MENU, doBoardRemoveMenu);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BOARD_REMOVE_MENU:
        draft.ui.busy.removingMenu[action.payload.id] = true;
        break;
      case BOARD_REMOVE_MENU_SUCCESS:
        draft.clubMenus = filter(b => b.id !== action.payload.id, draft.clubMenus);
        draft.ui.busy.removingMenu[action.payload.id] = false;
        break;
      case BOARD_REMOVE_MENU_ERROR:
        draft.ui.busy.removingMenu[action.payload.id] = false;
        break;
      default:
        return state;
    }
  });
