import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { Icon } from '@common/icon';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: `${theme.spacing(2)}px auto`,
    gridTemplateRows: 'auto',
    gridTemplateAreas: '"icon content"',
    gridColumnGap: theme.spacing(1.5),
    alignItems: 'center',
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1, 1),
  },
  icon: {
    gridArea: 'icon',
    display: 'grid',
    alignItems: 'center',
  },
  content: {
    gridArea: 'content',
    fontSize: '16px',
  },
}));

export const ActionBarMenuItem = props => {
  const { icon, children, onClick } = props;
  const classes = useStyles(props);

  return (
    <div className={classes.container} onClick={onClick}>
      <div className={classes.icon}>
        <Icon name={icon} size="14" paletteColor="actionBar.default" />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};
