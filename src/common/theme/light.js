import { createMuiTheme } from '@material-ui/core/styles';
import { defaultPalette, buildDefaultOverrides } from './defaultTheme';
import { mergeDeepRight } from 'ramda';

const palette = mergeDeepRight(defaultPalette, {});

export const light = createMuiTheme({
  palette,
  overrides: buildDefaultOverrides(palette),
});
