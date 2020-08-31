import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DelayedRedirect from '../shared/DelayRedirect';
import logo from '../../images/2Order_splash_logo.png';

const useStyles = makeStyles(theme => ({
  logoContainer: {
    height: '100vh',
    width: '100vw',
    display: 'grid',
    background: theme.palette.primary.main,
    padding: '0',
  },
  logo: {
    placeSelf: 'center',
    width: '75vw',
  },
}));

export const Splash = props => {
  const classes = useStyles(props);

  return (
    <div className={classes.logoContainer}>
      <img className={classes.logo} src={logo} alt="logo" />
      <DelayedRedirect to={'/login'} delay={1000} />
    </div>
  );
};
