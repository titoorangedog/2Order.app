import { MenuSections } from '@src/features/menu/menuView/MenuSections';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectMenuIsBusy, selectCurrentMenu } from './redux/selectors';
import { routerActions } from 'connected-react-router';
import * as sharedActions from '@features/shared/redux/actions';
import * as actions from './redux/actions';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    display: 'grid',
  },
}));

export const MenuViewComponent = props => {
  const classes = useStyles(props);
  const { currentMenu } = props;

  return <MenuSections className={classes.container} menu={currentMenu} />;
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    currentMenu: selectCurrentMenu(state),
    isGetSectionsBusy: selectMenuIsBusy(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const MenuView = connect(mapStateToProps, mapDispatchToProps)(MenuViewComponent);
