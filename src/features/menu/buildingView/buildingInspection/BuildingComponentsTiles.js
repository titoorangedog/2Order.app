import * as sharedActions from '@features/shared/redux/actions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { routerActions } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionBar } from '@features/shared/ActionBar';
import { ActionBarMenuButton } from '@features/shared/ActionBarMenuButton';
import { ActionBarMenuItem } from '@features/shared/ActionBarMenuItem';
// import { Trans } from '@lingui/macro';
import { i18n } from '@common/i18n-loader';
import * as actions from '@features/menu/redux/actions';
import { selectIsBusy, selectGetComponents } from '@features/menu/redux/selectors';
import { Spinner } from '@features/shared/Spinner';
import { Icon } from '@common/icon';

const useStyles = makeStyles(theme => ({
  container: {
    overflow: 'auto',
    height: '100%',
    display: 'grid',
    gridAutoRows: 'min-content',
    gridRowGap: theme.spacing(2),
    margin: theme.spacing(0, 3),
    position: 'relative',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  categoryContainer: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'repeat(auto-fill, minmax(56px, 1fr))',
    gridGap: theme.spacing(2),
    padding: theme.spacing(2),
    background: theme.palette.constructionElements.category.background,
    borderRadius: theme.spacing(1),
    '&:last-child': {
      marginBottom: theme.spacing(8),
    },
  },
  elementContainer: {
    display: 'grid',
    // Leave auto on the first row when there will be icons
    gridTemplateRows: 'minmax(64px, 1fr) min-content',
    gridRowGap: theme.spacing(0.5),
  },
  elementIconContainer: {
    borderRadius: theme.spacing(1),
    background: theme.palette.constructionElements.element.icon.background,
    width: '100%',
    height: '100%',
  },
  elementName: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '500',
    color: theme.palette.constructionElements.element.name.color,
  },
}));

export const BuildingComponentsTilesComponent = props => {
  const { isBusy, components } = props;
  const classes = useStyles(props);

  if (isBusy) {
    return <Spinner />;
  }
  return (
    <>
      <div className={classes.container}>
        {!!components &&
          components.map(c => (
            <div className={classes.categoryContainer} key={c.id}>
              {c.items.map(ci => (
                <div className={classes.elementContainer} key={ci.id}>
                  <div className={classes.elementIconContainer}>
                    <Icon
                      name={ci.id}
                      size="48"
                      paletteColor="building.components"
                      type="component"
                      responsive
                    />
                  </div>
                  <div className={classes.elementName}>{ci.name}</div>
                </div>
              ))}
            </div>
          ))}
      </div>
      <ActionBar position="absolute">
        <ActionBarMenuButton color="primary" label="menu" icon="IconMenu">
          <ActionBarMenuItem icon="IconAdd">{i18n._('Reject')}</ActionBarMenuItem>
        </ActionBarMenuButton>
      </ActionBar>
    </>
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    isBusy: selectIsBusy(state),
    components: selectGetComponents(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...routerActions, ...actions, ...sharedActions }, dispatch),
  };
}

export const BuildingComponentsTiles = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuildingComponentsTilesComponent);
