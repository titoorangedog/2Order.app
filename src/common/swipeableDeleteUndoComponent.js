import * as actions from '@features/board/redux/actions';
import { SwipeableComponent } from '@src/common/swipeableComponent';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SwipeableDeleteComponent } from './swipeableDeleteComponent';
import { SwipeableUndoComponent } from './swipeableUndoComponent';

export const SwipeableDeleteUndo = props => {
  const {
    children,
    menu,
    actions: { boardRemoveMenu },
    ...otherProps
  } = props;
  const undoExpirationTime = 5000;
  const transitionTime = 300;

  const [deleteTimeout, setDeleteTimeout] = useState();
  const [transitionTimeout, setTransitionTimeout] = useState();

  const state = useRef({
    position: null,
    undoProgressBar: 0,
    canUndo: false,
    isDeleted: false,
  });

  const handleDeleteMenu = useCallback(() => {
    if (!state.current.isDeleted && state.current.canUndo) {
      state.current.isDeleted = true;
      state.current.canUndo = false;
      boardRemoveMenu(menu);
      clearTimeout(deleteTimeout);
    }
  }, [state, boardRemoveMenu, deleteTimeout, menu]);

  const handleDeletingMenu = useCallback(() => {
    state.current.canUndo = true;

    setDeleteTimeout(setTimeout(() => handleDeleteMenu(), undoExpirationTime));
  }, [handleDeleteMenu]);

  const handleUndo = useCallback(() => {
    state.current.position = 0;
    state.current.canUndo = false;

    setTransitionTimeout(
      setTimeout(() => {
        state.current.undoProgressBar = 0;
        state.current.position = null;
      }, transitionTime),
    );
  }, [state]);

  const Component = useCallback(() => {
    if (!state.current.canUndo) {
      return <SwipeableDeleteComponent />;
    } else {
      return (
        <SwipeableUndoComponent
          isDeleted={state.current.isDeleted}
          onUndoDelete={handleUndo}
          canUndo={state.current.canUndo}
          menu={menu}
          undoProgressBar={state.current.undoProgressBar}
          undoExpirationTime={undoExpirationTime}
          unmount={handleDeleteMenu}
        />
      );
    }
  }, [state, handleUndo, menu, handleDeleteMenu]);

  useEffect(() => {
    return () => {
      clearTimeout(transitionTimeout);
      clearTimeout(deleteTimeout);
    };
  }, [transitionTimeout, deleteTimeout]);

  return (
    <SwipeableComponent
      swipeRightComponent={Component()}
      onSwipeRight={handleDeletingMenu}
      position={state.current.position}
      {...otherProps}
    >
      {children}
    </SwipeableComponent>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {};
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export const SwipeableDeleteUndoComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwipeableDeleteUndo);
