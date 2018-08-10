import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
const getAtlassianAnalyticsClient = require('./AtlassianAnalytics');
const pkgJson = require('../../../package.json');

let mounted = 0;

const getApdex = location => {
  if (
    !window ||
    !window.performance ||
    !window.performance.timing ||
    !window.performance.timing.domContentLoadedEventEnd ||
    !window.performance.timing.navigationStart
  ) {
    return null;
  }

  let timing =
    window.performance.timing.domContentLoadedEventEnd -
    window.performance.timing.navigationStart;

  let apdex = 0;
  if (timing < 1000) apdex = 100;
  else if (timing < 4000) apdex = 50;

  ReactGA.event({
    category: 'Performance',
    action: 'apdex',
    value: apdex,
    nonInteraction: true,
    label: `seconds:${(timing / 1000).toFixed(1)}`,
  });

  const request = getAtlassianAnalyticsClient({
    version: '-',
  });
  const attributes = {
    apdex: apdex,
    loadTimeInMs: timing,
    path: location.pathname,
  };
  request.addEvent(`atlaskit.website.performance`, attributes);
  request.send();
};

class GoogleAnalyticsListener extends Component {
  static propTypes = {
    children: PropTypes.node,
    gaId: PropTypes.string,
    location: PropTypes.object,
  };
  constructor(props) {
    super(props);
    ReactGA.initialize(props.gaId);
  }

  componentDidMount() {
    window.addEventListener(
      'load',
      () => {
        getApdex(this.props.location);
      },
      { once: true },
    );

    mounted++;
    if (mounted > 1) {
      console.warn(
        'There is more than one GoogleAnalyticsListener on the page, this could cause errors',
      );
    }
    ReactGA.pageview(this.props.location.pathname);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.gaId !== this.props.gaId) {
      console.warn("You can't change the gaId one it has been initialised.");
    }
    if (nextProps.location !== this.props.location) {
      ReactGA.pageview(nextProps.location.pathname);
    }
  }
  componentWillUnmount() {
    mounted--;
  }
  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(GoogleAnalyticsListener);
