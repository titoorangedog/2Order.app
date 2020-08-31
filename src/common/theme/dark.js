import { createMuiTheme } from '@material-ui/core/styles';
import { buildDefaultOverrides, defaultPalette } from './defaultTheme';
import { mergeDeepRight } from 'ramda';

const palette = mergeDeepRight(defaultPalette, {
  background: defaultPalette.grey.A400,
  icons: {
    default: defaultPalette.common.white,
    topbar: {
      profile: defaultPalette.primary.main,
    },
    input: {
      empty: defaultPalette.grey[500],
    },
    swipeable: {
      delete: defaultPalette.common.white,
      undo: defaultPalette.common.white,
    },
  },
  topbar: {
    title: defaultPalette.grey[200],
    subtitle: defaultPalette.grey[500],
  },
  emptyContent: {
    color: defaultPalette.grey[200],
  },
  dialog: {
    background: defaultPalette.grey[800],
    color: defaultPalette.common.white,
  },
  card: {
    background: defaultPalette.grey[900],
    color: defaultPalette.common.white,
    border: defaultPalette.primary.main,
    list: {
      border: defaultPalette.grey[500],
    },
    data: {
      header: {
        color: defaultPalette.common.white,
      },
    },
  },
  form: {
    section: {
      title: defaultPalette.grey[200],
      background: defaultPalette.grey[800],
    },
  },
  button: {
    disabled: {
      background: defaultPalette.grey[800],
      color: defaultPalette.grey[500],
    },
  },
  input: {
    error: defaultPalette.error.main,
    border: defaultPalette.grey[500],
    label: {
      color: defaultPalette.grey[500],
    },
    select: {
      background: defaultPalette.grey[900],
      color: defaultPalette.grey[200],
    },
    text: {
      color: defaultPalette.grey[200],
    },
    search: {
      background: defaultPalette.grey[800],
      text: {
        placeholder: defaultPalette.grey[100],
        content: defaultPalette.grey[100],
      },
      hover: {
        background: defaultPalette.grey[700],
      },
    },
  },
  swipeable: {
    delete: {
      background: defaultPalette.error.main,
    },
    undo: {
      background: defaultPalette.grey[700],
      color: defaultPalette.common.white,
      spinner: defaultPalette.common.white,
      progressBar: {
        background: 'rgba(0,0,0,0.1)',
        active: 'rgba(255,255,255,0.5)',
      },
    },
  },
});

export const dark = createMuiTheme({
  palette,
  overrides: buildDefaultOverrides(palette),
});
