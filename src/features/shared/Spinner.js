import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
  },
}));

export const Spinner = props => {
  const { color, className } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.container}>
      <CircularProgress
        color="primary"
        style={{ color: !!color ? color : '' }}
        className={!!className ? className : ''}
      />
    </div>
  );
};
