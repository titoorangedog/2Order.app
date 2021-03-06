import { boardRoutes } from '@features/board/routes';
import * as sharedActions from '@features/shared/redux/actions';
// import { Trans } from '@lingui/macro';
import { routerActions } from 'connected-react-router';
import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { selectMenuIsBusy } from './redux/selectors';
import { MenuFields } from './MenuFields';

export const MenuNewComponent = props => {
  const {
    isBusy,
    actions: { push, menuSave },
  } = props;

  const [menuName, setMenuNameValue] = useState('');
  const [startTime, setStartTimeValue] = useState(new Date());

  const handleAbort = useCallback(() => push(boardRoutes.board), [push]);

  const handleMenuSave = useCallback(
    event => {
      const hours = (startTime.getHours() < 10 ? '0' : '') + startTime.getHours();
      const minutes = (startTime.getMinutes() < 10 ? '0' : '') + startTime.getMinutes();
      menuSave({
        name: menuName,
        startTime: `${hours}:${minutes}`,
      });
    },
    [menuName, menuSave, startTime],
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
    isBusy: selectMenuIsBusy(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const MenuNew = connect(mapStateToProps, mapDispatchToProps)(MenuNewComponent);
