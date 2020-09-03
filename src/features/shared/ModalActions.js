import { selectModalActions } from '@features/shared/redux/selectors';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'auto min-content',
    gridTemplateAreas: '"header" "footer"',
    padding: '0 !important',
  },
  header: {
    padding: theme.spacing(3, 4),
    gridArea: 'header',
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridRowGap: theme.spacing(2),
  },
  navigation: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  logoContainer: {
    textAlign: 'center',
    cursor: 'pointer',
    justifySelf: 'center',
  },
  close: {
    maxWidth: '50px',
  },
  messageContainer: {
    textAlign: 'center',
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridRowGap: theme.spacing(2),
  },
  title: {
    fontWeight: '900',
    fontSize: '20px',
  },
  message: { fontWeight: '100' },
  footer: {
    gridArea: 'footer',
  },
  bottomNavigation: {
    background: 'transparent',
    display: 'grid',
    gridAutoColumns: '1fr',
    gridAutoFlow: 'column',
  },
}));

const ModalActionsComponent = props => {
  const classes = useStyles(props);

  const {
    modalActions: { icon, show, title, message, actions },
    actions: { sharedModalActionsHide },
  } = props;
  const [open, setOpen] = useState(show);
  const transition = 300;

  // Update modal dialog open based on the
  // show property get from the state
  useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleOnExited = useCallback(() => {
    sharedModalActionsHide();
  }, [sharedModalActionsHide]);

  const handleChange = useCallback(
    (_, newValue) => {
      actions[newValue].command();
    },
    [actions],
  );

  return (
    <Dialog
      aria-labelledby="dialogTitle"
      open={open}
      onBackdropClick={handleClose}
      transitionDuration={transition}
      onExited={handleOnExited}
      onExit={handleClose}
      className={classes.dialog}
    >
      <DialogContent className={classes.container}>
        <div className={classes.header}>
          <div className={classes.logoContainer}>{!!icon && icon}</div>
          <div className={classes.messageContainer}>
            <div className={classes.title}>{title}</div>
            <div className={classes.message}>{message}</div>
          </div>
        </div>
        <div className={classes.footer}>
          <BottomNavigation className={classes.bottomNavigation} onClick={handleChange} showLabels>
            {actions.map((action, index) => (
              <BottomNavigationAction
                key={'action-' + index}
                className={classes.bottomNavigationAction}
                icon={action.icon}
              />
            ))}
          </BottomNavigation>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    modalActions: selectModalActions(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export const ModalActions = connect(mapStateToProps, mapDispatchToProps)(ModalActionsComponent);
