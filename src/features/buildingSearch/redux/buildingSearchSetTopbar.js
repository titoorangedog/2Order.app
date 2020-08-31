import { LOCATION_CHANGE } from 'connected-react-router';
import { put, select, takeLatest } from 'redux-saga/effects';
import { i18n } from '@common/i18n-loader';
import { sharedSetTopbar } from '@features/shared/redux/actions';
import { selectMatchUrlPath } from '@features/shared/redux/selectors';
import { buildingSearchRoutes } from '@features/buildingSearch/routes';

function* doSetTopbar() {
  const isRouteBuildingSearch = yield select(
    selectMatchUrlPath(buildingSearchRoutes.buildingSearch),
  );
  if (!!isRouteBuildingSearch) {
    yield put(sharedSetTopbar({ title: i18n._('Building search'), back: true }));
  }
}

export function* setTopbarSagas() {
  yield takeLatest(LOCATION_CHANGE, doSetTopbar);
}
