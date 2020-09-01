import { all } from '@redux-saga/core/effects';
import { map, values } from 'ramda';
import * as sharedSagas from '../features/shared/redux/sagas';
import * as authSagas from '../features/auth/redux/sagas';
import * as boardSagas from '../features/board/redux/sagas';
import * as menuSagas from '../features/menu/redux/sagas';
import * as profileSagas from '../features/profile/redux/sagas';

export const featureSagas = [authSagas, sharedSagas, boardSagas, menuSagas, profileSagas];

const sagas = map(module => values(module), featureSagas);

export function* rootSagas() {
  yield all(map(saga => saga(), sagas.flat(1)));
}
