import { createMatchSelector } from 'connected-react-router';
import { createSelector } from 'reselect';
import { profileRoutes } from '../routes';

const selectProfile = state => state.profile;

export const selectIsProfileRoute = createSelector(
  state => state,
  createMatchSelector({ path: profileRoutes.profile }),
);

export const selectUserProfile = createSelector(selectProfile, profile => profile.userProfile);

export const selectUi = createSelector(selectProfile, state => state.ui);

export const selectBusy = createSelector(selectUi, ui => ui.busy);
export const selectIsGetUserProfileBusy = createSelector(selectBusy, busy => busy.getUserProfile);
