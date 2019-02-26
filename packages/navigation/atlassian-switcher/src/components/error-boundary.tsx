import * as React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <h2>Oops...</h2>
          <p>Something went wrong.</p>
        </React.Fragment>
      );
    }

    return this.props.children;
  }
}
