import { boardRoutes } from '@features/board/routes';
import { authenticationLogin, setSession } from '@services/auth';
import { push } from 'connected-react-router';
import produce from 'immer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { authReset } from './authReset';
import { AUTH_LOGIN, AUTH_LOGIN_ERROR, AUTH_LOGIN_SUCCESS } from './constants';
import { selectPassword, selectUsername } from './selectors';
import { get, post, login } from '@services/api';
export function authLogin() {
  return {
    type: AUTH_LOGIN,
  };
}

function* doLogin() {
  const username = yield select(selectUsername);
  const password = yield select(selectPassword);

  try {
    const result = yield call(login, username, password);
    console.log('doLogin result', result);
    yield setSession(result);

    // yield call(authenticationLogin, username, password);

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
