import produce from 'immer';
import { AUTH_SET_STEP } from './constants';

export function authSetStep(step) {
  return { type: AUTH_SET_STEP, payload: step };
}

export const reducer = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_SET_STEP:
        draft.step = action.payload;
        break;
      default:
        return state;
    }
  });
