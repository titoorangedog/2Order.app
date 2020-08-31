import { routerActions } from 'connected-react-router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as actions from './redux/actions';
import { selectTheme } from './redux/selectors';

import { light } from '@common/theme/light';
import { dark } from '@common/theme/dark';

const themes = {
  default: light,
  light,
  dark,
};

const ThemeProviderComponent = props => {
  const { children, theme } = props;

  const [choosedTheme, setChoosedTheme] = useState(themes[theme]);
  useEffect(() => setChoosedTheme(themes[theme]), [theme, setChoosedTheme]);

  return <MuiThemeProvider theme={choosedTheme}>{children}</MuiThemeProvider>;
};

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    theme: selectTheme(state),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...routerActions }, dispatch),
  };
}

export const ThemeProvider = connect(mapStateToProps, mapDispatchToProps)(ThemeProviderComponent);
