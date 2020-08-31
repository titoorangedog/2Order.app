// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.

export const initialState = {
  buildings: null,
  ui: {
    busy: {
      search: false,
      bookmark: {},
    },
    modal: { retain: false, delete: false },
  },
};
