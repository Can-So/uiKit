// @flow

import React, { type ComponentType } from 'react';
import UIControllerSubscriber from './UIControllerSubscriber';
import type { UIControllerWrappedComp } from './types';

export default <P: {}, C: ComponentType<P>>(
  WrappedComponent: C,
): UIControllerWrappedComp<C> => {
  const withNavigationUIController = (props: *) => (
    <UIControllerSubscriber>
      {navigationUIController => (
        <WrappedComponent
          navigationUIController={navigationUIController}
          {...props}
        />
      )}
    </UIControllerSubscriber>
  );

  withNavigationUIController.displayName = `WithNavigationUIController(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

  return withNavigationUIController;
};
