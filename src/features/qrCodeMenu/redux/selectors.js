import { createSelector } from 'reselect';
import { createMatchSelector } from 'connected-react-router';
import { qrCodeMenuRoutes } from '../routes';

const selectQrCodeMenu = state => state.qrCodeMenu;

export const selectIsQrCodeMenuRoute = createSelector(
  state => state,
  createMatchSelector({ path: qrCodeMenuRoutes.qrCodeMenu }),
);

export const selectCurrentQrCodeUrlParams = createSelector(
  selectIsQrCodeMenuRoute,
  isQrCodeMenuRoute => {
    if (!!isQrCodeMenuRoute) {
      return isQrCodeMenuRoute.params;
    }

    return null;
  },
);

export const selectMenu = createSelector(selectQrCodeMenu, state => state.qrCodeMenu);
export const selectUi = createSelector(selectQrCodeMenu, state => state.ui);
export const selectBusy = createSelector(selectUi, ui => ui.busy);
