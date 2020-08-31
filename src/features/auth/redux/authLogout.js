import { authRoutes } from '@features/auth/routes';
import { authenticationLogout } from '@services/auth';
import { push } from 'connected-react-router';
import produce from 'immer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { authReset } from './authReset';
import { AUTH_LOGOUT, AUTH_LOGOUT_ERROR, AUTH_LOGOUT_SUCCESS } from './constants';

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}

function* doLogout() {
  try {
    yield call(authenticationLogout);

    yield put({
      type: AUTH_LOGOUT_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: AUTH_LOGOUT_ERROR,
      payload: error.message,
    });
  }

  yield put(authReset());
  yield put(push(authRoutes.login));
}

export function* logoutSagas() {
  yield takeLatest(AUTH_LOGOUT, doLogout);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_LOGOUT_SUCCESS:
      case AUTH_LOGOUT_ERROR:
        draft.isLoggedIn = false;
        break;
      default:
        return state;
    }
  });
