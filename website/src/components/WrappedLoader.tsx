import Loadable from 'react-loadable';
import * as React from 'react';
import { Component } from 'react';
import { sendApdex } from './Analytics/GoogleAnalyticsListener';

interface LoadingComponentProps {
  isLoading: boolean;
  pastDelay: boolean;
  timedOut: boolean;
  error: any;
  retry: () => void;
}

function checkMarkAndSendAnalytics() {
  if (!performance.mark) {
    return null;
  }

  // We mark before doing anything because speed matters here
  performance.mark('loaded');
  let [navigate, loaded] = performance
    .getEntriesByType('mark')
    .filter(
      match => match.name.includes('navigate-') || match.name === 'loaded',
    );

  if (navigate && loaded) {
    performance.measure('analytics-measure', navigate.name, 'loaded');

    let entries = performance.getEntriesByName('analytics-measure', 'measure');
    if (entries.length === 1 && entries[0].duration) {
      sendApdex(
        navigate.name.replace('navigate-', ''),
        Math.round(entries[0].duration),
      );
    }
  }

  performance.clearMarks();
  performance.clearMeasures();
  return null;
}

class Wrapper extends Component {
  componentDidMount() {
    checkMarkAndSendAnalytics();
  }
  render() {
    return this.props.children;
  }
}
const WrappedLoadable = ({
  render,
  ...rest
}: {
  render: (args: {}) => React.ReactChild;
  loader: () => Promise<string> | null;
  loading: React.ComponentType<LoadingComponentProps> | (() => null);
}) =>
  // @ts-ignore //TODO: Need help to type Loadable
  Loadable({
    ...rest,
    render: args => <Wrapper>{render(args)}</Wrapper>,
  });

export default WrappedLoadable;
