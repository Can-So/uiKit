// @flow

import React, { type ComponentType } from 'react';
import ViewControllerSubscriber from './ViewControllerSubscriber';
import type { ViewControllerWrappedComp } from './types';

export default <P: {}, C: ComponentType<P>>(
  WrappedComponent: C,
): ViewControllerWrappedComp<C> => {
  const WithNavigationViewController = (props: *) => (
    <ViewControllerSubscriber>
      {navigationViewController => (
        <WrappedComponent
          navigationViewController={navigationViewController}
          {...props}
        />
      )}
    </ViewControllerSubscriber>
  );

  WithNavigationViewController.displayName = `WithNavigationViewController(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return WithNavigationViewController;
};
