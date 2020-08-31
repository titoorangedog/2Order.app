import produce from 'immer';
import { SHARED_MODAL_ACTIONS_HIDE } from './constants';

export function sharedModalActionsHide() {
  return {
    type: SHARED_MODAL_ACTIONS_HIDE,
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHARED_MODAL_ACTIONS_HIDE:
        draft.ui.modalActions = { icon: '', show: false, title: '', message: '', actions: [] };
        break;
      default:
        return state;
    }
  });
