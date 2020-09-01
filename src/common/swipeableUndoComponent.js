import { Icon } from '@common/icon';
import * as actions from '@features/board/redux/actions';
import { selectIsRemovingMenuBusy } from '@features/board/redux/selectors';
import { Spinner } from '@features/shared/Spinner';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useInterval from '@use-it/interval';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import useBeforeUnload from 'use-before-unload';

const useStyles = makeStyles(theme => ({
  undoContainer: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 10px',
    gridTemplateAreas: '"content" "progress"',
    placeItems: 'center',
    background: theme.palette.swipeable.undo.background,
    overflow: 'hidden',
    borderRadius: '12px',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  undoContainerSpinner: {
    width: '100%',
    height: '100%',
    placeItems: 'center',
    background: theme.palette.swipeable.undo.background,
    overflow: 'hidden',
    transition: 'background 0.3s ease-out',
    borderRadius: '12px',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  undoSpinner: {
    color: theme.palette.swipeable.undo.spinner,
  },
  undoContentContainer: {
    gridArea: 'content',
    display: 'grid',
    gridTemplateColumns: 'min-content min-content',
    gridTemplateAreas: '"icon text"',
    gridColumnGap: theme.spacing(2),
    justifyContent: 'center',
  },
  undoIcon: {
    gridArea: 'icon',
  },
  undoText: {
    gridArea: 'text',
    fontSize: '24px',
    color: theme.palette.swipeable.undo.color,
    justifySelf: 'center',
  },
  undoProgressBar: {
    gridArea: 'progress',
    background: theme.palette.swipeable.undo.progressBar.background,
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
    overflow: 'hidden',
  },
  undoProgressBarActive: {
    background: theme.palette.swipeable.undo.progressBar.active,
    height: '100%',
    width: '0%',
    transition: 'width 0.05s ease-out',
  },
}));

export const SwipeableUndo = props => {
  const classes = useStyles(props);
  const {
    canUndo,
    isDeleted,
    onUndoDelete,
    menu,
    undoProgressBar,
    undoExpirationTime,
    unmount,
    isBusyRemovingMenu,
  } = props;

  const [undoProgressBarValue, setUndoProgressBarValue] = useState(undoProgressBar);
  const [onDeleting, setOnDeleting] = useState(false);

  useEffect(() => {
    setUndoProgressBarValue(undoProgressBar);
  }, [undoProgressBar]);

  useEffect(() => {
    if (!!menu && !!isBusyRemovingMenu[menu.id]) {
      setOnDeleting(true);
    }
  }, [isBusyRemovingMenu, menu]);

  useBeforeUnload(() => {
    unmount();
  });

  useEffect(() => {
    return () => {
      unmount();
    };
  }, [unmount]);

  useInterval(
    () => {
      if (undoProgressBarValue < 100) {
        setUndoProgressBarValue(previousValue => previousValue + (100 / undoExpirationTime) * 50);
      }
    },
    canUndo && !isDeleted ? 50 : null,
  );

  if (onDeleting) {
    return (
      <div className={classes.undoContainerSpinner}>
        <Spinner className={classes.undoSpinner} />
      </div>
    );
  }
  return (
    <div className={classes.undoContainer} onClick={onUndoDelete}>
      <div className={classes.undoContentContainer}>
        <Icon
          className={classes.undoIcon}
          name="IconUndo"
          paletteColor="swipeable.undo"
          size="28"
        />
        <div className={classes.undoText}>UNDO</div>
      </div>
      <div className={classes.undoProgressBar}>
        <div
          className={classes.undoProgressBarActive}
          style={{ width: `${undoProgressBarValue}%` }}
        ></div>
      </div>
    </div>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    isBusyRemovingMenu: selectIsRemovingMenuBusy(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export const SwipeableUndoComponent = connect(mapStateToProps, mapDispatchToProps)(SwipeableUndo);
