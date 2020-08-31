import { connect } from 'react-redux';
import { setupI18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { selectLanguage } from '../features/shared/redux/selectors';

import { SpinnerIcon } from './spinnerIcon';
import React from 'react';

export const i18n = setupI18n();

class I18nLoaderComponent extends React.Component {
  state = {
    catalogs: {},
  };

  loadCatalog = async language => {
    const catalog = await import(
      /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `../locales/${language}/messages.js`
    );

    this.setState(state => {
      i18n.load({
        [language]: catalog,
      });
      i18n.activate(language);

      return {
        catalogs: {
          ...state.catalogs,
          [language]: catalog,
        },
      };
    });
  };

  componentDidMount() {
    const { language } = this.props;
    this.loadCatalog(language);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { language } = nextProps;
    const { catalogs } = nextState;

    if (language !== this.props.language && !catalogs[language]) {
      this.loadCatalog(language);
      return false;
    }

    return true;
  }

  render() {
    const { children, language } = this.props;
    const { catalogs } = this.state;

    if (!catalogs[language]) return <SpinnerIcon />;

    return (
      <I18nProvider i18n={i18n} language={language}>
        {children}
      </I18nProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: selectLanguage(state),
  };
}

export const I18nLoader = connect(mapStateToProps)(I18nLoaderComponent);
