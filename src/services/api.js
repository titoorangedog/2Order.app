import { store } from '@common/configStore';
import { i18n } from '@common/i18n-loader';
import { unauthorizedError } from '@common/messages';
import { authLogout } from '@features/auth/redux/authLogout';
import Axios from 'axios';
import HttpStatus from 'http-status-codes';
import { authGetToken, authIsAuthenticated } from './auth';
import { extractErrorMessage } from './extractErrorMessage';

const baseURL = '/api/v1';

async function call(httpCall, mustBeAuthenticated) {
  let headers = {};

  if (mustBeAuthenticated) {
    if (!(await authIsAuthenticated())) {
      // TODO: should redirect to login
      const error = new Error(i18n._(unauthorizedError));
      enhanceError(error, HttpStatus.UNAUTHORIZED);
      throw error;
    }

    const token = await authGetToken();
    headers = { Authorization: `Bearer ${token}`, accept: '*/*' };
  }

  try {
    const response = await httpCall(headers);
    return response.data;
  } catch (error) {
    const [status, message] = extractErrorMessage(error);

    if (status === HttpStatus.UNAUTHORIZED || status === HttpStatus.FORBIDDEN) {
      store.dispatch(authLogout());
    }

    const err = new Error(i18n._(message));
    enhanceError(err, status);
    throw err;
  }
}

export async function login(username, password) {
  const data = { username, password };
  console.log('login data', data);
  return await call(async headers => await Axios.post(`${baseURL}/login`, data));
}

export async function post(controller, data, mustBeAuthenticated = true) {
  return await call(
    async headers => await Axios.post(`${baseURL}/${controller}`, data, { headers }),
    mustBeAuthenticated,
  );
}

export async function put(controller, data, mustBeAuthenticated = true) {
  return await call(
    async headers => await Axios.put(`${baseURL}/${controller}`, data, { headers }),
    mustBeAuthenticated,
  );
}

export async function patch(controller, data, mustBeAuthenticated = true) {
  return await call(
    async headers => await Axios.patch(`${baseURL}/${controller}`, data, { headers }),
    mustBeAuthenticated,
  );
}

export async function get(controller, mustBeAuthenticated = true) {
  return await call(
    async headers => await Axios.get(`${baseURL}/${controller}`, { headers }),
    mustBeAuthenticated,
  );
}

export async function downloadFile(controller, mustBeAuthenticated = true) {
  return await call(
    async headers =>
      await Axios.get(`${baseURL}/${controller}`, { headers, responseType: 'arraybuffer' }),
    mustBeAuthenticated,
  );
}

export async function getById(controller, id, mustBeAuthenticated = true) {
  return await call(
    async headers => await Axios.get(`${baseURL}/${controller}/${id}`, { headers }),
    mustBeAuthenticated,
  );
}

export async function deleteById(controller, id, mustBeAuthenticated = true) {
  return await call(
    async headers => await Axios.delete(`${baseURL}/${controller}/${id}`, { headers }),
    mustBeAuthenticated,
  );
}

function enhanceError(error, status) {
  error.status = status;
  return error;
}
