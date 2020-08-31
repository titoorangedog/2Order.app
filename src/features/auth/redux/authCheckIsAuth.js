import { authRoutes } from '@features/auth/routes';
import { authenticationLogout, authIsAuthenticated } from '@services/auth';
import { push } from 'connected-react-router';
import produce from 'immer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { AUTH_CHECK_AUTH, AUTH_IS_LOGGED_IN, AUTH_IS_LOGGED_OUT } from './constants';
import { selectIsInPrivateSection } from '@features/shared/redux/selectors';

export function authCheckIsAuth() {
  return {
    type: AUTH_CHECK_AUTH,
  };
}

function* doCheckIsAuth() {
  const isInPrivateSection = select(selectIsInPrivateSection);
  if (!!isInPrivateSection) {
    const isAuthenticated = yield call(authIsAuthenticated);

    if (isAuthenticated) {
      yield put({
        type: AUTH_IS_LOGGED_IN,
      });
    } else {
      yield put({
        type: AUTH_IS_LOGGED_OUT,
      });
    }
  }
}

function* doIsLoggedOut() {
  try {
    yield call(authenticationLogout, false);

    yield put(push(authRoutes.login));
  } catch (Error) {}
}

export function* checkIsAuthSagas() {
  yield takeLatest(AUTH_CHECK_AUTH, doCheckIsAuth);
  yield takeLatest(AUTH_IS_LOGGED_OUT, doIsLoggedOut);
  yield put(authCheckIsAuth());
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_IS_LOGGED_IN:
        draft.isLoggedIn = true;
        break;
      case AUTH_CHECK_AUTH:
        draft.isLoggedIn = false;
        break;
      case AUTH_IS_LOGGED_OUT:
        draft.isLoggedIn = false;
        break;
      default:
        return state;
    }
  });
