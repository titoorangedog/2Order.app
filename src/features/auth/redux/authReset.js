import produce from 'immer';
import { AUTH_RESET } from './constants';

export function authReset() {
  return { type: AUTH_RESET };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_RESET:
        draft.step = 0;
        draft.customers = [];
        draft.selectedCustomerId = null;
        break;
      default:
        return state;
    }
  });
