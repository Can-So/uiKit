// @flow

import React, { type ComponentType, type ElementConfig } from 'react';
import ViewControllerSubscriber from './ViewControllerSubscriber';

export type ViewControllerWrappedComp<C> = ComponentType<
  $Diff<ElementConfig<$Supertype<C>>, { navigationViewController: any }>,
>;

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
