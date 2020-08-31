import { reduce } from 'ramda';
import { reducer as getBoard } from './boardGetClubMenus';
import { reducer as removeBuilding } from './boardRemoveMenu';
import { initialState } from './initialState';

const reducers = [getBoard, removeBuilding];

export const boardReducers = (state = initialState, action) =>
  reduce((updatingState, reducer) => reducer(updatingState, action), state, reducers);
