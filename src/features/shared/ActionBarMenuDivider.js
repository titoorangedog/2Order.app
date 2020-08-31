import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  divider: {
    background: theme.palette.actionBar.menu.divider,
    opacity: '0.65',
    height: '1px',
    width: '100%',
    margin: theme.spacing(1, 0),
  },
}));

export const ActionBarMenuDivider = props => {
  const classes = useStyles(props);

  return <div className={classes.divider}></div>;
};
