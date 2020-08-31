import produce from 'immer';
import { SHARED_MODAL_ACTIONS_SHOW } from './constants';

export function sharedModalActionsShow({ icon, title, message, actions }) {
  return {
    type: SHARED_MODAL_ACTIONS_SHOW,
    payload: { icon, title, message, actions },
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHARED_MODAL_ACTIONS_SHOW:
        draft.ui.modalActions = { ...action.payload, show: true };
        break;
      default:
        return state;
    }
  });
