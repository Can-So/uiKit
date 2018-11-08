// @flow

import React, { type ComponentType, type ElementConfig } from 'react';
import UIControllerSubscriber from './UIControllerSubscriber';

export type UIControllerWrappedComp<C> = ComponentType<
  $Diff<ElementConfig<$Supertype<C>>, { navigationUIController: any }>,
>;

export default <P: {}, C: ComponentType<P>>(
  WrappedComponent: C,
): UIControllerWrappedComp<C> => {
  const WithNavigationUI = (props: *) => (
    <UIControllerSubscriber>
      {navigationUIController => (
        <WrappedComponent
          navigationUIController={navigationUIController}
          {...props}
        />
      )}
    </UIControllerSubscriber>
  );

  WithNavigationUI.displayName = `WithNavigationUI(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return WithNavigationUI;
};
