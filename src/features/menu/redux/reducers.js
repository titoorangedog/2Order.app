import { reduce } from 'ramda';
import { reducer as buildingChangeCurrent } from './buildingChangeCurrent';
import { reducer as buildingSave } from './buildingSave';
import { reducer as menuCreateSection } from './menuCreateSection';
import { reducer as menuGetSections } from './menuGetSections';
import { initialState } from './initialState';

const reducers = [buildingSave, buildingChangeCurrent, menuCreateSection, menuGetSections];

export const buildingReducers = (state = initialState, action) =>
  reduce((updatingState, reducer) => reducer(updatingState, action), state, reducers);
