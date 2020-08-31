import { post } from '@services/api';
import produce from 'immer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { BUILDING_SEARCH, BUILDING_SEARCH_ERROR, BUILDING_SEARCH_SUCCESS } from './constants';

export function buildingSearch(filter) {
  return {
    type: BUILDING_SEARCH,
    payload: filter,
  };
}

function* doBuildingSearch({ payload }) {
  try {
    const response = yield call(post, 'buildings/search', { filter: payload });
    yield put({
      type: BUILDING_SEARCH_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: BUILDING_SEARCH_ERROR,
      payload: error.message,
    });
  }
}

export function* buildingSearchSagas() {
  yield takeLatest(BUILDING_SEARCH, doBuildingSearch);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BUILDING_SEARCH:
        draft.ui.busy.search = true;
        break;
      case BUILDING_SEARCH_SUCCESS:
        draft.buildings = action.payload.items;
        draft.ui.busy.search = false;
        break;
      case BUILDING_SEARCH_ERROR:
        draft.buildings = [];
        draft.ui.busy.search = false;
        break;
      default:
        return state;
    }
  });
