import { reduce } from 'ramda';
import { reducer as qrCodeMenuReducer } from './qrCodeMenu';
import { initialState } from './initialState';

const reducers = [qrCodeMenuReducer];

export const qrCodeMenuReducers = (state = initialState, action) =>
  reduce((updatingState, reducer) => reducer(updatingState, action), state, reducers);
