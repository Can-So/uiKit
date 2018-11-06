// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';
import { Label } from '@atlaskit/field-base';
import { ToggleStateless } from '@atlaskit/toggle';

import {
  LayoutManagerWithViewController,
  NavigationProvider,
  SkeletonContainerView,
} from '../src';

import { DefaultGlobalNavigation, ProjectSwitcher } from './shared/components';
import RootViews from './shared/views/root';
import ContainerViews from './shared/views/container';

import {
  BacklogView,
  ProjectsView,
  DashboardsView,
  SearchIssuesView,
} from './shared/routes';

const ProductSkeleton = () => <SkeletonContainerView type="product" />;

const preloadProductNavigationComponent = import('./shared/components/ProductNavigation');
const preloadPageContentComponent = import('./shared/components/PageContent');

const AsyncProductNavigation = asyncComponent({
  resolve: () =>
    preloadProductNavigationComponent.then(({ default: ProductNavigation }) => {
      return new Promise(resolve => {
        setTimeout(() => {
          return resolve(ProductNavigation);
        }, 2000);
      });
    }),
  LoadingComponent: () => <ProductSkeleton />,
});

const AsyncContent = asyncComponent({
  resolve: () =>
    preloadPageContentComponent.then(({ default: Content }) => {
      return new Promise(resolve => {
        setTimeout(() => {
          return resolve(Content);
        }, 5000);
      });
    }),
  LoadingComponent: () => <div>...You will add your page skeleton here...</div>,
});

export default class App extends Component<
  {},
  {
    isDebugEnabled: boolean,
    isFlyoutAvailable: boolean,
  },
> {
  state = {
    isDebugEnabled: true,
    isFlyoutAvailable: true,
  };

  onDebugToggle = () => {
    this.setState(state => ({ isDebugEnabled: !state.isDebugEnabled }));
  };
  onFlyoutToggle = () => {
    this.setState(state => ({ isFlyoutAvailable: !state.isFlyoutAvailable }));
  };

  render() {
    const { isDebugEnabled, isFlyoutAvailable } = this.state;

    return (
      <HashRouter>
        <NavigationProvider
          initialPeekViewId="root/index"
          isDebugEnabled={isDebugEnabled}
        >
          <LayoutManagerWithViewController
            customComponents={{ ProjectSwitcher }}
            experimental_flyoutOnHover={isFlyoutAvailable}
            globalNavigation={DefaultGlobalNavigation}
            containerSkeleton={SkeletonContainerView}
          >
            <div style={{ padding: 40 }}>
              <RootViews />
              <ContainerViews />
              <Switch>
                <Route path="/projects/:projectId" component={BacklogView} />
                <Route path="/projects" component={ProjectsView} />
                <Route path="/issues/search" component={SearchIssuesView} />
                <Route path="/" component={DashboardsView} />
              </Switch>

              <p>
                The search drawer can be opened via the <kbd>/</kbd> keyboard
                shortcut.
              </p>
              <Label label="Toggle flyout on hover (experimental)" />
              <ToggleStateless
                isChecked={isFlyoutAvailable}
                onChange={this.onFlyoutToggle}
              />
              <Label label="Toggle debug logger" />
              <ToggleStateless
                isChecked={isDebugEnabled}
                onChange={this.onDebugToggle}
              />
            </div>
          </LayoutManagerWithViewController>
        </NavigationProvider>
      </HashRouter>
    );
  }
}
