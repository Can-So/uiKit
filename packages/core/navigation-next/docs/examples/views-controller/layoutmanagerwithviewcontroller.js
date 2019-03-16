// @flow

import React, { Component } from 'react';
import GlobalNavigation from '@findable/global-navigation';
import { JiraIcon } from '@findable/logo';
import {
  LayoutManagerWithViewController,
  NavigationProvider,
} from '../../../src';

const MyGlobalNavigation = () => (
  <GlobalNavigation
    productIcon={() => <JiraIcon size="medium" />}
    onProductClick={() => {}}
    productTooltip="Jira"
  />
);

export default class App extends Component<{}> {
  render() {
    return (
      <NavigationProvider>
        <LayoutManagerWithViewController globalNavigation={MyGlobalNavigation}>
          <div css={{ padding: 30 }}>Page content goes here.</div>
        </LayoutManagerWithViewController>
      </NavigationProvider>
    );
  }
}
