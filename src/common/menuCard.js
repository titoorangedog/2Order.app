import { SpinnerContent } from '@features/shared/SpinnerContent';
// import { Trans } from '@lingui/macro';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useCallback } from 'react';
import { Icon } from '@common/icon';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr',
    gridTemplateAreas: '"content"',
    borderRadius: '12px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.02)',
    userSelect: 'none',
    marginBottom: '5px',
    borderBottom: '2px solid ' + theme.palette.card.border,
  },

  menuContent: {
    backgroundColor: theme.palette.card.background,
    color: theme.palette.card.color,
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    gridArea: 'content',
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: 'auto min-content',
    gridTemplateAreas: '"title icons"',
    gridRowGap: theme.spacing(0.5),
    alignItems: 'center',
    padding: theme.spacing(1, 1.5),
  },

  menuSelectedContent: {
    backgroundColor: theme.palette.card.background,
  },

  menuNotSelectedContent: {
    backgroundColor: theme.palette.card.background,
  },

  menuTitle: {
    gridArea: 'title',
    fontSize: '15px',
    fontWeight: '600',
  },
  menuIcons: {
    gridArea: 'icons',
  },
}));

export const MenuCard = props => {
  const classes = useStyles(props);
  const { menu, isSelected, onNavigateClick, onDeleteClick, isBusy } = props;

  const handleClick = useCallback(() => {
    onNavigateClick(props.menu);
  }, [props.menu, onNavigateClick]);

  const handleDeleteMenu = useCallback(() => {
    onDeleteClick(props.menu);
  }, [props.menu, onDeleteClick]);

  return (
    <SpinnerContent show={isBusy}>
      <div className={classes.container}>
        <div
          className={clsx(classes.menuContent, {
            [classes.menuNotSelectedContent]: isSelected,
            [classes.menuSelectedContent]: !isSelected,
          })}
        >
          <div className={classes.menuTitle} onClick={!!handleClick && handleClick}>
            {menu.name}
          </div>

          <div className={classes.menuIcons}>
            <IconButton
              color="primary"
              aria-label="delete"
              className={classes.menuDownload}
              onClick={!!handleDeleteMenu && handleDeleteMenu}
            >
              <Icon name="IconBin" size="20" />
            </IconButton>
          </div>
        </div>
      </div>
    </SpinnerContent>
  );
};
