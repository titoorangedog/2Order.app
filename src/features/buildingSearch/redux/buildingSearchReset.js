import { LOCATION_CHANGE } from 'connected-react-router';
import produce from 'immer';
import { select, put, takeLatest } from 'redux-saga/effects';
import { BUILDING_SEARCH_RESET } from './constants';
import { selectMatchUrlPath } from '@features/shared/redux/selectors';
import { buildingSearchRoutes } from '@features/buildingSearch/routes';

function* doResetBuildingSearch({ payload }) {
  const isRouteBuildingSearch = yield select(
    selectMatchUrlPath(buildingSearchRoutes.buildingSearch),
  );
  if (!!isRouteBuildingSearch) {
    yield put({
      type: BUILDING_SEARCH_RESET,
    });
  }
}

export function* resetBuildingSearchSagas() {
  yield takeLatest(LOCATION_CHANGE, doResetBuildingSearch);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BUILDING_SEARCH_RESET:
        draft.buildings = null;
        break;
      default:
        return state;
    }
  });
