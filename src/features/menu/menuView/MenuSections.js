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
import { useCallback } from 'react';
import { selectMenuIsBusy } from '@features/menu/redux/selectors';
import { menuRoutes } from '@features/menu/routes';
import { Spinner } from '@features/shared/Spinner';
import { MenuViewSection } from './menuViewSection';
import { Icon } from '@common/icon';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridRowGap: theme.spacing(2),
    padding: theme.spacing(0, 3),
    position: 'relative',
  },
  section: {
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"header" "content"',
    borderRadius: '8px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.02)',
  },
  sectionHeaderInfo: {
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
  sectionHeaderCommon: {
    borderTopRightRadius: 'inherit',
    borderTopLeftRadius: 'inherit',
    padding: theme.spacing(2, 2, 1.5),
    display: 'grid',
    gridTemplateRows: 'auto auto',
    gridTemplateAreas: '"title" "bottom"',
    gridRowGap: theme.spacing(1),
  },
  sectionHeaderTitle: {
    gridArea: 'title',
    color: theme.palette.primary.contrastText,
    fontSize: '20px',
    fontWeight: '400',
  },
  sectionNameContent: {
    background: theme.palette.card.background,
    borderBottomRightRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    color: theme.palette.card.color,
    padding: theme.spacing(2, 2.5),
  },
  sectionNameContainer: {
    background: theme.palette.card.list.border,
    display: 'grid',
    gridAutoRows: `minmax(${theme.spacing(6)}px, min-content)`,
    gridAutoColumns: '100%',
    gridAutoFlow: 'row',
    gridRowGap: '1px',
  },
  sectionName: {
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
  sectionNameWithSubtitle: {
    gridRowGap: theme.spacing(2),
    gridTemplateRows: 'min-content min-content',
    gridTemplateAreas: '"title" "subtitle"',
    alignContent: 'space-between',
  },
  sectionNameTitle: {
    display: 'grid',
    gridArea: 'title',
    fontSize: '19px',
    fontWeight: '500',
  },
  sectionNameSubtitle: {
    gridArea: 'subtitle',
    fontSize: '12px',
    color: 'red',
    fontWeight: '300',
  },
  sectionTransactionContainer: {
    width: '100%',
  },
}));

export const MenuSectionsComponent = props => {
  const {
    menu,
    isBusy,
    actions: { push, menuCreateSection, sharedModalActionsShow },
  } = props;
  const classes = useStyles(props);

  const handleAddSection = useCallback(() => {
    menuCreateSection();
  }, [menuCreateSection]);

  const handleNavigateToAddSection = useCallback(() => push(menuRoutes.menuNew), [push]);

  const handleNavigateToEditMenu = useCallback(() => {
    console.log('handleNavigateToEditMenu menu.id: ', menu.id);
    push(menuRoutes.menuEdit.replace(':id', menu.id));
  }, [menu.id, push]);

  const handleNavigateToMenuView = useCallback(
    () => push(menuRoutes.menuEdit.replace(':id', menu.id)),
    [push, menu],
  );

  const handleDeleteSection = useCallback(() => {
    sharedModalActionsShow({
      icon: <Icon name="IconInformation" paletteColor="modal.default" size="28" />,
      title: i18n._('Confirm the choice'),
      message: i18n._('Do you want delete this section?'),
      actions: [
        {
          icon: <Icon name="IconPlusSign" paletteColor="modal.default" />,
          command: handleAddSection,
        },
      ],
    });
  }, [sharedModalActionsShow, handleAddSection]);

  if (isBusy) {
    return <Spinner />;
  }
  return (
    <>
      {!!menu || isBusy ? (
        <div className={classes.container}>
          <div className={classes.section}>
            <div className={clsx(classes.sectionHeaderInfo, classes.sectionHeaderCommon)}>
              <div className={classes.sectionHeaderTitle}>{i18n._('Menu Info')}</div>
            </div>
            <div className={classes.sectionNameContent}>
              <div className={classes.sectionNameContainer}>
                <div className={clsx(classes.sectionName, classes.sectionNameWithSubtitle)}>
                  <div className={classes.sectionNameTitle}>
                    {menu.id} - {menu.name}
                  </div>
                  <div className={classes.sectionNameSubtitle}>
                    {i18n._('Start time')} {menu.startTime}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!!menu && !!menu.sections && menu.sections.length > 0 ? (
            <div>
              {menu.sections.map(b => (
                <MenuViewSection
                  section={b}
                  key={'section-' + b.id}
                  onEditSectionClick={handleNavigateToMenuView}
                  onDeleteSectionClick={handleDeleteSection}
                ></MenuViewSection>
              ))}
            </div>
          ) : (
            <EmptyContent
              locale={i18n._('Menu empty. Please create a section.')}
              responsive
            ></EmptyContent>
          )}

          <ActionBar position="absolute">
            <ActionBarButton
              color="primary"
              label="add"
              icon="IconPlusSign"
              onClick={handleNavigateToAddSection}
            />
            <ActionBarButton
              color="primary"
              label="add"
              icon="IconEdit2"
              onClick={handleNavigateToEditMenu}
            />
          </ActionBar>
        </div>
      ) : (
        <EmptyContent locale={i18n._(`Menu doesn't exist`)} responsive></EmptyContent>
      )}
    </>
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

export const MenuSections = connect(mapStateToProps, mapDispatchToProps)(MenuSectionsComponent);
