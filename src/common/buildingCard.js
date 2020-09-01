import { SpinnerContent } from '@features/shared/SpinnerContent';
// import { Trans } from '@lingui/macro';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { Icon } from '@common/icon';

const useStyles = makeStyles(theme => ({
  building: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'auto',
    gridTemplateAreas: '"content"',
    borderRadius: '12px',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.02)',
    userSelect: 'none',
  },
  menuWithHighlight: {
    gridTemplateColumns: '6px auto',
    gridTemplateAreas: '"borderleft content"',
  },
  menuBorder: {
    gridArea: 'borderleft',
    backgroundColor: theme.palette.card.border,
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
  },
  menuContent: {
    backgroundColor: theme.palette.card.background,
    color: theme.palette.card.color,
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    gridArea: 'content',
    display: 'grid',
    gridTemplateRows: '1fr 1.5fr',
    gridTemplateColumns: 'auto',
    gridTemplateAreas: '"title" "address"',
    gridRowGap: theme.spacing(0.5),
    alignItems: 'center',
    padding: theme.spacing(1, 1.5),
  },
  menuFullBorderRadius: {
    borderRadius: 'inherit',
  },
  menuWithDownload: {
    gridTemplateColumns: '4fr 1fr',
    gridTemplateAreas: '"title download" "address download"',
    gridColumnGap: theme.spacing(0.5),
  },
  menuWithData: {
    gridTemplateRows: '1fr 1.5fr 1fr',
    gridTemplateAreas: '"title" "address" "data"',
  },
  menuTitle: {
    gridArea: 'title',
    fontSize: '15px',
    fontWeight: '600',
  },
  menuDatas: {
    gridArea: 'data',
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'min-content min-content',
    gridColumnGap: theme.spacing(3),
  },
  menuDataHeader: {
    color: theme.palette.card.data.header.color,
    fontSize: '10px',
    whiteSpace: 'nowrap',
  },
  menuDataContent: {
    fontSize: '11px',
    fontWeight: '400',
    whiteSpace: 'nowrap',
  },
  menuDownloadContainer: {
    gridArea: 'download',
  },
}));

export const BuildingCard = props => {
  const classes = useStyles(props);
  const {
    menu,
    menuId,
    menuName,
    onClick,
    // withHighlight,
    // isDownloaded,
    // isDownloadable,
    // withData,
    isBusy,
  } = props;

  const handleClick = useCallback(() => {
    onClick(props.menu);
  }, [props.menu, onClick]);

  return (
    <SpinnerContent show={isBusy}>
      <div className={clsx(classes.building)} onClick={!!handleClick && handleClick}>
        <div className={clsx(classes.menuContent, classes.menuBorder)}>
          <div className={classes.menuTitle}>
            {menuId} - {menuName}
          </div>

          {/* {!!isDownloadable && !isDownloaded && (
            <div className={classes.menuDownloadContainer}>
              <IconButton
                color="primary"
                aria-label="download"
                className={classes.buildingDownload}
                // onClick={handleDownload}
              >
                <Icon name="IconDownload1" size="16" />
              </IconButton>
            </div>
          )} */}
        </div>
      </div>
    </SpinnerContent>
  );
};
