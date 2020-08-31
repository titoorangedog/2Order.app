import produce from 'immer';
import { SHARED_MODAL_HIDE } from './constants';

export function sharedModalHide() {
  return {
    type: SHARED_MODAL_HIDE,
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHARED_MODAL_HIDE:
        draft.ui.modalDialog = {
          icon: null,
          show: false,
          title: '',
          message: '',
          time: null,
        };
        break;
      default:
        return state;
    }
  });
