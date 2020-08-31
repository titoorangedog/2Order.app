import { authLogin } from '@features/auth/redux/authLogin';
import produce from 'immer';
import { put, takeLatest } from 'redux-saga/effects';
import { AUTH_SELECT_CUSTOMER } from './constants';

export function authSelectCustomer(customer) {
  return { type: AUTH_SELECT_CUSTOMER, payload: customer };
}

function* doLoginAfterCustomerSelected() {
  yield put(authLogin());
}

export function* selectCustomerSagas() {
  yield takeLatest(AUTH_SELECT_CUSTOMER, doLoginAfterCustomerSelected);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_SELECT_CUSTOMER:
        draft.selectedCustomerId = action.payload;
        break;
      default:
        return state;
    }
  });
