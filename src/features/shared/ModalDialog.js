import { selectModalDialog } from '@features/shared/redux/selectors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { Icon } from '@src/common/icon';

const useStyles = makeStyles(theme => ({
  parentContainer: {
    '& .MuiPaper-root': {
      maxWidth: 'none',
      margin: '0',
    },
  },
  container: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateColumns: 'minmax(min-content, 70vw)',
    gridTemplateAreas: '"header" "message"',
    gridRowGap: theme.spacing(2),
    padding: theme.spacing(2, 2, 3),
  },
  headerContainer: {
    gridArea: 'header',
    textAlign: 'center',
    cursor: 'pointer',
    display: 'grid',
    placeItems: 'center',
  },
  messageContainer: {
    gridArea: 'message',
    textAlign: 'center',
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridRowGap: theme.spacing(1),
  },
  title: {
    fontWeight: '800',
    fontSize: '18px',
  },
  message: {
    fontSize: '16px',
    fontWeight: '100',
  },
}));

const ModalDialogComponent = props => {
  const classes = useStyles(props);
  const {
    modalDialog: { icon, show, title, message, time },
    actions: { sharedModalHide },
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
    sharedModalHide();
  }, [sharedModalHide]);

  // Set timeout of the dialog if time is set
  useEffect(() => {
    if (!!time) {
      setTimeout(() => {
        handleClose();
      }, time);
    }
  }, [time, handleClose]);

  return (
    <Dialog
      aria-labelledby="dialogTitle"
      open={open}
      onClick={handleClose}
      transitionDuration={transition}
      onExited={handleOnExited}
      className={classes.parentContainer}
    >
      <DialogContent className={classes.container}>
        <div className={classes.headerContainer}>
          {icon === 'success' ? (
            <Icon name="IconCheckmark" size="36" />
          ) : (
            <Icon name="IconCross" size="36" />
          )}
        </div>
        <div className={classes.messageContainer}>
          <div className={classes.title}>{title}</div>
          <div className={classes.message}>{message}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    modalDialog: selectModalDialog(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export const ModalDialog = connect(mapStateToProps, mapDispatchToProps)(ModalDialogComponent);
