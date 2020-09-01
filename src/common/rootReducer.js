import { connectRouter } from 'connected-react-router';
import localforage from 'localforage';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { sharedReducers } from '../features/shared/redux/reducers';
import { authReducers } from '../features/auth/redux/reducers';
import { boardReducers } from '../features/board/redux/reducers';
import { buildingReducers } from '../features/menu/redux/reducers';
import { profileReducers } from '../features/profile/redux/reducers';

const basePersistConfig = {
  storage: localforage,
};

const sharedPersistConfig = {
  ...basePersistConfig,
  key: 'shared',
  whitelist: ['language', 'theme'],
};

const boardPersistConfig = {
  ...basePersistConfig,
  key: 'board',
  whitelist: ['clubMenus'],
};

const reducerMap = {
  shared: persistReducer(sharedPersistConfig, sharedReducers),
  auth: authReducers,
  board: persistReducer(boardPersistConfig, boardReducers),
  building: buildingReducers,
  profile: profileReducers,
};

export const rootReducer = history =>
  combineReducers({
    toastr: toastrReducer,
    router: connectRouter(history),
    ...reducerMap,
  });
