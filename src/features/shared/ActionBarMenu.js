import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  menu: props => ({
    zIndex: '9991',
    position: 'absolute',
    bottom: theme.spacing(4),
    right: `-${theme.spacing(1)}px`,
    background: theme.palette.actionBar.menu.background,
    color: theme.palette.actionBar.menu.color,
    display: 'grid',
    transform: 'scale(0)',
    transformOrigin: 'bottom right',
    opacity: '0',
    gridAutoFlow: 'row',
    gridAutoRows: 'min-content',
    gridAutoColumns: theme.spacing(24),
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.2)',
    transition: `all ${props.transitiontime}s ease-in-out`,
  }),
  isOpen: {
    transform: 'scale(1) !important',
    opacity: '1 !important',
  },
}));

export const ActionBarMenu = props => {
  const { open, isOpening, children } = props;
  const classes = useStyles(props);

  return (
    <div
      className={clsx(
        classes.menu,
        ((!!open && !isOpening) || (!open && !!isOpening)) && classes.isOpen,
      )}
    >
      {children}
    </div>
  );
};
