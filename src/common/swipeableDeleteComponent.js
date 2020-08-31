import { Icon } from '@common/icon';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(theme => ({
  deleteContainer: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas: '"delete ."',
    background: theme.palette.swipeable.delete.background,
    placeItems: 'center',
    borderRadius: '10px',
    position: 'absolute',
    top: '0',
    left: '0',
  },
  deleteIcon: {
    gridArea: 'delete',
  },
}));

export const SwipeableDeleteComponent = props => {
  const classes = useStyles(props);
  const { defaultStyle } = props;

  return (
    <div className={classes.deleteContainer} style={defaultStyle}>
      <Icon
        className={classes.deleteIcon}
        name="IconBin"
        paletteColor="swipeable.delete"
        size="28"
      />
    </div>
  );
};
