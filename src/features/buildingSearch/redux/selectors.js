import { any, filter } from 'ramda';
import { createSelector } from 'reselect';
import { selectGetBoard } from '@features/board/redux/selectors';

const selectBuildingSearch = state => state.buildingSearch;

export const selectBuildings = createSelector(
  selectBuildingSearch,
  selectGetBoard,
  (buildingSearch, board) => {
    if (!!buildingSearch.buildings) {
      return filter(
        b =>
          !any(bb => bb.buildingId === b.id, !!board && !!board.clubMenus ? board.clubMenus : []),
        buildingSearch.buildings,
      );
    }
  },
);

export const selectIsSearchBusy = createSelector(
  selectBuildingSearch,
  state => state.ui.busy.search,
);

export const selectIsBookmarkBusy = createSelector(
  selectBuildingSearch,
  state => state.ui.busy.bookmark,
);
