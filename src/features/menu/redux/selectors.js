import { find } from 'ramda';
import { createMatchSelector } from 'connected-react-router';
import { createSelector } from 'reselect';
import { menuRoutes } from '../routes';
import { selectGetClubMenus } from '@features/board/redux/selectors';

const selectMenu = state => state.menu;

export const selectIsMenuNewRoute = createSelector(
  state => state,
  createMatchSelector({ path: menuRoutes.menuNew }),
);

export const selectIsMenuViewRoute = createSelector(
  state => state,
  createMatchSelector({ path: menuRoutes.menuView }),
);

export const selectIsMenuDeleteRoute = createSelector(
  state => state,
  createMatchSelector({ path: menuRoutes.menuDelete }),
);

export const selectCurrentMenuInfo = createSelector(
  selectGetClubMenus,
  selectIsMenuNewRoute,
  selectIsMenuViewRoute,
  selectIsMenuDeleteRoute,
  (menus, isNewRoute, isViewRoute, isDeleteRoute) => {
    if (!!menus) {
      let id = -1;
      if (!!isViewRoute && !!isViewRoute.params.id) {
        id = isViewRoute.params.id;
      } else if (!!isDeleteRoute && !!isDeleteRoute.params.id) {
        id = isDeleteRoute.params.id;
      } else if (!!isNewRoute) {
        id = 0;
      }

      const currentMenu = find(b => b.id === parseInt(id), menus);

      if (!!currentMenu) {
        return currentMenu;
      }
    }

    return null;
  },
);

export const selectCurrentMenu = createSelector(selectMenu, state => {
  console.log('selectCurrentMenu state', state);
  if (!state || !state.menu) {
    return [];
  }
  return state.menu;
});

export const selectUi = createSelector(selectMenu, state => {
  if (!state || !state.ui) {
    return null;
  }
  return state.ui;
});

export const selectMenuIsBusy = createSelector(selectUi, ui => {
  if (!ui || !ui.busy) {
    return null;
  }
  return ui.busy;
});
