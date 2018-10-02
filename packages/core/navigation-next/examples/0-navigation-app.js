// @flow

import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { Label } from '@atlaskit/field-base';
import { ToggleStateless } from '@atlaskit/toggle';

import { LayoutManagerWithViewController, NavigationProvider } from '../src';

import { DefaultGlobalNavigation, ProjectSwitcher } from './shared/components';

import {
  BacklogView,
  ProjectsView,
  DashboardsView,
  SearchIssuesView,
} from './shared/routes';

export default class App extends Component<
  {},
  {
    isDebugEnabled: boolean,
    isFlyoutAvailable: boolean,
  },
> {
  state = {
    isDebugEnabled: true,
    isFlyoutAvailable: false,
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
          >
            <div style={{ padding: 40 }}>
              <Switch>
                <Route path="/projects/:projectId" component={BacklogView} />
                <Route path="/projects" component={ProjectsView} />
                <Route path="/issues/search" component={SearchIssuesView} />
                <Route path="/" component={DashboardsView} />
              </Switch>
              <Label label="Toggle debug logger" />
              <ToggleStateless
                isChecked={isDebugEnabled}
                onChange={this.onDebugToggle}
              />
              <Label label="Toggle flyout on hover (experimental)" />
              <ToggleStateless
                isChecked={isFlyoutAvailable}
                onChange={this.onFlyoutToggle}
              />
            </div>
          </LayoutManagerWithViewController>
        </NavigationProvider>
      </HashRouter>
    );
  }
}
