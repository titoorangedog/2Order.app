// import produce from 'immer';
// import { call, put, takeLatest, select } from 'redux-saga/effects';
// import { get } from '@services/api';
// import { LOCATION_CHANGE } from 'connected-react-router';
// import { BUILDING_GET_CUSTOMERS_SUCCESS, BUILDING_GET_CUSTOMERS_ERROR } from './constants';
// import { selectMatchUrlPath } from '../../shared/redux/selectors';

// function* doGetProperties() {
//   const isRouteBuildingProperties = yield select(selectMatchUrlPath('/building/properties'));
//   /*
//   if (isRouteBuildingProperties) {
//     try {
//       const customers = yield call(get, 'buildings/customers');
//       yield put({
//         type: BUILDING_GET_CUSTOMERS_SUCCESS,
//         payload: customers,
//       });
//     } catch (error) {
//       yield put({
//         type: BUILDING_GET_CUSTOMERS_ERROR,
//         payload: error.message,
//       });
//     }
//   }
//   */
// }

// export function* switchGetProperties() {
//   yield takeLatest(LOCATION_CHANGE, doGetProperties);
// }

// export const reducer = (state, action) =>
//   produce(state, draft => {
//     switch (action.type) {
//       case BUILDING_GET_CUSTOMERS_SUCCESS:
//         draft.customers = action.payload;
//         break;
//       case BUILDING_GET_CUSTOMERS_ERROR:
//         draft.customers = null;
//         break;
//       default:
//         return state;
//     }
//   });
