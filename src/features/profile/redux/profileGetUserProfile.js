import { get } from '@services/api';
import { LOCATION_CHANGE } from 'connected-react-router';
import produce from 'immer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectMatchUrlPath } from '../../shared/redux/selectors';
import { profileRoutes } from '../routes';
import {
  PROFILE_GET_USER_PROFILE,
  PROFILE_GET_USER_PROFILE_ERROR,
  PROFILE_GET_USER_PROFILE_SUCCESS,
} from './constants';

export function profileGetUserProfile() {
  return {
    type: PROFILE_GET_USER_PROFILE,
  };
}

function* doGetUserProfile() {
  const isRouteProfile = yield select(selectMatchUrlPath(profileRoutes.profile));
  if (isRouteProfile) {
    yield put(profileGetUserProfile());
    try {
      const userProfile = yield call(get, 'users');
      yield put({
        type: PROFILE_GET_USER_PROFILE_SUCCESS,
        payload: userProfile,
      });
    } catch (error) {
      yield put({
        type: PROFILE_GET_USER_PROFILE_ERROR,
        payload: error.message,
      });
    }
  }
}

export function* getUserProfileSagas() {
  yield takeLatest(LOCATION_CHANGE, doGetUserProfile);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case PROFILE_GET_USER_PROFILE:
        draft.ui.busy.getUserProfile = true;
        draft.userProfile = action.payload;
        break;
      case PROFILE_GET_USER_PROFILE_SUCCESS:
        draft.ui.busy.getUserProfile = false;
        draft.userProfile = action.payload;
        break;
      case PROFILE_GET_USER_PROFILE_ERROR:
        draft.ui.busy.getUserProfile = false;
        draft.userProfile = {
          forname: 'Error...',
          lastname: 'Error...',
          memberRole: 'Error...',
          mail: 'Error...',
          mobile: 'Error...',
        };
        break;
      default:
        return state;
    }
  });
