import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { map } from 'ramda';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'min-content auto',
    gridTemplateAreas: '"tabs" "content"',
    gridRowGap: theme.spacing(3),
  },
  tabsContainer: {
    gridArea: 'tabs',
    display: 'grid',
    gridAutoColumns: 'min-content',
    gridAutoFlow: 'column',
    gridColumnGap: theme.spacing(4),
    justifySelf: 'center',
  },
  tab: {
    color: theme.palette.common.black,
    fontWeight: '400',
    fontSize: '16px',
    whiteSpace: 'nowrap',
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      '&::after': {
        content: '""',
        display: 'block',
        position: 'relative',
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        background: theme.palette.primary.main,
        left: `calc(50% - ${theme.spacing(0.3)}px)`,
        top: theme.spacing(0.75),
      },
    },
  },
  viewContainer: {
    gridArea: 'content',
  },
}));

const StyledTabs = withStyles(theme => ({
  root: {
    backgroundColor: 'transparent',
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: '5px',
    '& > div': {
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      background: theme.palette.primary.main,
    },
  },
}))(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: theme.palette.primary.main,
    fontWeight: '400',
    fontSize: '14px',
    marginRight: theme.spacing(1),
    transition: 'all 0.3s ease-out',
  },
  selected: {
    transform: 'scale(1.071)',
    transition: 'transform 0s',
  },
}))(props => <Tab disableRipple {...props} />);

const containerStyle = {
  height: '100%',
};

const slideStyle = {
  position: 'relative',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
};

export const SwipeableView = props => {
  const classes = useStyles(props);
  const { tabs, defaultTab, children } = props;
  const [tabIndex, setTabIndex] = useState(defaultTab - 1);

  const handleSwitchTabBar = useCallback(
    (event, value) => {
      setTabIndex(value);
    },
    [setTabIndex],
  );

  const handleChangeIndex = useCallback(
    index => {
      setTabIndex(index);
    },
    [setTabIndex],
  );

  return (
    <div className={classes.container}>
      <StyledTabs value={tabIndex} onChange={handleSwitchTabBar} className={classes.tabsContainer}>
        {map(
          t => (
            <StyledTab key={t} label={t} />
          ),
          tabs,
        )}
      </StyledTabs>
      <SwipeableViews
        index={tabIndex}
        onChangeIndex={handleChangeIndex}
        className={classes.viewContainer}
        containerStyle={containerStyle}
        slideStyle={slideStyle}
      >
        {children}
      </SwipeableViews>
    </div>
  );
};
