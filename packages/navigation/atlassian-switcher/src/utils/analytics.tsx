import * as React from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { createAndFireEvent } from '@atlaskit/analytics-next';

type PropsToContextMapper<P, C> = (props: P) => C;

const NAVIGATION_CHANNEL = 'navigation';

export const createAndFireNavigationEvent = createAndFireEvent(
  NAVIGATION_CHANNEL,
);

export const analyticsAttributes = <T extends object>(attributes: T) => ({
  attributes,
});

export const withAnalyticsContextData = function<P, C>(
  mapPropsToContext: PropsToContextMapper<P, C>,
) {
  return function(
    WrappedComponent: React.ComponentType<P>,
  ): React.ComponentType<P> {
    return props => (
      <NavigationAnalyticsContext data={mapPropsToContext(props)}>
        <WrappedComponent {...props} />
      </NavigationAnalyticsContext>
    );
  };
};

export { NavigationAnalyticsContext };
