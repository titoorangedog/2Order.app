import { post } from '@src/services/api';
import produce from 'immer';
import { call, select, put, takeLatest } from 'redux-saga/effects';
import {
  MENU_CREATE_SECTION,
  MENU_CREATE_SECTION_ERROR,
  MENU_CREATE_SECTION_SUCCESS,
} from './constants';
import { selectCurrentBuilding } from './selectors';

export function menuCreateSection() {
  return {
    type: MENU_CREATE_SECTION,
  };
}

function* doMenuCreateSection() {
  try {
    const building = yield select(selectCurrentBuilding);
    if (!!building) {
      yield call(post, 'inspections/insertinspection', {
        buildingId: building.buildingId,
      });
      yield put({
        type: MENU_CREATE_SECTION_SUCCESS,
      });
    } else {
      yield put({
        type: MENU_CREATE_SECTION_ERROR,
        payload: "Error: Current building doesn't exists.",
      });
    }
  } catch (error) {
    yield put({
      type: MENU_CREATE_SECTION_ERROR,
      payload: error.message,
    });
  }
}

export function* menuCreateSectionSagas() {
  yield takeLatest(MENU_CREATE_SECTION, doMenuCreateSection);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MENU_CREATE_SECTION:
        draft.ui.busy = true;
        break;
      case MENU_CREATE_SECTION_SUCCESS:
        draft.ui.busy = false;
        break;
      case MENU_CREATE_SECTION_ERROR:
        draft.ui.busy = false;
        break;
      default:
        return state;
    }
  });
