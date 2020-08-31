import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
  hasPadding: {
    padding: theme.spacing(3),
  },
  root: {
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export const ButtonSpinner = props => {
  const classes = useStyles(props);

  const { children, disabled, isBusy, onClick, color, variant } = props;

  return (
    <div className={clsx(classes.root)}>
      <div className={classes.wrapper}>
        <Button
          variant={variant}
          color={color}
          disabled={isBusy || disabled}
          onClick={onClick}
          className={props.className}
        >
          {children}
        </Button>
        {isBusy && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
};

ButtonSpinner.defaultProps = {
  isBusy: false,
  disabled: false,
};
