import { i18n } from '@common/i18n-loader';
import { sharedSetTopbar } from '@features/shared/redux/actions';
import { selectMatchUrlPath } from '@features/shared/redux/selectors';
import { LOCATION_CHANGE } from 'connected-react-router';
import { put, select, takeLatest } from 'redux-saga/effects';
import { authRoutes } from '../routes';

function* doSetTopbar() {
  const isLoginRoute = yield select(selectMatchUrlPath(authRoutes.login));

  if (isLoginRoute) {
    yield put(
      sharedSetTopbar({ title: i18n._('Customer'), subtitle: i18n._('Login'), back: true }),
    );
  }
}

export function* setTopbarSagas() {
  yield takeLatest(LOCATION_CHANGE, doSetTopbar);
}
