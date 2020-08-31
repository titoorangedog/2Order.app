import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import { rootSagas } from './rootSaga';

const logger = createLogger({
  collapsed: true,
});

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history), logger];

export const store = createStore(
  rootReducer(history),
  composeWithDevTools(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);
