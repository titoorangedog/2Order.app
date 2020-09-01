import { find } from 'ramda';
import { createMatchSelector } from 'connected-react-router';
import { createSelector } from 'reselect';
import { menuRoutes } from '../routes';
import { selectGetClubMenus } from '@features/board/redux/selectors';

const selectBuilding = state => state.building;

export const selectIsBuildingNewRoute = createSelector(
  state => state,
  createMatchSelector({ path: menuRoutes.buildingNew }),
);

export const selectIsBuildingViewRoute = createSelector(
  state => state,
  createMatchSelector({ path: menuRoutes.buildingView }),
);

export const selectIsBuildingComponentsViewRoute = createSelector(
  state => state,
  createMatchSelector({ path: menuRoutes.buildingComponentsView }),
);

export const selectCurrentBuilding = createSelector(
  // TODO: Should not get buildings from board, it's temporary until we have 'downloadedBuildings' in shared
  selectGetClubMenus,
  selectIsBuildingNewRoute,
  selectIsBuildingViewRoute,
  selectIsBuildingComponentsViewRoute,
  (buildings, isNewRoute, isViewRoute, isComponentsViewRoute) => {
    if (!!buildings) {
      let id = -1;
      if (!!isViewRoute && !!isViewRoute.params.id) {
        id = isViewRoute.params.id;
      } else if (!!isComponentsViewRoute && !!isComponentsViewRoute.params.id) {
        id = isComponentsViewRoute.params.id;
      } else if (!!isNewRoute) {
        id = 0;
      }

      const currentBuilding = find(b => b.buildingId === parseInt(id), buildings);

      if (!!currentBuilding) {
        return currentBuilding;
      }
    }

    return null;
  },
);

export const selectGetCustomers = createSelector(selectBuilding, building => building.customers);

export const selectGetQCCapexObjectTypes = createSelector(
  selectBuilding,
  building => building.qccapexobjecttypes,
);

export const selectGetSection = createSelector(selectBuilding, building => building.inspection);

export const selectIsBusy = createSelector(selectBuilding, building => building.ui.busy);
