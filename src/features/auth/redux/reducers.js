import { reduce } from 'ramda';
import { reducer as abortReducer } from './authReset';
import { reducer as checkIsAuthReducer } from './authCheckIsAuth';
import { reducer as getCustomersReducer } from './authGetCustomers';
import { reducer as loginReducer } from './authLogin';
import { reducer as logoutReducer } from './authLogout';
import { reducer as selectCustomerReducer } from './authSelectCustomer';
import { reducer as setStepReducer } from './authSetStep';
import { initialState } from './initialState';

const reducers = [
  getCustomersReducer,
  setStepReducer,
  abortReducer,
  loginReducer,
  checkIsAuthReducer,
  logoutReducer,
  selectCustomerReducer,
];

export const authReducers = (state = initialState, action) =>
  reduce((updatingState, reducer) => reducer(updatingState, action), state, reducers);
