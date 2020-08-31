import { post } from '@services/api';
import produce from 'immer';
import { actions as toastrActions } from 'react-redux-toastr';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { boardGetClubMenus } from '../../board/redux/actions';
import {
  BUILDING_SEARCH_BOOKMARK,
  BUILDING_SEARCH_BOOKMARK_ERROR,
  BUILDING_SEARCH_BOOKMARK_SUCCESS,
} from './constants';

export function buildingSearchBookmark(building) {
  return {
    type: BUILDING_SEARCH_BOOKMARK,
    payload: building,
  };
}

function* doBookmark({ payload }) {
  try {
    let data = { buildingId: payload.id, ...payload };
    delete data['id'];

    yield call(post, `board/bookmark`, data);

    yield put({
      type: BUILDING_SEARCH_BOOKMARK_SUCCESS,
      payload: { building: payload },
    });
  } catch (error) {
    yield put({
      type: BUILDING_SEARCH_BOOKMARK_ERROR,
      payload: { building: payload, error: error.message },
    });
  }
}

function* doRefreshBoard() {
  yield put(boardGetClubMenus());
}

function* doNotifyError({ payload: { error } }) {
  yield put(
    toastrActions.add({
      type: 'error',
      attention: true,
      message: error,
    }),
  );
}

export function* bookmarkSagas() {
  yield takeEvery(BUILDING_SEARCH_BOOKMARK, doBookmark);
  yield takeLatest(BUILDING_SEARCH_BOOKMARK_SUCCESS, doRefreshBoard);
  yield takeLatest(BUILDING_SEARCH_BOOKMARK_ERROR, doNotifyError);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BUILDING_SEARCH_BOOKMARK:
        draft.ui.busy.bookmark[action.payload.id] = true;
        break;
      case BUILDING_SEARCH_BOOKMARK_SUCCESS:
        draft.ui.busy.bookmark[action.payload.building.id] = false;
        break;
      case BUILDING_SEARCH_BOOKMARK_ERROR:
        draft.ui.busy.bookmark[action.payload.building.id] = false;
        break;
      default:
        return state;
    }
  });
