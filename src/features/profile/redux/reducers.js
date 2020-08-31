import { reduce } from 'ramda';
import { initialState } from './initialState';
import { reducer as profileGetUserProfile } from './profileGetUserProfile';

const reducers = [profileGetUserProfile];

export const profileReducers = (state = initialState, action) =>
  reduce((updatingState, reducer) => reducer(updatingState, action), state, reducers);
