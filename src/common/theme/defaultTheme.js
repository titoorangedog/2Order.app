import { createMuiTheme } from '@material-ui/core';
import { mergeDeepRight } from 'ramda';

const defaultTheme = createMuiTheme();

export const generalPalette = {
  primary: {
    main: '#397FF7',
    contrastText: '#fff',
  },
  secondary: {
    main: '#FF7676',
    contrastText: '#fff',
  },
  common: {
    white: '#fff',
    black: '#000',
    azure: '#ff5555',
  },
  error: {
    main: '#ff5555',
    contrastText: '#fff',
  },
  success: {
    main: '#00ff00',
    contrastText: '#fff',
  },
  warning: {
    main: '#ffa500',
    contrastText: '#000',
  },
  danger: {
    main: '#ff5555',
    contrastText: '#fff',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    A100: '#d5d5d5',
    A200: '#aaaaaa',
    A400: '#303030',
    A700: '#616161',
  },
};

export const defaultPalette = mergeDeepRight(generalPalette, {
  background: generalPalette.grey[100],
  icons: {
    default: generalPalette.common.black,
    topbar: {
      back: generalPalette.primary.main,
      profile: generalPalette.primary.main,
    },
    input: {
      empty: generalPalette.grey[800],
    },
    button: {
      primary: generalPalette.common.white,
      secondary: generalPalette.primary.main,
    },
    actionBar: {
      default: generalPalette.common.white,
    },
    modal: {
      default: generalPalette.common.white,
    },
    building: {
      inspection: {
        goTo: generalPalette.common.black,
      },
      components: generalPalette.common.black,
    },
    swipeable: {
      delete: generalPalette.common.white,
      undo: generalPalette.common.black,
    },
  },
  topbar: {
    title: generalPalette.common.black,
    subtitle: generalPalette.common.black,
  },
  emptyContent: {
    color: generalPalette.grey[500],
  },
  dialog: {
    background: generalPalette.grey[800],
    color: generalPalette.common.white,
    footer: {
      border: 'rgba(255,255,255,0.75)',
    },
  },
  card: {
    background: generalPalette.common.white,
    selectedBackground: generalPalette.common.white,
    color: generalPalette.common.black,
    border: generalPalette.primary.main,
    list: {
      border: generalPalette.grey[200],
    },
    data: {
      header: {
        color: generalPalette.grey[400],
      },
    },
  },
  form: {
    section: {
      title: generalPalette.grey[400],
      background: generalPalette.common.white,
    },
  },
  button: {
    disabled: {
      background: generalPalette.grey[500],
      color: generalPalette.grey[200],
    },
  },
  input: {
    error: generalPalette.error.main,
    border: generalPalette.grey[200],
    label: {
      color: generalPalette.grey[500],
    },
    select: {
      background: generalPalette.common.white,
      color: generalPalette.grey[900],
    },
    text: {
      color: generalPalette.common.black,
    },
    search: {
      background: generalPalette.grey[400],
      text: {
        placeholder: generalPalette.grey[900],
        content: generalPalette.grey[900],
      },
      hover: {
        background: generalPalette.grey[300],
      },
    },
  },
  actionBar: {
    menu: {
      background: generalPalette.primary.main,
      color: generalPalette.common.white,
      divider: generalPalette.common.white,
      open: {
        button: {
          background: generalPalette.common.white,
          border: generalPalette.primary.main,
        },
      },
    },
    button: {
      background: generalPalette.primary.main,
      color: generalPalette.common.white,
      border: generalPalette.primary.main,
    },
  },
  swipeable: {
    delete: {
      background: generalPalette.error.main,
    },
    undo: {
      background: generalPalette.grey[300],
      color: generalPalette.common.primary,
      spinner: generalPalette.common.primary,
      progressBar: {
        background: 'rgba(0,0,0,0.1)',
        active: 'rgba(0,0,0,0.3)',
      },
    },
  },
  constructionElements: {
    category: {
      background: `rgba(57, 127, 247, 0.2)`,
    },
    element: {
      icon: {
        background: generalPalette.common.white,
      },
      name: {
        color: generalPalette.common.black,
      },
    },
  },
});

export const buildDefaultOverrides = (palette, extraOverrides = {}) => ({
  MuiButton: {
    root: {
      borderRadius: '32px',
      fontSize: '13px',
      fontWeight: '400',
      textTransform: 'none',
      padding: defaultTheme.spacing(1, 10),
      transition: 'none',
      '&$disabled': {
        backgroundColor: `${palette.button.disabled.background} !important`,
        color: `${palette.button.disabled.color} !important`,
      },
    },
    contained: {
      boxShadow: 'none !important',
    },
  },
  MuiFab: {
    root: {
      width: defaultTheme.spacing(6),
      height: defaultTheme.spacing(6),
      transition: 'none',
      '&:hover': {
        background: 'none',
      },
      '&:active': {
        background: 'none',
      },
    },
  },
  MuiIconButton: {
    root: {
      padding: defaultTheme.spacing(0.5),
      color: palette.primary.main,
    },
  },
  MuiSvgIcon: {
    root: { width: '22px', height: '22px' },
  },
  MuiDialog: {
    paper: {
      backgroundColor: palette.dialog.background,
      color: palette.dialog.color,
    },
  },
  MuiBackdrop: {
    root: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  },
  MuiBottomNavigationAction: {
    root: {
      maxWidth: 'none',
      padding: '8px 12px 8px',
      borderTop: `1px solid ${palette.dialog.footer.border}`,
      '&:not(:last-child)': {
        borderRight: `1px solid ${palette.dialog.footer.border}`,
      },
    },
  },
  MuiListItem: {
    root: {
      '&.Mui-selected, &.Mui-selected:hover': {
        backgroundColor: 'rgba(0,0,0,0.16)',
      },
    },
  },
  MuiPopover: {
    paper: {
      backgroundColor: palette.input.select.background,
      color: palette.input.select.color,
    },
  },
  MuiInput: {
    root: {
      height: '100%',
    },
    underline: {
      '&:before': {
        borderBottom: `1px solid ${palette.input.border}`,
      },
    },
    input: {
      textAlign: 'end',
      fontSize: '14px',
      color: palette.input.text.color,
    },
    formControl: {
      marginTop: '0 !important',
    },
  },
  MuiInputAdornment: {
    root: {
      height: 'inherit',
      maxHeight: 'none',
      whiteSpace: 'nowrap',
      fontSize: '14px',
      color: palette.input.label.color,
    },
  },
  MuiInputLabel: {
    root: {
      whiteSpace: 'nowrap',
      fontSize: '14px',
      color: palette.input.label.color,
    },
    formControl: {
      transform: 'translate(0, 8px) scale(1)',
    },
  },
  MuiSelect: {
    select: {
      color: palette.input.select.color,
      '&:focus': {
        backgroundColor: 'none',
      },
    },
  },
  ...extraOverrides,
});
