import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { Fab } from '@material-ui/core';
import clsx from 'clsx';
import { Icon } from '@common/icon';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    zIndex: '9990',
  },
  menuButton: props => ({
    zIndex: '9992',
    background: theme.palette.actionBar.button.background,
    transition: `background-color ${props.transitiontime}s ease-out`,
    border: `0px`,
  }),
  icon: props => ({
    transition: `color ${props.transitiontime}s ease-out, transform ${props.transitiontime}s ease-out`,
  }),
  buttonMenuOpen: props => ({
    background: `${theme.palette.actionBar.menu.open.button.background} !important`,
    border: `2px solid ${theme.palette.actionBar.menu.open.button.border} !important`,
  }),
  buttonMenuClosing: props => ({
    transition: `box-shadow ${props.transitiontime}s ease-out`,
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  }),
  buttonMenuStillOpen: {
    boxShadow: `0px 0px 0px ${theme.spacing(0.5)}px ${theme.palette.background} !important`,
  },
  buttonMenuOpenIcon: {
    transform: 'rotate(-90deg)',
  },
}));

export const ActionBarButton = props => {
  const { icon, label, open, isOpening, children, ...otherProps } = props;
  const classes = useStyles(props);

  if (!!children)
    return (
      <div className={classes.container}>
        {React.cloneElement(children, { open })}
        <Fab
          className={clsx(
            classes.menuButton,
            ((!!open && !isOpening) || (!open && !!isOpening)) && classes.buttonMenuOpen,
            ((!!open && !!isOpening) || (!!open && !isOpening) || (!open && !!isOpening)) &&
              classes.buttonMenuStillOpen,
            ((!!open && !isOpening) || (!!open && !!isOpening)) && classes.buttonMenuClosing,
          )}
          aria-label={label}
          {...otherProps}
        >
          <Icon
            name="IconMoreOptions"
            size="14"
            paletteColor={
              (!!open && !isOpening) || (!open && !!isOpening)
                ? 'button.secondary'
                : 'button.primary'
            }
            className={clsx(
              classes.icon,
              ((!!open && !isOpening) || (!open && !!isOpening)) && classes.buttonMenuOpenIcon,
            )}
          />
        </Fab>
      </div>
    );
  else
    return (
      <Fab aria-label={label} {...otherProps}>
        <Icon name={icon} size="14" paletteColor="button.primary" />
      </Fab>
    );
};
