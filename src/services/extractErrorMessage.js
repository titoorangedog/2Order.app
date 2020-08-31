import HttpStatus from 'http-status-codes';
import {
  badRequestError,
  genericError,
  notFoundError,
  unauthorizedError,
  unavailableError,
} from '@common/messages';

export function extractErrorMessage(error) {
  let message;
  let status;

  if (!!error.response) {
    const { response } = error;

    switch (response.status) {
      case HttpStatus.BAD_REQUEST:
        console.log(response.data);
        if (!!response.data) {
          if (!!response.data.detail) {
            message = response.data.detail;
          } else if (!!response.data.detail) {
            message = response.data.title;
          } else {
            message = badRequestError;
          }
          console.error(response.data.detail);
        } else {
          message = badRequestError;
        }
        break;
      case HttpStatus.UNAUTHORIZED:
      case HttpStatus.FORBIDDEN:
        message = unauthorizedError;
        break;
      case HttpStatus.NOT_FOUND:
        message = notFoundError;
        break;
      default:
      case HttpStatus.INTERNAL_SERVER_ERROR:
        message = genericError;
    }
    status = response.status;
  } else {
    message = unavailableError;
    status = HttpStatus.SERVICE_UNAVAILABLE;
  }

  return [status, message];
}
