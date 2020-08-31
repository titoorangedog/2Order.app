import { LOCATION_CHANGE } from 'connected-react-router';
import { put, select, takeLatest } from 'redux-saga/effects';
import { i18n } from '@common/i18n-loader';
import { sharedSetTopbar } from '@features/shared/redux/actions';
import { selectMatchUrlPath } from '@features/shared/redux/selectors';
import { selectIsBuildingNewRoute, selectCurrentBuilding } from './selectors';
import { menuRoutes } from '../routes';

function* doSetTopbar() {
  const isBuildingNewRoute = yield select(selectIsBuildingNewRoute);

  if (!!isBuildingNewRoute) {
    yield put(sharedSetTopbar({ title: i18n._('New building'), back: true }));
  } else {
    const building = yield select(selectCurrentBuilding);
    if (!!building) {
      const isRouteBuildingView = yield select(
        selectMatchUrlPath(menuRoutes.menuView.replace(':id', building.buildingId)),
      );
      const isRouteBuildingComponentsView = yield select(
        selectMatchUrlPath(menuRoutes.buildingComponentsView.replace(':id', building.buildingId)),
      );

      if (!!isRouteBuildingView) {
        yield put(
          sharedSetTopbar({
            title: `${building.buildingId} - ${building.qcCapexObjectType}`,
            back: true,
          }),
        );
      } else if (!!isRouteBuildingComponentsView) {
        yield put(
          sharedSetTopbar({
            title: `${i18n._('Components')}`,
            subtitle: `${building.buildingId} - ${building.qcCapexObjectType}`,
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
