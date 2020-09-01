import { MenuSections } from '@src/features/menu/menuView/MenuSections';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'min-content auto',
    gridTemplateAreas: '"title" "content"',
    gridRowGap: theme.spacing(3),
    margin: theme.spacing(0, 3),
    borderRadius: '12px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.02)',
    backgroundColor: theme.palette.card.background,
    padding: theme.spacing(1, 1.5),
  },
  menuTitle: {
    gridArea: 'title',
    fontSize: '18px',
    fontWeight: '600',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1, 1.5),
    borderBottom: '2px solid ' + theme.palette.card.border,
  },

  viewContainer: {
    gridArea: 'content',
  },
}));

export const MenuView = props => {
  const classes = useStyles(props);
  const { menuId, menuName } = props;

  return <MenuSections className={classes.viewContainer} menuId={menuId} />;
};
