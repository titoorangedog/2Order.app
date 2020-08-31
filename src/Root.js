import { history, persistor, store } from '@common/configStore';
import { I18nLoader } from '@common/i18n-loader';
import { ErrorBoundary } from '@features/shared/ErrorBoundary';
import { ThemeProvider } from '@features/shared/ThemeProvider';
import { App } from '@src/App';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { PersistGate } from 'redux-persist/integration/react';

export function Root() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nLoader>
            <ThemeProvider>
              <ConnectedRouter history={history}>
                <App></App>
              </ConnectedRouter>

              <ReduxToastr
                timeOut={4000}
                newestOnTop={true}
                position="top-right"
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick
              />
            </ThemeProvider>
          </I18nLoader>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
