import produce from 'immer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { BUILDING_SAVE, BUILDING_SAVE_SUCCESS, BUILDING_SAVE_ERROR } from './constants';
import { post } from '@src/services/api';
import { push } from 'connected-react-router';
import { boardRoutes } from '@src/features/board/routes';

export function buildingSave(building) {
  return {
    type: BUILDING_SAVE,
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
      type: BUILDING_SAVE_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: BUILDING_SAVE_ERROR,
      payload: error.message,
    });
  }
}

export function* switchBuildingSave() {
  yield takeLatest(BUILDING_SAVE, doBuildingSave);
  yield takeLatest(BUILDING_SAVE_SUCCESS, doRedirectOnBuildingSave);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BUILDING_SAVE:
        draft.ui.busy = true;
        break;
      case BUILDING_SAVE_SUCCESS:
        draft.ui.busy = false;
        break;
      case BUILDING_SAVE_ERROR:
        draft.ui.busy = false;
        break;
      default:
        return state;
    }
  });
