import { reduce } from 'ramda';
import { reducer as buildingChangeCurrent } from './buildingChangeCurrent';
import { reducer as buildingGetQCCapexObjectTypes } from './buildingGetQCCapexObjectTypes';
import { reducer as buildingSave } from './buildingSave';
import { reducer as buildingUpdateBuilding } from './buildingUpdateBuilding';
import { reducer as buildingCreateInspection } from './buildingCreateInspection';
import { reducer as buildingGetInspection } from './buildingGetInspection';
import { reducer as buildingGetComponents } from './buildingGetComponents';
import { initialState } from './initialState';

const reducers = [
  buildingSave,
  buildingChangeCurrent,
  buildingGetQCCapexObjectTypes,
  buildingUpdateBuilding,
  buildingCreateInspection,
  buildingGetInspection,
  buildingGetComponents,
];

export const buildingReducers = (state = initialState, action) =>
  reduce((updatingState, reducer) => reducer(updatingState, action), state, reducers);
