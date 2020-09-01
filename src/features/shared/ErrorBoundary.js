// import { Trans } from '@lingui/macro';
import { i18n } from '@common/i18n-loader';
import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });

    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <p>{i18n._('Something went wrong, please refresh.')}</p>
          <a href="/">{i18n._('Back to home')}</a>
        </div>
      );
    }
    return this.props.children;
  }
}
