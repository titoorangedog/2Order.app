import { SHARED_MODAL_SHOW } from './constants';
import { i18n } from '@common/i18n-loader';

export function sharedModalNotImplementedShow() {
  return {
    type: SHARED_MODAL_SHOW,
    payload: {
      icon: 'IconCross',
      title: i18n._('Not Implemented'),
      message: i18n._('Not Implemented'),
      time: 1000,
    },
  };
}
