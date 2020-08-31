import { selectIsLoggedIn } from '@features/auth/redux/selectors';
import { profileRoutes } from '@features/profile/routes';
import * as sharedActions from '@features/shared/redux/actions';
import { selectTopbar, selectTopBarIsVisible, selectTheme } from '@features/shared/redux/selectors';
import { makeStyles } from '@material-ui/core/styles';
import { Icon } from '@common/icon';
import clsx from 'clsx';
import { routerActions } from 'connected-react-router';
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './redux/actions';
import { isDevelop } from '@common/isDevelop';

const addDarkButtonSwitcher = gridArea => (!!isDevelop ? gridArea : '');

const useStyles = makeStyles(theme => ({
  container: {
    color: theme.palette.primary.main,
    display: 'grid',
    gridTemplateColumns: `${theme.spacing(2)}px auto 
      ${addDarkButtonSwitcher('minmax(0px, min-content)')} ${theme.spacing(2.5)}px`,
    gridTemplateRows: `${theme.spacing(3)}px minmax(0px, min-content)`,
    gridTemplateAreas: `"back title ${addDarkButtonSwitcher('dark')} profile" 
      ". title ${addDarkButtonSwitcher('.')} ."`,
    gridColumnGap: theme.spacing(1),
    alignItems: 'center',
    fontSize: '20px',
    padding: theme.spacing(0, 3, 0, 2),
  },
  withSubtitle: {
    gridTemplateRows: `${theme.spacing(3)}px minmax(0px, min-content) ${theme.spacing(
      2,
    )}px minmax(0px, auto)`,
    gridTemplateAreas: `"back title ${addDarkButtonSwitcher('dark')} profile" 
      ". title ${addDarkButtonSwitcher('.')}  ."
      ". . ${addDarkButtonSwitcher('.')} ." 
      ". subtitle ${addDarkButtonSwitcher('.')}  ."`,
  },
  topBarBack: {
    gridArea: 'back',
    cursor: 'pointer',
    display: 'grid',
  },
  topBarTitle: {
    gridArea: 'title',
    cursor: 'pointer',
    alignSelf: 'start',
    color: theme.palette.topbar.title,
    fontWeight: '600',
    fontSize: '21px',
  },
  topBarTitlePrimary: {
    cursor: 'default',
    color: theme.palette.primary.main,
    fontWeight: '600',
    fontSize: '21px',
  },
  topBarSubtitle: {
    gridArea: 'subtitle',
    color: theme.palette.topbar.subtitle,
    fontWeight: '500',
    fontSize: '15px',
  },
  topBarProfile: {
    gridArea: 'profile',
    cursor: 'pointer',
    display: 'grid',
  },
  topBarDark: {
    gridArea: 'dark',
    cursor: 'pointer',
    display: 'grid',
  },
}));

const TopBarComponent = props => {
  const classes = useStyles(props);
  const {
    className,
    isLoggedin,
    isVisible,
    topbar,
    theme,
    actions: { push, goBack, sharedChangeTheme },
  } = props;

  const handleNavigateToProfile = useCallback(() => push(profileRoutes.profile), [push]);
  const handleNavigateToBack = useCallback(() => {
    if (topbar.back) {
      goBack();
    }
  }, [goBack, topbar.back]);

  const handleChangeTheme = useCallback(() => {
    if (theme === 'dark') sharedChangeTheme('light');
    else sharedChangeTheme('dark');
  }, [sharedChangeTheme, theme]);

  return (
    isLoggedin &&
    isVisible && (
      <div
        className={clsx(className, classes.container, !!topbar.subtitle && classes.withSubtitle)}
      >
        {topbar.back && (
          <div className={classes.topBarBack} onClick={handleNavigateToBack}>
            <Icon name="IconArrow1Left" size="16" vAlign="inherit" paletteColor="topbar.back" />
          </div>
        )}
        <div
          onClick={handleNavigateToBack}
          className={clsx(
            classes.topBarTitle,
            (topbar.titlePrimary || (topbar.title && topbar.title === 'Board')) &&
              classes.topBarTitlePrimary,
            !!isDevelop && classes.withDark,
          )}
        >
          {topbar.title}
        </div>
        {!!isDevelop && (
          <div className={classes.topBarDark} onClick={handleChangeTheme}>
            <Icon name="IconFlash" size="18" />
          </div>
        )}
        {!!topbar.subtitle && <div className={classes.topBarSubtitle}>{topbar.subtitle}</div>}
        <div className={classes.topBarProfile} onClick={handleNavigateToProfile}>
          <Icon name="IconProfile1" size="18" paletteColor="topbar.profile" />
        </div>
      </div>
    )
  );
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    isLoggedin: selectIsLoggedIn(state),
    isVisible: selectTopBarIsVisible(state),
    topbar: selectTopbar(state),
    theme: selectTheme(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...sharedActions, ...routerActions }, dispatch),
  };
}

export const TopBar = connect(mapStateToProps, mapDispatchToProps)(TopBarComponent);
