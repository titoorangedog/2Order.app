import produce from 'immer';
import { call, takeLatest } from 'redux-saga/effects';
import { MENU_SAVE, MENU_SAVE_SUCCESS, MENU_SAVE_ERROR } from './constants';
import { push } from 'connected-react-router';
import { put } from '@src/services/api';
import { boardRoutes } from '@src/features/board/routes';

export function menuSave(menu) {
  return {
    type: MENU_SAVE,
    payload: menu,
  };
}
export function* doRedirectOnMenuSave() {
  yield put(push(boardRoutes.board));
}

function* doMenuSave({ payload }) {
  try {
    console.log('payload: ', payload);
    //   const json = `{
    //     "id": 8,
    //     "name" : "Menu 2",
    //     "startTime" : "21:00"
    // }`;

    yield call(put, `clubs/1/menu`, payload);
    yield put({
      type: MENU_SAVE_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: MENU_SAVE_ERROR,
      payload: error.message,
    });
  }
}

export function* switchMenuSave() {
  yield takeLatest(MENU_SAVE, doMenuSave);
  yield takeLatest(MENU_SAVE_SUCCESS, doRedirectOnMenuSave);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MENU_SAVE:
        draft.ui.busy = true;
        break;
      case MENU_SAVE_SUCCESS:
        draft.ui.busy = false;
        break;
      case MENU_SAVE_ERROR:
        draft.ui.busy = false;
        break;
      default:
        return state;
    }
  });
