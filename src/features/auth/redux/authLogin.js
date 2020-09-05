import { boardRoutes } from '@features/board/routes';
import { setSession } from '@services/auth';
import { push } from 'connected-react-router';
import produce from 'immer';
import { call, put, takeLatest } from 'redux-saga/effects';
import { authReset } from './authReset';
import { AUTH_LOGIN, AUTH_LOGIN_ERROR, AUTH_LOGIN_SUCCESS } from './constants';
import { login } from '@services/api';

export function authLogin(username, password) {
  return {
    type: AUTH_LOGIN,
    payload: { username, password },
  };
}

function* doLogin({ payload }) {
  try {
    const result = yield call(login, payload.username, payload.password);
    yield setSession(result);

    yield put({
      type: AUTH_LOGIN_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: AUTH_LOGIN_ERROR,
      payload: error.message,
    });
  }
}

function* doRedirect() {
  yield put(push(boardRoutes.board));
  yield put(authReset());
}

export function* loginSagas() {
  yield takeLatest(AUTH_LOGIN, doLogin);
  yield takeLatest(AUTH_LOGIN_SUCCESS, doRedirect);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_LOGIN:
        draft.ui.busy.login = true;
        draft.isLoggedIn = false;
        break;
      case AUTH_LOGIN_SUCCESS:
        draft.ui.busy.login = false;
        draft.isLoggedIn = true;
        break;
      case AUTH_LOGIN_ERROR:
        draft.ui.busy.login = false;
        draft.isLoggedIn = false;
        break;
      default:
        return state;
    }
  });
