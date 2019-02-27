import * as React from 'react';
import * as Sentry from '@sentry/browser';

function withSentry(Child) {
  return class WrappedComponent extends React.Component {
    componentDidMount() {
      /** Add Sentry for non-local envs */
      if (!window.location.href.match(/localhost/)) {
        Sentry.init({
          dsn: 'https://42960988aad146399c6b2954681cfe9f@sentry.io/1376344',
        });
      }
    }

    render() {
      return <Child {...this.props} />;
    }
  };
}

export default withSentry;
