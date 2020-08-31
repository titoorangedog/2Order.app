import produce from 'immer';
import { select, put, takeLatest, delay } from 'redux-saga/effects';
import { selectIsBuildingComponentsViewRoute } from './selectors';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  BUILDING_GET_COMPONENTS,
  BUILDING_GET_COMPONENTS_SUCCESS,
  BUILDING_GET_COMPONENTS_ERROR,
} from './constants';

export function buildingGetComponents() {
  return { type: BUILDING_GET_COMPONENTS };
}

function* doBuildingGetComponentsOnOtherActions() {
  const isBuildingComponentsViewRoute = yield select(selectIsBuildingComponentsViewRoute);
  if (!!isBuildingComponentsViewRoute) {
    yield put(buildingGetComponents());
  }
}

function* doBuildingGetComponents() {
  yield delay(500);
  yield put({
    type: BUILDING_GET_COMPONENTS_SUCCESS,
    payload: [
      {
        id: 1,
        name: '',
        items: [
          {
            id: 1,
            name: 'Rohbau',
          },
          {
            id: 2,
            name: 'Rohbau',
          },
          {
            id: 3,
            name: 'Rohbau',
          },
          {
            id: 4,
            name: 'Rohbau',
          },
          {
            id: 5,
            name: 'Rohbau',
          },
          {
            id: 6,
            name: 'Rohbau',
          },
          {
            id: 7,
            name: 'Rohbau',
          },
        ],
      },
      {
        id: 2,
        name: '',
        items: [
          {
            id: 8,
            name: 'Rohbau2',
          },
          {
            id: 9,
            name: 'Rohbau2',
          },
          {
            id: 10,
            name: 'Rohbau2',
          },
          {
            id: 11,
            name: 'Rohbau2',
          },
          {
            id: 12,
            name: 'Rohbau2',
          },
        ],
      },
      {
        id: 3,
        name: '',
        items: [
          {
            id: 13,
            name: 'Rohbau3',
          },
          {
            id: 14,
            name: 'Rohbau3',
          },
          {
            id: 15,
            name: 'Rohbau3',
          },
          {
            id: 16,
            name: 'Rohbau3',
          },
        ],
      },
    ],
  });
  //   try {
  //     yield call(post, 'buildings', payload.changes);
  //     yield put({
  //       type: BUILDING_GET_COMPONENTS_SUCCESS,
  //     });
  //   } catch (error) {
  //     yield put({
  //       type: BUILDING_GET_COMPONENTS_ERROR,
  //       payload: error.message,
  //     });
  //   }
}

export function* buildingGetComponentsSagas() {
  yield takeLatest(BUILDING_GET_COMPONENTS, doBuildingGetComponents);
  yield takeLatest(LOCATION_CHANGE, doBuildingGetComponentsOnOtherActions);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BUILDING_GET_COMPONENTS:
        draft.ui.busy = true;
        break;
      case BUILDING_GET_COMPONENTS_SUCCESS:
        draft.ui.busy = false;
        draft.components = action.payload;
        break;
      case BUILDING_GET_COMPONENTS_ERROR:
        draft.ui.busy = false;
        break;
      default:
        return state;
    }
  });
