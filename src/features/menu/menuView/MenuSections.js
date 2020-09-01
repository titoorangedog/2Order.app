import { EmptyContent } from '@common/emptyContent';
import * as actions from '@features/menu/redux/actions';
import * as sharedActions from '@features/shared/redux/actions';
// import { Trans } from '@lingui/macro';
import { i18n } from '@common/i18n-loader';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import { routerActions } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionBar } from '@features/shared/ActionBar';
import { ActionBarButton } from '@features/shared/ActionBarButton';
import { ActionBarMenuButton } from '@features/shared/ActionBarMenuButton';
import { ActionBarMenuItem } from '@features/shared/ActionBarMenuItem';
import { useCallback } from 'react';
import {
  selectIsBusy,
  selectGetSection,
  selectCurrentBuilding,
} from '@features/menu/redux/selectors';
import { menuRoutes } from '@features/menu/routes';
import { Icon } from '@common/icon';
import { Spinner } from '@features/shared/Spinner';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridRowGap: theme.spacing(2),
    padding: theme.spacing(0, 3),
    position: 'relative',
  },
  inspection: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"header" "content"',
    borderRadius: '8px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.02)',
  },
  inspectionHeaderInfo: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    borderTopRightRadius: 'inherit',
    borderTopLeftRadius: 'inherit',
    padding: theme.spacing(2, 2, 1.5),
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"title" "bottom"',
    gridRowGap: theme.spacing(1),
  },
  inspectionHeaderDetails: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  inspectionHeaderCommon: {
    borderTopRightRadius: 'inherit',
    borderTopLeftRadius: 'inherit',
    padding: theme.spacing(2, 2, 1.5),
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"title" "bottom"',
    gridRowGap: theme.spacing(1),
  },
  inspectionHeaderTitle: {
    gridArea: 'title',
    color: theme.palette.primary.contrastText,
    fontSize: '20px',
    fontWeight: '400',
  },
  inspectionHeaderBottomItems: {
    gridArea: 'bottom',
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'min-content min-content',
    gridColumnGap: theme.spacing(3),
  },
  inspectionHeaderBottomItem: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    fontWeight: '300',
  },
  inspectionHeaderBottomItemHeader: {
    fontSize: '11px',
    fontWeight: '300',
    whiteSpace: 'nowrap',
  },
  inspectionHeaderBottomItemContent: {
    fontSize: '13px',
    fontWeight: '300',
    whiteSpace: 'nowrap',
  },
  inspectionContent: {
    background: theme.palette.card.background,
    borderBottomRightRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    color: theme.palette.card.color,
    padding: theme.spacing(2, 2.5),
  },
  inspectionSectionContainer: {
    background: theme.palette.card.list.border,
    display: 'grid',
    gridAutoRows: `minmax(${theme.spacing(6)}px, min-content)`,
    gridAutoColumns: '100%',
    gridAutoFlow: 'row',
    gridRowGap: '1px',
  },
  inspectionSection: {
    background: theme.palette.card.background,
    display: 'grid',
    gridTemplateColumns: `auto ${theme.spacing(4)}px`,
    gridTemplateRows: 'min-content',
    gridTemplateAreas: '"title icon"',
    alignContent: 'center',
    padding: theme.spacing(3, 0),
    '&:first-child': {
      padding: theme.spacing(1, 0, 3),
    },
    '&:last-child': {
      padding: theme.spacing(3, 0, 2),
    },
  },
  withSectionSubtitle: {
    gridRowGap: theme.spacing(2),
    gridTemplateRows: 'min-content min-content',
    gridTemplateAreas: '"title ." "subtitle icon"',
    alignContent: 'space-between',
  },
  inspectionSectionTitle: {
    display: 'grid',
    gridArea: 'title',
    gridTemplateColumns: 'auto auto',
    gridTemplateAreas: '"description prize"',
    fontSize: '19px',
    fontWeight: '500',
  },
  sectionDescription: {
    gridArea: 'description',
  },

  sectionPrize: {
    gridArea: 'prize',
    color: theme.palette.primary.main,
    textAlign: 'right',
  },
  inspectionSectionSubtitle: {
    gridArea: 'subtitle',
    fontSize: '12px',
    color: 'red',
    fontWeight: '300',
  },
  inspectionSectionIcon: {
    gridArea: 'icon',
    justifySelf: 'end',
    alignSelf: 'center',
  },
}));

export const MenuSectionsComponent = props => {
  const {
    menuSections,
    currentBuilding,
    isBusy,
    actions: { push, menuCreateSection, sharedModalNotImplementedShow },
  } = props;
  const classes = useStyles(props);

  const handleAddSection = useCallback(() => {
    menuCreateSection();
  }, [menuCreateSection]);

  const handleNavigateToComponentsView = useCallback(
    () => push(menuRoutes.menuComponentsView.replace(':id', currentBuilding.id)),
    [push, currentBuilding],
  );

  if (isBusy) {
    return <Spinner />;
  }
  return (
    <>
      {/* {!!menuInspection || isBusy ? ( */}
      <div className={classes.container}>
        <div className={classes.inspection}>
          <div className={clsx(classes.inspectionHeaderInfo, classes.inspectionHeaderCommon)}>
            <div className={classes.inspectionHeaderTitle}>MENU INFO</div>
          </div>
          <div className={classes.inspectionContent}>
            <div className={classes.inspectionSectionContainer}>
              <div className={clsx(classes.inspectionSection, classes.withSectionSubtitle)}>
                <div className={classes.inspectionSectionTitle}>1 - MENU</div>
                <div className={classes.inspectionSectionSubtitle}>from: 18:00 to 03:00</div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.inspection}>
          <div className={clsx(classes.inspectionHeaderDetails, classes.inspectionHeaderCommon)}>
            <div className={classes.inspectionHeaderTitle}>COCKTAIL ALCOLICO</div>
          </div>
          <div className={classes.inspectionContent}>
            <div className={classes.inspectionSectionContainer}>
              <div
                className={clsx(classes.inspectionSection, classes.withSectionSubtitle)}
                onClick={handleNavigateToComponentsView}
              >
                <div className={classes.inspectionSectionTitle}>
                  <div className={classes.sectionDescription}>Aperol Spritz</div>
                  <div className={classes.sectionPrize}>7.00</div>
                </div>
                <div className={classes.inspectionSectionSubtitle}>
                  Prosecco, Aperol, Seltz, arancia
                </div>
              </div>
              <div
                className={clsx(classes.inspectionSection, classes.withSectionSubtitle)}
                onClick={handleNavigateToComponentsView}
              >
                <div className={classes.inspectionSectionTitle}>
                  <div className={classes.sectionDescription}>Moskow Mule</div>
                  <div className={classes.sectionPrize}>7.50</div>
                </div>
                <div className={classes.inspectionSectionSubtitle}>Vodka, Ginger Beer, Lime</div>
              </div>
            </div>
          </div>
        </div>
        <ActionBar position="absolute">
          <ActionBarMenuButton color="primary" label="menu" icon="IconMenu">
            <ActionBarMenuItem icon="IconCross" onClick={sharedModalNotImplementedShow}>
              {i18n._('Discard section')}
            </ActionBarMenuItem>
          </ActionBarMenuButton>
        </ActionBar>
      </div>

      {/* ) : (
        <EmptyContent locale={i18n._('Menu empty. Please create a section.')} responsive>
          <ActionBar position="absolute">
            <ActionBarButton
              color="primary"
              label="add"
              icon="IconPlusSign"
              onClick={handleAddInspection}
            />
          </ActionBar>
        </EmptyContent>
      )} */}
    </>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    isBusy: selectIsBusy(state),
    inspection: selectGetSection(state),
    currentBuilding: selectCurrentBuilding(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const MenuSections = connect(mapStateToProps, mapDispatchToProps)(MenuSectionsComponent);
