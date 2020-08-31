import { reduce } from 'ramda';
import { initialState } from './initialState';
import { reducer as buildingSearch } from './buildingSearch';
import { reducer as bookmark } from './buildingSearchBookmark';
import { reducer as buildingSearchReset } from './buildingSearchReset';

const reducers = [buildingSearch, bookmark, buildingSearchReset];

export const buildingSearchReducers = (state = initialState, action) =>
  reduce((updatingState, reducer) => reducer(updatingState, action), state, reducers);
