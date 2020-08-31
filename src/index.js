import 'typeface-roboto';
import './icons';
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { actions as toastrActions } from 'react-redux-toastr';
import { store } from './common/configStore';
import { i18n } from './common/i18n-loader';
import { Root } from './Root';

ReactDOM.render(<Root />, document.getElementById('root'));

if (process.env.NODE_ENV === 'production') {
  serviceWorker.register({
    onUpdate: () =>
      store.dispatch(
        toastrActions.add({
          options: { timeOut: 0, onToastrClick: () => window.location.reload() },
          type: 'warning',
          attention: true,
          message: i18n._('New Version'),
        }),
      ),
  });
}
