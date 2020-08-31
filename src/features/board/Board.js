import { BuildingCard } from '@common/buildingCard';
import { EmptyContent } from '@common/emptyContent';
import { menuRoutes } from '@features/menu/routes';
import { buildingSearchRoutes } from '@features/buildingSearch/routes';
import { ActionBar } from '@features/shared/ActionBar';
import { ActionBarButton } from '@features/shared/ActionBarButton';
import { ActionBarMenuButton } from '@features/shared/ActionBarMenuButton';
import { ActionBarMenuItem } from '@features/shared/ActionBarMenuItem';
import { ActionBarMenuDivider } from '@features/shared/ActionBarMenuDivider';
import * as sharedActions from '@features/shared/redux/actions';
import { Spinner } from '@features/shared/Spinner';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { routerActions } from 'connected-react-router';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { selectGetClubMenus, selectIsGetBoardBusy } from './redux/selectors';
import { i18n } from '@common/i18n-loader';
import { Icon } from '@common/icon';
import { SwipeableDeleteUndoComponent } from '@src/common/swipeableDeleteUndoComponent';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import QrReader from 'react-qr-reader';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    display: 'grid',
    margin: theme.spacing(0, 3),
    gridTemplateRows: 'min-content',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  boardBuildings: {
    width: '100%',
    display: 'grid',
    gridAutoRows: 'auto',
    gridAutoFlow: 'row',
    gridRowGap: theme.spacing(1),
    paddingBottom: theme.spacing(3),
  },
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    background: '#FEA900',
  },
  slide2: {
    background: '#B3DC4A',
  },
}));

export const BoardComponent = props => {
  const classes = useStyles(props);
  const {
    clubMenus,
    isGetBoardBusy,
    actions: { push, sharedModalActionsShow, sharedModalNotImplementedShow, boardGetClubMenus },
  } = props;

  const handleNavigateToView = useCallback(
    building => {
      console.log('handleNavigateToView building: ', building);
      push(menuRoutes.menuView.replace(':id', building.id));
    },
    [push],
  );

  const handleNavigateToBuildingNew = useCallback(() => push(menuRoutes.menuNew), [push]);
  const handleNavigateToBuildingSearch = useCallback(
    () => push(buildingSearchRoutes.buildingSearch),
    [push],
  );

  const handleScan = data => {
    if (data) {
      console.log(data);
    }
  };
  const handleError = err => {
    console.error(err);
  };

  const handleAddBuilding = useCallback(() => {
    sharedModalActionsShow({
      icon: <Icon name="IconInformation" paletteColor="modal.default" size="28" />,
      title: i18n._('Make a choice'),
      message: i18n._(
        'Do you want to create a new building (+) or do you want to search the existing buildings?',
      ),
      actions: [
        {
          icon: <Icon name="IconPlusSign" paletteColor="modal.default" />,
          command: handleNavigateToBuildingNew,
        },
        {
          icon: <Icon name="IconFilter" paletteColor="modal.default" />,
          command: handleNavigateToBuildingSearch,
        },
      ],
    });
  }, [sharedModalActionsShow, handleNavigateToBuildingNew, handleNavigateToBuildingSearch]);

  const handleRefreshBoard = useCallback(() => {
    boardGetClubMenus();
  }, [boardGetClubMenus]);

  if (isGetBoardBusy) {
    return <Spinner />;
  }
  return (
    <>
      {!!clubMenus && !!clubMenus.length ? (
        <div className={classes.container}>
          <TransitionGroup className={classes.boardBuildings}>
            {clubMenus.map(b => (
              <CSSTransition key={'menu-' + b.id} timeout={300} classNames="list">
                <SwipeableDeleteUndoComponent key={'menu-' + b.id} threshold={50} building={b}>
                  <BuildingCard
                    menu={b}
                    menuId={b.id}
                    menuName={b.name}
                    street={b.street}
                    withHighlight={true}
                    onClick={handleNavigateToView}
                  />
                </SwipeableDeleteUndoComponent>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      ) : (
        <div className={classes.container}>
          <SwipeableViews>
            <div className={Object.assign({}, classes.slide, classes.slide1)}>
              <EmptyContent locale={i18n._('No menu loaded yet.')} />
            </div>
            <div className={Object.assign({}, classes.slide, classes.slide2)}>
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
              />
            </div>
          </SwipeableViews>
        </div>
      )}

      <ActionBar>
        <ActionBarButton
          color="primary"
          label="add"
          icon="IconPlusSign"
          onClick={handleAddBuilding}
        />
        <ActionBarMenuButton color="primary" label="menu" icon="IconMenu">
          <ActionBarMenuItem icon="IconPlusSign" onClick={sharedModalNotImplementedShow}>
            Add new Item
          </ActionBarMenuItem>
          <ActionBarMenuItem icon="IconCross" onClick={sharedModalNotImplementedShow}>
            Remove Item
          </ActionBarMenuItem>
          <ActionBarMenuDivider />
          <ActionBarMenuItem icon="IconInformation" onClick={handleRefreshBoard}>
            Refresh board
          </ActionBarMenuItem>
        </ActionBarMenuButton>
      </ActionBar>
    </>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    clubMenus: selectGetClubMenus(state),
    isGetBoardBusy: selectIsGetBoardBusy(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const Board = connect(mapStateToProps, mapDispatchToProps)(BoardComponent);
