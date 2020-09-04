import { boardRoutes } from '@features/board/routes';
import * as sharedActions from '@features/shared/redux/actions';
// import { Trans } from '@lingui/macro';
import { routerActions } from 'connected-react-router';
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { MenuFields } from './MenuFields';
import { selectCurrentMenu, selectMenuIsBusy } from './redux/selectors';

export const MenuEditComponent = props => {
  const {
    isBusy,
    currentMenu,
    actions: { push, menuSave },
  } = props;

  const [menuName, setMenuNameValue] = useState(currentMenu.name);
  const [startTime, setStartTimeValue] = useState(new Date(`1974/10/10 ${currentMenu.startTime}`));

  const handleAbort = useCallback(() => push(boardRoutes.board), [push]);

  const handleMenuSave = useCallback(
    event => {
      const hours = (startTime.getHours() < 10 ? '0' : '') + startTime.getHours();
      const minutes = (startTime.getMinutes() < 10 ? '0' : '') + startTime.getMinutes();
      const id = currentMenu.id;
      menuSave({
        id: id,
        name: menuName,
        startTime: `${hours}:${minutes}`,
      });
    },
    [currentMenu.id, menuName, menuSave, startTime],
  );

  const handleChangeField = useCallback(e => {
    console.log('Field', e);
    if (e && e.name) {
      if (e.name === 'menuName') {
        setMenuNameValue(e.value);
      } else if (e.name === 'startTime') {
        setStartTimeValue(e.value);
      }
    }
  }, []);

  return (
    <MenuFields
      menuName={menuName}
      startTime={startTime}
      isBusy={isBusy}
      onClickAbort={handleAbort}
      onClickSave={handleMenuSave}
      onChangeField={handleChangeField}
    ></MenuFields>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentMenu: selectCurrentMenu(state),
    isBusy: selectMenuIsBusy(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const MenuEdit = connect(mapStateToProps, mapDispatchToProps)(MenuEditComponent);
