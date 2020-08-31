import { i18n } from '@common/i18n-loader';

export const invalidLoginError = i18n._('Please verify your username and password');
export const badRequestError = i18n._('Bad Request');
export const notFoundError = i18n._('Not Found');
export const unauthorizedError = i18n._('Unauthorized');
export const genericError = i18n._('Error');
export const unavailableError = i18n._('Error');

// Server errors
// used for lingui PO extraction
export const serverErrors = {
  NoCustomersForUser: i18n._('There are no customers for your user'),
  InvalidLogin: i18n._('Please verify your username and password'),
  BadRequest: i18n._('Bad Request'),
};
