// @flow

import React from 'react';
import GlobalNavigation from '@atlaskit/global-navigation';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import { LayoutManager, NavigationProvider } from '../src';

const MyGlobalNavigation = () => (
  <GlobalNavigation productIcon={AtlassianIcon} onProductClick={() => {}} />
);

export default () => (
  <NavigationProvider>
    <LayoutManager
      globalNavigation={MyGlobalNavigation}
      productNavigation={() => null}
      containerNavigation={() => null}
    >
      <div>Page content goes here.</div>
    </LayoutManager>
  </NavigationProvider>
);
