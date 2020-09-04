import { LOCATION_CHANGE } from 'connected-react-router';
import { put, select, takeLatest } from 'redux-saga/effects';
import { i18n } from '@common/i18n-loader';
import { sharedSetTopbar } from '@features/shared/redux/actions';
import { selectMatchUrlPath } from '@features/shared/redux/selectors';
import { selectIsMenuNewRoute, selectCurrentMenuInfo } from './selectors';
import { menuRoutes } from '../routes';

function* doSetTopbar() {
  const isMenuNewRoute = yield select(selectIsMenuNewRoute);

  if (!!isMenuNewRoute) {
    yield put(sharedSetTopbar({ title: i18n._('New Menu'), back: true }));
  } else {
    const currentMenu = yield select(selectCurrentMenuInfo);
    if (!!currentMenu) {
      const isRouteMenuView = yield select(
        selectMatchUrlPath(menuRoutes.menuView.replace(':id', currentMenu.id)),
      );

      const isRouteEditView = yield select(
        selectMatchUrlPath(menuRoutes.menuEdit.replace(':id', currentMenu.id)),
      );

      if (!!isRouteMenuView || !!isRouteEditView) {
        yield put(
          sharedSetTopbar({
            title: `${currentMenu.id} - ${currentMenu.name}`,
            back: true,
          }),
        );
      }
    }
  }
}

export function* switchSetTopbar() {
  yield takeLatest(LOCATION_CHANGE, doSetTopbar);
}
