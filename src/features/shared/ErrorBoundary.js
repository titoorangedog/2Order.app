import { Trans } from '@lingui/macro';
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
          <p>
            <Trans>Something went wrong, please refresh.</Trans>.
          </p>
          <a href="/">
            <Trans>Back to home</Trans>
          </a>
        </div>
      );
    }
    return this.props.children;
  }
}
