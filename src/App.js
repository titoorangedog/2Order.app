import watchNetworkStatus from '@common/watchNetworkStatus';
import { Login } from '@features/auth/Login';
import { QrCodeMenu } from '@features/qrCodeMenu/QrCodeMenu';
import { authRoutes } from '@features/auth/routes';
import { qrCodeMenuRoutes } from '@features/qrCodeMenu/routes';
import { ModalDialog } from '@features/shared/ModalDialog';
import { NotFound } from '@features/shared/NotFound';
import * as sharedActions from '@features/shared/redux/actions';
import { splashRoutes } from '@features/splash/routes';
import { Splash } from '@features/splash/Splash';
import { privateRoutes } from '@src/private.routes';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Master } from './Master';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    background: theme.palette.background,
  },
  topbar: {
    gridArea: 'topbar',
  },
  content: {
    gridArea: 'content',
    overflow: 'auto',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
}));

function AppComponent(props) {
  const {
    actions: { sharedIsOnline, sharedIsOffline },
  } = props;

  const classes = useStyles(props);

  useEffect(() => watchNetworkStatus(sharedIsOnline, sharedIsOffline), [
    sharedIsOnline,
    sharedIsOffline,
  ]);

  return (
    <div className={classes.container}>
      <Switch>
        <Redirect exact from="/" to={splashRoutes.splash} />
        <Route path={splashRoutes.splash} component={Splash} />
        <Route path={authRoutes.login} component={Login} />
        <Route path={qrCodeMenuRoutes.qrCodeMenu} component={QrCodeMenu} />
        <Route path={privateRoutes.master} component={Master} />
        <Route path="*" component={NotFound} />
      </Switch>

      <ModalDialog />
    </div>
  );
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...sharedActions }, dispatch),
  };
}

export const App = connect(null, mapDispatchToProps)(AppComponent);
