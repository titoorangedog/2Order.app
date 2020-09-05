import produce from 'immer';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { MENU_DELETE, MENU_DELETE_SUCCESS, MENU_DELETE_ERROR } from './constants';
import { push } from 'connected-react-router';
import { deleteById, get } from '@src/services/api';
import { boardRoutes } from '@src/features/board/routes';
import { selectCurrentMenuInfo, selectCurrentMenuUrlParams } from './selectors';

export function menuDelete(menuName) {
  return {
    type: MENU_DELETE,
    payload: menuName,
  };
}

export function* doRedirectOnMenuDelete() {
  yield put(push(boardRoutes.board));
}

function* doMenuDelete({ payload: menuName }) {
  try {
    let currentMenu = yield select(selectCurrentMenuInfo);

    if (!!currentMenu) {
      const params = yield select(selectCurrentMenuUrlParams);
      currentMenu = yield call(get, `clubs/1/menu/${params.id}`);
    }

    if (!!currentMenu) {
      if (currentMenu.name === menuName) {
        yield call(deleteById, `clubs/1/menu`, currentMenu.id);

        yield put({
          type: MENU_DELETE_SUCCESS,
        });
      } else {
        yield put({
          type: MENU_DELETE_ERROR,
          payload: `Menu name doesn't match`,
        });
      }
    }
  } catch (error) {
    yield put({
      type: MENU_DELETE_ERROR,
      payload: error.message,
    });
  }
}

export function* menuDeleteMenuSagas() {
  yield takeLatest(MENU_DELETE, doMenuDelete);
  yield takeLatest(MENU_DELETE_SUCCESS, doRedirectOnMenuDelete);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MENU_DELETE:
        draft.ui.busy = true;
        break;
      case MENU_DELETE_SUCCESS:
        draft.ui.busy = false;
        break;
      case MENU_DELETE_ERROR:
        draft.ui.busy = false;
        break;
      default:
        return state;
    }
  });
