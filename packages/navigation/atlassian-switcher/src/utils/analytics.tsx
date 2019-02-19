import * as React from 'react';
import { AnalyticsContext } from '@atlaskit/analytics-next';

export interface WithAnalyticsSubject {
  actionSubject: string;
}

export interface WithAnalyticsSubjectId {
  actionSubjectId: string;
}

type PropsToContextMapper<P, C> = (props: P) => C;

export const withAnalyticsContextData = function<P, C>(
  mapPropsToContext: PropsToContextMapper<P, C>,
) {
  return function(
    WrappedComponent: React.ComponentType<P>,
  ): React.ComponentType<P> {
    return props => (
      <AnalyticsContext data={mapPropsToContext(props)}>
        <WrappedComponent {...props} />
      </AnalyticsContext>
    );
  };
};

export { AnalyticsContext };
