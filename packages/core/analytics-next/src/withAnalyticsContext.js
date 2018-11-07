// @flow

import React, { type ComponentType, type ElementConfig } from 'react';

import AnalyticsContext from './AnalyticsContext';

type WithAnalyticsContextProps = {|
  analyticsContext?: {},
|};

type PropsWithAnalytics<C> = {
  ...$Exact<WithAnalyticsContextProps>,
  ...$Exact<ElementConfig<$Supertype<C>>>,
};

export default function withAnalyticsContext<P: {}, C: ComponentType<P>>(
  defaultData: {} = {},
): C => ComponentType<PropsWithAnalytics<C>> {
  return (WrappedComponent: C): ComponentType<PropsWithAnalytics<C>> => {
    // $FlowFixMe - flow 0.67 doesn't know about forwardRef
    const WithAnalyticsContext = React.forwardRef((props: PWA, ref) => {
      const { analyticsContext = {}, ...others } = props;
      const data = { ...defaultData, ...analyticsContext };
      return (
        <AnalyticsContext data={data}>
          <WrappedComponent {...others} ref={ref} />
        </AnalyticsContext>
      );
    });

    WithAnalyticsContext.displayName = `WithAnalyticsContext(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    return WithAnalyticsContext;
  };
}
