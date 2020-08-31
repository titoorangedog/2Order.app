import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  actionBarContainer: props => ({
    position: !!props.position ? props.position : 'fixed',
    right: '0',
    bottom: '0',
    padding: theme.spacing(3.5, 3),
    display: 'grid',
    gridAutoFlow: 'row',
    gridAutoColumns: 'min-content',
    gridAutoRows: 'min-content',
    gridRowGap: theme.spacing(1.5),
    zIndex: '999',
  }),
}));

export const ActionBar = props => {
  const classes = useStyles(props);

  return <div className={classes.actionBarContainer}>{props.children}</div>;
};
