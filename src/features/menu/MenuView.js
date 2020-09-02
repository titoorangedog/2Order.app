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
    gridTemplateRows: 'min-content auto',
    gridTemplateAreas: '"title" "content"',
    gridRowGap: theme.spacing(3),
    margin: theme.spacing(0, 3),
    borderRadius: '12px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.02)',
    backgroundColor: theme.palette.card.background,
    padding: theme.spacing(1, 1.5),
  },
  menuTitle: {
    gridArea: 'title',
    fontSize: '18px',
    fontWeight: '600',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 1.5),
    borderBottom: '2px solid ' + theme.palette.card.border,
  },

  viewContainer: {
    gridArea: 'content',
  },
}));

export const MenuViewComponent = props => {
  const classes = useStyles(props);
  const { currentMenu } = props;

  return <MenuSections className={classes.viewContainer} menu={currentMenu} />;
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
