import { LOCATION_CHANGE } from 'connected-react-router';
import { put, select, takeLatest } from 'redux-saga/effects';
import { i18n } from '../../../common/i18n-loader';
import { sharedSetTopbar } from '../../shared/redux/actions';
import { selectMatchUrlPath } from '../../shared/redux/selectors';
import { profileRoutes } from '../routes';

function* doSetTopbar() {
  const isRouteProfile = yield select(selectMatchUrlPath(profileRoutes.profile));
  if (isRouteProfile) {
    yield put(sharedSetTopbar({ title: i18n._('Profile'), back: true }));
  }
}

export function* setTopBarSagas() {
  yield takeLatest(LOCATION_CHANGE, doSetTopbar);
}
