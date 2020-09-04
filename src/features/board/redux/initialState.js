export const initialState = {
  clubMenus: null,
  selectedId: null,
  ui: {
    busy: {
      loading: false,
      getBoard: false,
      removingMenu: [],
    },
    modal: { retain: false, delete: false },
  },
};
