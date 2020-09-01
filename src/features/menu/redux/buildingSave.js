import produce from 'immer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { MENU_SAVE, MENU_SAVE_SUCCESS, MENU_SAVE_ERROR } from './constants';
import { post } from '@src/services/api';
import { push } from 'connected-react-router';
import { boardRoutes } from '@src/features/board/routes';

export function buildingSave(building) {
  return {
    type: MENU_SAVE,
    payload: building,
  };
}
export function* doRedirectOnBuildingSave() {
  yield put(push(boardRoutes.board));
}

function* doBuildingSave({ payload }) {
  try {
    yield call(post, 'buildings/insertbuilding', payload);
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

export function* switchBuildingSave() {
  yield takeLatest(MENU_SAVE, doBuildingSave);
  yield takeLatest(MENU_SAVE_SUCCESS, doRedirectOnBuildingSave);
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
