import { LOCATION_CHANGE } from 'connected-react-router';
import { put, select, takeLatest } from 'redux-saga/effects';
import { i18n } from '../../../common/i18n-loader';
import { sharedSetTopbar } from '../../shared/redux/actions';
import { selectMatchUrlPath } from '../../shared/redux/selectors';
import { boardRoutes } from '../routes';

function* doSetTopbar() {
  const isRouteBoard = yield select(selectMatchUrlPath(boardRoutes.board));
  if (isRouteBoard) {
    yield put(sharedSetTopbar({ title: i18n._('Board') }));
  }
}

export function* setTopbarSagas() {
  yield takeLatest(LOCATION_CHANGE, doSetTopbar);
}
