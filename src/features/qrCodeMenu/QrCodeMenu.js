import { i18n } from '@common/i18n-loader';
import * as sharedActions from '@features/shared/redux/actions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { routerActions } from 'connected-react-router';
import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { selectCurrentQrCodeInfo, selectBusy, selectMenu } from './redux/selectors';
import clsx from 'clsx';
import { Spinner } from '@features/shared/Spinner';
import { EmptyContent } from '@common/emptyContent';
import { MenuViewSection } from '@features/menu/menuView/menuViewSection.js';

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

export const QrCodeMenuComponent = props => {
  const classes = useStyles(props);
  const { qrCodeInfo, isBusy, qrCodeMenu } = props;
  if (isBusy) {
    return <Spinner />;
  }
  return (
    <>
      {!!qrCodeMenu || isBusy ? (
        <div className={classes.container}>
          <div className={classes.section}>
            <div className={clsx(classes.sectionHeaderInfo, classes.sectionHeaderCommon)}>
              <div className={classes.sectionHeaderTitle}>{i18n._('Menu Info')}</div>
            </div>
            <div className={classes.sectionNameContent}>
              <div className={classes.sectionNameContainer}>
                <div className={clsx(classes.sectionName, classes.sectionNameWithSubtitle)}>
                  <div className={classes.sectionNameTitle}>{qrCodeMenu.name}</div>
                </div>
              </div>
            </div>
          </div>
          {!!qrCodeMenu && !!qrCodeMenu.sections && qrCodeMenu.sections.length > 0 ? (
            <div>
              {qrCodeMenu.sections.map(b => (
                <MenuViewSection section={b} key={'section-' + b.id}></MenuViewSection>
              ))}
            </div>
          ) : (
            <EmptyContent
              locale={i18n._('Menu empty, please wait, working progress')}
              responsive
            ></EmptyContent>
          )}
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
    qrCodeMenu: selectMenu(state),
    qrCodeInfo: selectCurrentQrCodeInfo(state),
    isBusy: selectBusy(state),
  };
}
/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const QrCodeMenu = connect(mapStateToProps, mapDispatchToProps)(QrCodeMenuComponent);