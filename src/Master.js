import * as authActions from '@features/auth/redux/actions';
import { Board } from '@features/board/Board';
import { boardRoutes } from '@features/board/routes';
import { MenuNew } from '@features/menu/MenuNew';
import { MenuView } from '@features/menu/MenuView';
import { BuildingComponentsView } from '@features/menu/buildingView/buildingInspection/BuildingComponentsView';
import { menuRoutes } from '@features/menu/routes';
import { BuildingSearch } from '@features/buildingSearch/BuildingSearch';
import { buildingSearchRoutes } from '@features/buildingSearch/routes';
import { Profile } from '@features/profile/Profile';
import { profileRoutes } from '@features/profile/routes';
import { ModalActions } from '@features/shared/ModalActions';
import { NotFound } from '@features/shared/NotFound';
import { TopBar } from '@features/shared/TopBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100vh',
    paddingTop: theme.spacing(2),
    display: 'grid',
    gridTemplateRows: 'min-content auto',
    gridTemplateColumns: 'auto',
    gridTemplateAreas: '"topbar" "content"',
    gridRowGap: theme.spacing(3),
    overflow: 'hidden',
  },
  topbar: {
    gridArea: 'topbar',
  },
  content: {
    gridArea: 'content',
    overflow: 'auto',
    overflowX: 'hidden',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
}));

const MasterComponent = props => {
  const classes = useStyles(props);

  return (
    <>
      <div className={classes.container}>
        <TopBar className={classes.topbar} />
        <div className={classes.content}>
          <Switch>
            <Route path={boardRoutes.board} component={Board} />
            <Route path={buildingSearchRoutes.buildingSearch} component={BuildingSearch} />
            <Route path={menuRoutes.menuNew} component={MenuNew} />
            <Route path={menuRoutes.buildingComponentsView} component={BuildingComponentsView} />
            <Route path={menuRoutes.MenuView} component={MenuView} />
            <Route path={profileRoutes.profile} component={Profile} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <ModalActions />
      </div>
    </>
  );
};

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...authActions }, dispatch),
  };
}

export const Master = connect(null, mapDispatchToProps)(MasterComponent);
