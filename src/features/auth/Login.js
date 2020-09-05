import { i18n } from '@common/i18n-loader';
import * as sharedActions from '@features/shared/redux/actions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { routerActions } from 'connected-react-router';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { bindActionCreators } from 'redux';
import logo from '../../images/2Order_logo.png';
import { LoginForm } from './LoginForm';
// import { LoginSelectCustomer } from './LoginSelectCustomer';
import * as actions from './redux/actions';
import {
  selectCustomers,
  selectIsGetCustomersBusy,
  selectIsLoginBusy,
  selectPassword,
  selectStep,
  selectUsername,
} from './redux/selectors';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: `1fr 3fr`,
    gridTemplateAreas: '"logo" "swipe"',
    gridRowGap: theme.spacing(2),
    placeItems: 'center',
  },
  logoContainer: {
    gridArea: 'logo',
    alignSelf: 'center',
    justifySelf: 'center',
  },
  swipeContainer: {
    gridArea: 'swipe',
    width: '100%',
    height: '100%',
  },
  slideContainer: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(0, 4),
  },
}));
const slideContainer = {
  width: '100%',
  height: '100%',
  padding: '0px 32px',
};
const slidesContainer = {
  width: '100%',
  height: '100%',
};

export const LoginComponent = props => {
  const classes = useStyles(props);
  const {
    isLoginBusy,
    isGetCustomersBusy,
    username,
    password,
    // customers,
    step,
    actions: {
      // authSelectCustomer,
      // authCheckCustomers,
      // authReset,
      sharedModalShow,
      authCheckIsAuth,
      authSetStep,
      authLogin,
    },
  } = props;

  useEffect(() => {
    authCheckIsAuth();
  }, [authCheckIsAuth]);

  const handleSignUp = useCallback(
    () =>
      sharedModalShow({
        icon: 'close',
        title: i18n._('Not Implemented'),
        message: i18n._('Not Implemented'),
        time: 1000,
      }),
    [sharedModalShow],
  );

  const handleLogin = useCallback(
    (username, password) => {
      console.log('handleLogin username', username);
      console.log('handleLogin password', password);

      authLogin(username, password);
    },
    [authLogin],
  );

  const handleStepChange = useCallback(
    (index, indexLatest, meta) => {
      authSetStep(index);
    },
    [authSetStep],
  );

  return (
    <div className={classes.container}>
      <div className={classes.logoContainer}>
        <img className={classes.logo} src={logo} alt="logo" />
      </div>

      <SwipeableViews
        index={step}
        onChangeIndex={handleStepChange}
        className={classes.swipeContainer}
        containerStyle={slidesContainer}
        slideStyle={slideContainer}
        disabled={step === 0}
      >
        <LoginForm
          isBusy={isLoginBusy || isGetCustomersBusy}
          username={username}
          password={password}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
        ></LoginForm>
        {/* <LoginSelectCustomer
          isBusy={isLoginBusy}
          customers={customers}
          onSelectCustomer={handleSelectCustomer}
          onAbort={authReset}
        ></LoginSelectCustomer> */}
      </SwipeableViews>
    </div>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    username: selectUsername(state),
    password: selectPassword(state),
    customers: selectCustomers(state),
    step: selectStep(state),
    isLoginBusy: selectIsLoginBusy(state),
    isGetCustomersBusy: selectIsGetCustomersBusy(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
