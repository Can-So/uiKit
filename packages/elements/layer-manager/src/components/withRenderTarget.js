// @flow
import React, { Component, type ComponentType } from 'react';
import PropTypes from 'prop-types';

import { Gateway, GatewayRegistry } from './gateway';
import Portal from './Portal';
import withContextFromProps from './withContextFromProps';

type Props = {
  target: string,
  withTransitionGroup: boolean,
};

export default function withRenderTarget(
  { target, withTransitionGroup }: Props,
  WrappedComponent: ComponentType<*>,
) {
  // Access the analytics context types so we can provide them across portal boundaries
  // until we can support React 16 where it can be provided natively
  const analyticsContextTypes = {
    onAnalyticsEvent: PropTypes.func,
    getParentAnalyticsData: PropTypes.func,
  };

  const ContextProvider = withContextFromProps(analyticsContextTypes, null);

  // eslint-disable-next-line react/prefer-stateless-function
  return class extends Component<Props> {
    static contextTypes = {
      gatewayRegistry: PropTypes.instanceOf(GatewayRegistry),
      ...analyticsContextTypes,
    };

    render() {
      const { gatewayRegistry, ...analyticsContext } = this.context;
      const GatewayOrPortal = gatewayRegistry ? Gateway : Portal;

      return (
        <GatewayOrPortal
          into={target}
          withTransitionGroup={withTransitionGroup}
        >
          <ContextProvider {...analyticsContext}>
            <WrappedComponent {...this.props} />
          </ContextProvider>
        </GatewayOrPortal>
      );
    }
  };
}
