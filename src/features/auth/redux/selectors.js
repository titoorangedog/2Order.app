import { createSelector } from 'reselect';
import { find } from 'ramda';

const selectAuth = state => state.auth;

export const selectIsLoggedIn = createSelector(selectAuth, state => state.isLoggedIn);

export const selectStep = createSelector(selectAuth, state => state.step);

export const selectUsername = createSelector(selectAuth, state => state.username);

export const selectPassword = createSelector(selectAuth, state => state.password);

export const selectCustomers = createSelector(selectAuth, state => state.customers);

export const selectSelectedCustomerId = createSelector(selectAuth, auth => auth.selectedCustomerId);
export const selectSelectedCustomer = createSelector(
  selectCustomers,
  selectSelectedCustomerId,
  (customers, customerId) => {
    if (!!customers) {
      if (!!customerId) return find(c => c.id === customerId, customers);
    }
    return null;
  },
);

export const selectUi = createSelector(selectAuth, state => state.ui);

export const selectBusy = createSelector(selectUi, ui => ui.busy);

export const selectIsLoginBusy = createSelector(selectBusy, busy => busy.login);
export const selectIsGetCustomersBusy = createSelector(selectBusy, busy => busy.getCustomers);
