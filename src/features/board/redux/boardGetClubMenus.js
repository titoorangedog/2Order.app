import { LOCATION_CHANGE } from 'connected-react-router';
import produce from 'immer';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectMatchUrlPath } from '@features/shared/redux/selectors';
import { get } from '@services/api';
import { boardRoutes } from '../routes';
import {
  BOARD_GET_CLUB_MENUS,
  BOARD_GET_CLUB_MENUS_ERROR,
  BOARD_GET_CLUB_MENUS_SUCCESS,
} from './constants';

export function boardGetClubMenus() {
  return { type: BOARD_GET_CLUB_MENUS };
}

function* doGetBoardClubMenusOnOtherActions() {
  const isRouteBoard = yield select(selectMatchUrlPath(boardRoutes.board));
  if (isRouteBoard) {
    yield put(boardGetClubMenus());
  }
}

function* doGetBoardClubMenus() {
  try {
    const board = yield call(get, '/clubs/1/menu', true);
    console.log(board, board);

    yield put({
      type: BOARD_GET_CLUB_MENUS_SUCCESS,
      payload: board,
    });
  } catch (error) {
    yield put({
      type: BOARD_GET_CLUB_MENUS_ERROR,
      payload: error.message,
    });
  }
}

export function* getBoardClubMenusSagas() {
  yield takeLatest(BOARD_GET_CLUB_MENUS, doGetBoardClubMenus);
  yield takeLatest(LOCATION_CHANGE, doGetBoardClubMenusOnOtherActions);
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case BOARD_GET_CLUB_MENUS:
        draft.ui.busy.getBoard = true;
        break;
      case BOARD_GET_CLUB_MENUS_SUCCESS:
        draft.ui.busy.getBoard = false;
        draft.clubMenus = action.payload;
        break;
      case BOARD_GET_CLUB_MENUS_ERROR:
        draft.ui.busy.getBoard = false;
        break;
      default:
        return state;
    }
  });
