import { authRoutes } from '@features/auth/routes';
import { createMatchSelector } from 'connected-react-router';
import { createSelector } from 'reselect';

const selectShared = state => state.shared;

export const selectMatchUrlPath = path => state => {
  const match = createMatchSelector({ path })(state);
  return !!match ? match.isExact : false;
};
export const selectIsInPrivateSection = createSelector(
  state => state,
  state => !selectMatchUrlPath(authRoutes.login)(state),
);

export const selectTopBarIsVisible = createSelector(
  selectIsInPrivateSection,
  isPrivate => isPrivate,
);

export const selectTheme = createSelector(selectShared, state => state.theme);

export const selectLanguage = createSelector(selectShared, state => state.language);

export const selectLanguages = createSelector(selectShared, state => state.languages);

export const selectVersion = createSelector(selectShared, state => state.version);

export const selectIsOnline = createSelector(selectShared, state => state.isOnline);

export const selectUserInfo = createSelector(selectShared, state => state.userInfo);

export const selectUsername = createSelector(selectShared, state => state.username);

export const selectIsDevUser = createSelector(
  selectUsername,
  username => !!username && username.toLowerCase().endsWith('_dev'),
);

export const selectModalDialog = createSelector(selectShared, state => state.ui.modalDialog);

export const selectModalActions = createSelector(selectShared, state => state.ui.modalActions);

export const selectTopbar = createSelector(selectShared, state => state.topbar);
