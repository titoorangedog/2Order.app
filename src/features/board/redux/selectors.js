import { sortBy } from 'ramda';
import { createSelector } from 'reselect';

const selectBoard = state => state.board;

export const selectGetBoard = createSelector(selectBoard, board => board);

export const selectGetClubMenus = createSelector(selectGetBoard, board => {
  if (!board || !board.clubMenus || !board.clubMenus || !board.clubMenus.menu) {
    return [];
  }
  //   const sortedClubMenus = sortByCities(filter(b => !!b, board.clubMenus));
  return board.clubMenus.menu;
});

export const selectGetSelectedId = createSelector(selectGetBoard, board => {
  if (!board || !board.selectedId) {
    return board.selectedId;
  }
  return 0;
});

export const selectUi = createSelector(selectBoard, state => state.ui);
export const selectBusy = createSelector(selectUi, ui => ui.busy);
export const selectIsGetBoardBusy = createSelector(selectBusy, busy => busy.getBoard);
export const selectIsRemovingMenuBusy = createSelector(
  selectBusy,
  busy => busy.selectIsRemovingMenuBusy,
);

export const sortByCities = sortBy(b => b.city);
