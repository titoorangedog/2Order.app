import { authSelectCustomer } from '@features/auth/redux/authSelectCustomer';
import { post } from '@services/api';
import produce from 'immer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { authReset } from './authReset';
import { authSetStep } from './authSetStep';
import {
  AUTH_CHECK_CUSTOMERS,
  AUTH_GET_CUSTOMERS,
  AUTH_GET_CUSTOMERS_ERROR,
  AUTH_GET_CUSTOMERS_SUCCESS,
} from './constants';
import { selectPassword, selectUsername } from './selectors';

export function authCheckCustomers(username, password) {
  return { type: AUTH_CHECK_CUSTOMERS, payload: { username, password } };
}

export function authGetCustomers() {
  return { type: AUTH_GET_CUSTOMERS };
}

function* doCheckCustomers() {
  yield put(authGetCustomers());
}

function* doGetCustomers() {
  try {
    const username = yield select(selectUsername);
    const password = yield select(selectPassword);

    const customers = yield call(post, 'login', { username, password }, false);

    // customers = [
    //   ...customers,
    //   { id: 'test1', licenseId: 'test' },
    //   { id: 'test1', licenseId: 'test' },
    // ];

    yield put({
      type: AUTH_GET_CUSTOMERS_SUCCESS,
      payload: customers,
    });
  } catch (error) {
    yield put({
      type: AUTH_GET_CUSTOMERS_ERROR,
      payload: error.message,
    });
  }
}

function* doLoginOrRedirectInCase({ payload }) {
  if (payload.length === 1) {
    yield put(authSelectCustomer(payload[0].id));
  } else if (payload.length > 1) {
    yield put(authSetStep(1));
  } else {
    yield put(authReset());
  }
}

export function* getCustomersSagas() {
  yield takeLatest(AUTH_CHECK_CUSTOMERS, doCheckCustomers);
  yield takeLatest(AUTH_GET_CUSTOMERS, doGetCustomers);
  yield takeLatest(AUTH_GET_CUSTOMERS_SUCCESS, doLoginOrRedirectInCase);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_CHECK_CUSTOMERS:
        draft.username = action.payload.username;
        draft.password = action.payload.password;
        break;
      case AUTH_GET_CUSTOMERS:
        draft.ui.busy.getCustomers = true;
        break;
      case AUTH_GET_CUSTOMERS_SUCCESS:
        draft.customers = action.payload;
        draft.ui.busy.getCustomers = false;
        break;
      case AUTH_GET_CUSTOMERS_ERROR:
        draft.customers = null;
        draft.ui.busy.getCustomers = false;
        break;
      default:
        return state;
    }
  });
