import makeStyles from '@material-ui/core/styles/makeStyles';
import { EmptyContent } from '@common/emptyContent';
import { i18n } from '@common/i18n-loader';

import React from 'react';
import clsx from 'clsx';
import { useCallback } from 'react';
import { Icon } from '@common/icon';

const useStyles = makeStyles(theme => ({
  sectionHeaderDetails: {
    display: 'grid',
    gridTemplateColumns: 'auto  min-content',
    gridTemplateRows: '1fr',
    gridColumnGap: theme.spacing(1),
    gridTemplateAreas: '"title icons"',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderTopRightRadius: 'inherit',
    borderTopLeftRadius: 'inherit',
    padding: theme.spacing(2, 2, 1.5),
  },
  sectionHeaderTitle: {
    gridArea: 'title',
    color: theme.palette.primary.contrastText,
    fontSize: '20px',
    fontWeight: '400',
  },
  sectionHeaderIcons: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridTemplateRows: '1fr',
    gridColumnGap: theme.spacing(4),
    gridArea: 'icons',
    textAlign: 'right',
  },
  sectionItemContent: {
    background: theme.palette.card.background,
    borderBottomRightRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    color: theme.palette.card.color,
    padding: theme.spacing(2, 2.5),
  },
  sectionItemContainer: {
    background: theme.palette.card.list.border,
    display: 'grid',
    gridAutoRows: `minmax(${theme.spacing(6)}px, min-content)`,
    gridAutoColumns: '100%',
    gridAutoFlow: 'row',
    gridRowGap: '1px',
  },
  sectionItem: {
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
  withSectionItemSubtitle: {
    gridRowGap: theme.spacing(2),
    gridTemplateRows: 'min-content min-content',
    gridTemplateAreas: '"title ." "subtitle icon"',
    alignContent: 'space-between',
  },
  sectionItemTitle: {
    display: 'grid',
    gridArea: 'title',
    gridTemplateColumns: 'auto auto',
    gridTemplateAreas: '"description prize"',
    fontSize: '19px',
    fontWeight: '500',
  },
  sectionItemDescription: {
    gridArea: 'description',
  },
  sectionItemPrize: {
    gridArea: 'prize',
    color: theme.palette.primary.main,
    textAlign: 'right',
  },
  sectionItemSubtitle: {
    gridArea: 'subtitle',
    fontSize: '12px',
    color: 'red',
    fontWeight: '300',
  },
}));

export const MenuAddSection = props => {
  const classes = useStyles(props);
  const { section, onEditSectionClick, onDeleteSectionClick } = props;

  const handleEditOnClick = useCallback(() => {
    onEditSectionClick();
  }, [onEditSectionClick]);

  const handleDeleteOnClick = useCallback(
    event => {
      console.log('handleDeleteOnClick:', event.target.value);
      onDeleteSectionClick();
    },
    [onDeleteSectionClick],
  );

  return (
    <div>
      <div className={classes.sectionHeaderDetails}>
        <div className={classes.sectionHeaderTitle}>{section.name}</div>
        <div className={classes.sectionHeaderIcons}>
          <div onClick={handleDeleteOnClick}>
            <Icon name="IconEdit2" paletteColor="swipeable.delete" size="20" />
          </div>
          <div onClick={handleDeleteOnClick}>
            <Icon name="IconPlusSign" paletteColor="swipeable.delete" size="20" />
          </div>
          <div onClick={handleDeleteOnClick}>
            <Icon name="IconBin" paletteColor="swipeable.delete" size="20" />
          </div>
        </div>
      </div>
      {!!section && !!section.items && section.items.length > 0 ? (
        <div>
          <div className={classes.sectionItemContent}>
            <div className={classes.sectionItemContainer}>
              {section.items.map(b => (
                <div
                  className={clsx(classes.sectionItem, classes.withSectionItemSubtitle)}
                  onClick={handleEditOnClick}
                  key={'item-' + b.id}
                >
                  <div className={classes.sectionItemTitle}>
                    <div className={classes.sectionItemDescription}>{b.name}</div>
                    <div className={classes.sectionItemPrize}>{b.price}</div>
                  </div>
                  <div className={classes.sectionItemSubtitle}>{b.ingredients}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <EmptyContent locale={i18n._('No Items defined.')} responsive></EmptyContent>
      )}
    </div>
  );
};
