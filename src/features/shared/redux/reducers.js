import { reduce } from 'ramda';
import { reducer as isOffline } from './isOffline';
import { reducer as isOnline } from './isOnline';

import { reducer as setLanguage } from './setLanguage';
import { reducer as setTopbar } from './setTopbar';

import { reducer as changeTheme } from './changeTheme';

import { reducer as modalShow } from './ModalShow';
import { reducer as modalHide } from './ModalHide';

import { reducer as modalActionsShow } from './modalActionsShow';
import { reducer as modalActionsHide } from './modalActionsHide';

import initialState from './initialState';

const reducers = [
  setLanguage,
  isOnline,
  isOffline,
  modalShow,
  modalHide,
  modalActionsShow,
  modalActionsHide,
  setTopbar,
  changeTheme,
];

export const sharedReducers = (state = initialState, action) =>
  reduce((updatingState, reducer) => reducer(updatingState, action), state, reducers);
