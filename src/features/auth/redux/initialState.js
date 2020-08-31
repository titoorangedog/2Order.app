import { isDevelop } from '@common/isDevelop';

export const initialState = {
  username: isDevelop ? '+393662412504' : '',
  password: isDevelop ? 'banana93' : '',
  selectedCustomerId: null,
  customers: [],
  step: 0,
  isLoggedIn: false,
  ui: {
    busy: {
      login: false,
      getCustomers: false,
    },
  },
};
