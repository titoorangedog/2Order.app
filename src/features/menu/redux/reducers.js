import { reduce } from 'ramda';
import { reducer as menuChangeCurrent } from './menuChangeCurrent';
import { reducer as menuSave } from './menuSave';
import { reducer as menuDelete } from './menuDelete';
import { reducer as menuCreateSection } from './menuCreateSection';
import { reducer as menuGetMenu } from './menuGetMenu';
import { initialState } from './initialState';

const reducers = [menuSave, menuDelete, menuChangeCurrent, menuCreateSection, menuGetMenu];

export const menuReducers = (state = initialState, action) =>
  reduce((updatingState, reducer) => reducer(updatingState, action), state, reducers);
