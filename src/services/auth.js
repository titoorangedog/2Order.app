import { i18n } from '@common/i18n-loader';
import Axios from 'axios';
import localforage from 'localforage';
import { extractErrorMessage } from './extractErrorMessage';
import JwtDecode from 'jwt-decode';

export async function authenticationLogin(username, password) {
  try {
    const response = await Axios.post('/api/v1/login', {
      username,
      password,
    });
    console.log('response', response);

    await setSession(response.data);
  } catch (error) {
    await clearSession();
    const [, message] = extractErrorMessage(error);
    throw Error(i18n._(message));
  }
}

export async function authenticationLogout(force = true) {
  try {
    if (force) {
      const token = await authGetToken();
      const headers = { Authorization: `Bearer ${token}` };

      await Axios.create({ headers }).post('logout');
    }
    await clearSession();
  } catch (error) {
    const [, message] = extractErrorMessage(error);
    throw Error(i18n._(message));
  }
}

export async function authIsAuthenticated() {
  const expiresAt = await localforage.getItem('auth@expires_at');

  if (!expiresAt) return false;

  const newDate = new Date();
  const expDate = new Date(expiresAt * 1000);
  const isValid = expDate > newDate;

  return isValid;
}

export async function authGetToken() {
  return await localforage.getItem('auth@token');
}

export async function setSession(response) {
  const decoded = JwtDecode(response.token);
  console.log('response', response);
  await localforage.setItem('auth@token', response.token);
  await localforage.setItem('auth@expires_at', decoded.exp);
}

export async function clearSession() {
  await localforage.removeItem('auth@token');
  await localforage.removeItem('auth@expires_at');
}
