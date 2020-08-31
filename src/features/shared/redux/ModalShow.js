import produce from 'immer';
import { SHARED_MODAL_SHOW } from './constants';

export function sharedModalShow({ title, message, icon, time }) {
  return {
    type: SHARED_MODAL_SHOW,
    payload: { title, message, icon, time },
  };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SHARED_MODAL_SHOW:
        const { icon, title, message, time } = action.payload;
        draft.ui.modalDialog = {
          icon: icon,
          title: title,
          message: message,
          time: time,
          show: true,
        };
        break;
      default:
        return state;
    }
  });
