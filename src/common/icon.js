import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { icons, componentsIcons } from './icons';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core';

const getColorFromPalette = (paletteColor, paletteIcons) => {
  if (!!paletteColor) {
    const color = paletteColor
      .split('.')
      .reduce((page, icon) => !!page[icon] && page[icon], paletteIcons);
    if (!!color) {
      return color;
    }
  }

  return paletteIcons.default;
};

const useStyles = makeStyles(theme => ({
  container: ({ responsive, size, padding }) => ({
    width: !!responsive ? '100%' : size,
    height: !!responsive ? '100%' : size,
    display: 'grid',
    placeItems: !!responsive ? 'center' : '',
    padding: padding,
  }),
  icon: ({ size, vAlign }) => ({
    width: size,
    height: size,
    verticalAlign: vAlign,
  }),
}));

export const Icon = props => {
  const { name, type, size, responsive, padding, vAlign, paletteColor, className } = props;
  const theme = useTheme();

  const validatedProps = {
    ...props,
    responsive: !!responsive ? true : false,
    size: !!size ? size + (!size.includes('px') ? 'px' : '') : '18px',
    padding: !!padding ? padding + (!padding.includes('px') ? 'px' : '') : '0',
    vAlign: !!vAlign ? vAlign : 'middle',
    paletteColor: !!paletteColor ? paletteColor : 'default',
  };
  const classes = useStyles(validatedProps);
  let CurrentIcon = null;

  if (!!type && type === 'component') {
    CurrentIcon = componentsIcons[name];
  } else {
    CurrentIcon = icons[name];
  }
  if (!CurrentIcon) {
    CurrentIcon = componentsIcons[1];
  }

  return (
    <div className={clsx(classes.container, className)}>
      <CurrentIcon
        className={classes.icon}
        fill={getColorFromPalette(paletteColor, theme.palette.icons)}
      />
    </div>
  );
};
