const initialState = {
  language: getBrowserLanguage(),
  languages: ['en', 'de', 'fr', 'it'],
  topbar: {
    title: '2Order',
    titlePrimary: true,
    subtitle: '',
    back: false,
  },
  isOnline: false,
  userInfo: {},

  theme: 'light',

  ui: {
    modalDialog: {
      icon: null,
      show: false,
      title: '',
      message: '',
      time: null,
    },
    modalActions: {
      icon: null,
      show: false,
      title: '',
      message: '',
      actions: [],
    },
  },
};

export default initialState;

function getBrowserLanguage() {
  const browserLanguage = navigator.language || navigator.userLanguage;

  // TODO: find some utility to convert from culture to language safely
  switch (browserLanguage) {
    case 'it-IT':
    case 'it-CH':
      return 'it';
    case 'fr-FR':
    case 'fr-CH':
      return 'fr';
    case 'en-EN':
    case 'en-US':
      return 'en';
    case 'de-DE':
    case 'de-CH':
    default:
      return 'de';
  }
}
