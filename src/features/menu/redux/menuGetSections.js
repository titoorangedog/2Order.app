import produce from 'immer';
import { call, select, put, takeLatest } from 'redux-saga/effects';
import { selectIsBuildingViewRoute, selectCurrentBuilding } from './selectors';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  MENU_GET_SECTIONS,
  MENU_GET_SECTIONS_SUCCESS,
  MENU_GET_SECTIONS_ERROR,
  MENU_CREATE_SECTION_SUCCESS,
} from './constants';
import { get } from '@services/api';

export function buildingGetInspection() {
  return {
    type: MENU_GET_SECTIONS,
  };
}

function* doMenuGetSectionsOnOtherActions() {
  const isBuildingViewRoute = yield select(selectIsBuildingViewRoute);
  if (!!isBuildingViewRoute) {
    yield put(buildingGetInspection());
  }
}

function* doMenuGetSections() {
  const building = yield select(selectCurrentBuilding);
  if (!!building) {
    try {
      const sections = yield call(get, `/clubs/1/menu/${building.id}`);
      if (!!sections) {
        yield put({
          type: MENU_GET_SECTIONS_SUCCESS,
          payload: sections,
        });
      } else {
        yield put({
          type: MENU_GET_SECTIONS_SUCCESS,
          payload: null,
        });
      }
    } catch (error) {
      yield put({
        type: MENU_GET_SECTIONS_ERROR,
        payload: error.message,
      });
    }
  } else {
    yield put({
      type: MENU_GET_SECTIONS_ERROR,
      payload: "Error: Current building doesn't exists.",
    });
  }
}

export function* menuGetSectionsSagas() {
  yield takeLatest(LOCATION_CHANGE, doMenuGetSectionsOnOtherActions);
  yield takeLatest(MENU_GET_SECTIONS, doMenuGetSections);
  yield takeLatest(MENU_CREATE_SECTION_SUCCESS, doMenuGetSectionsOnOtherActions);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MENU_GET_SECTIONS:
        draft.ui.busy = true;
        break;
      case MENU_GET_SECTIONS_SUCCESS:
        draft.ui.busy = false;
        draft.sections = action.payload;
        break;
      case MENU_GET_SECTIONS_ERROR:
        draft.ui.busy = false;
        break;
      default:
        return state;
    }
  });
