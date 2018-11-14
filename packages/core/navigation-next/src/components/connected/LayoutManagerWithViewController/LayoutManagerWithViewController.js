// @flow

import React, { Component, Fragment } from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';

import ViewRenderer from '../../../renderer';
import { withNavigationUI } from '../../../ui-controller';
import { ViewControllerSubscriber } from '../../../view-controller';
import LayoutManager from '../../presentational/LayoutManager';
import SkeletonContainerView from '../../presentational/SkeletonContainerView';
import type {
  LayoutManagerWithViewControllerProps,
  LayoutManagerWithViewControllerState,
} from './types';
import LayerInitialised from './LayerInitialised';
import {
  ProductNavigationTheme,
  ContainerNavigationTheme,
} from '../../presentational/LayoutManager/ContentNavigation/primitives';

/* NOTE: experimental props use an underscore */
/* eslint-disable camelcase */

class LayoutManagerWithViewControllerBase extends Component<
  LayoutManagerWithViewControllerProps,
  LayoutManagerWithViewControllerState,
> {
  state = {
    hasInitialised: false,
    outgoingView: null,
  };

  constructor(props: LayoutManagerWithViewControllerProps) {
    super(props);
    this.renderContainerNavigation.displayName = 'ContainerNavigationRenderer';
    this.renderProductNavigation.displayName = 'ProductNavigationRenderer';
  }

  componentDidUpdate(prevProps: LayoutManagerWithViewControllerProps) {
    const { view } = this.props;
    const { view: prevView } = prevProps;

    if (!view || !prevView) {
      return;
    }

    // If we're moving from a product to a container view or vice versa we cache
    // the previous view so that we can still render it during the transition.
    if (view.type !== prevView.type) {
      // It's totally fine to setState in componentDidUpdate as long as it's
      // wrapped in a condition:
      // https://reactjs.org/docs/react-component.html#componentdidupdate
      // eslint-disable-next-line
      this.setState({ outgoingView: prevView });
    }
  }

  onInitialised = () => {
    this.setState({
      hasInitialised: true,
    });
  };

  renderSkeleton = () => {
    const { firstSkeletonToRender } = this.props;
    let Wrapper;

    if (firstSkeletonToRender === 'product' && !this.state.hasInitialised) {
      Wrapper = ProductNavigationTheme;
    } else if (
      firstSkeletonToRender === 'container' &&
      !this.state.hasInitialised
    ) {
      Wrapper = ContainerNavigationTheme;
    } else {
      Wrapper = Fragment;
    }

    return (
      <Wrapper>
        <SkeletonContainerView />
      </Wrapper>
    );
  };

  renderContainerNavigation = () => {
    const { firstSkeletonToRender, view } = this.props;
    const { outgoingView } = this.state;

    if (view && view.type === 'container') {
      return this.renderView(view);
    }

    if (outgoingView && outgoingView.type === 'container') {
      return this.renderView(outgoingView);
    }

    if (
      !view &&
      firstSkeletonToRender === 'container' &&
      !this.state.hasInitialised
    ) {
      return this.renderSkeleton();
    }

    return firstSkeletonToRender !== 'container' ? null : this.renderSkeleton();
  };

  renderGlobalNavigation = () => {
    const { globalNavigation: GlobalNavigation, view } = this.props;
    const { hasInitialised } = this.state;

    /* We are embedding the LayerInitialised analytics component within global navigation so that
     * the event it fires can access the analytics context within LayerManager. The component
     * cannot be rendered directly within LayerManager since it needs access to view data which
     * only exists in LayoutManagerWithViewController. */
    return (
      <Fragment>
        <GlobalNavigation />
        <LayerInitialised
          activeView={view}
          initialised={hasInitialised}
          onInitialised={this.onInitialised}
        />
      </Fragment>
    );
  };

  renderProductNavigation = () => {
    const { view } = this.props;
    const { outgoingView } = this.state;

    if (view && view.type === 'product') {
      return this.renderView(view);
    }

    // If we're transitioning from a product view to a container view still
    // render the outgoing product view.
    if (
      view &&
      view.type === 'container' &&
      outgoingView &&
      outgoingView.type === 'product'
    ) {
      return this.renderView(outgoingView);
    }

    return this.renderSkeleton();
  };

  renderView(view) {
    const { customComponents } = this.props;
    return (
      <ViewRenderer customComponents={customComponents} items={view.data} />
    );
  }

  render() {
    const {
      children,
      experimental_flyoutOnHover,
      firstSkeletonToRender,
      onExpandStart,
      onExpandEnd,
      onCollapseStart,
      onCollapseEnd,
      getRefs,
      view,
    } = this.props;

    const shouldRenderContainerLayer =
      (view && view.type === 'container') ||
      (!view &&
        firstSkeletonToRender === 'container' &&
        !this.state.hasInitialised);

    return (
      <NavigationAnalyticsContext
        data={{
          attributes: {
            navigationLayer: view && view.type,
            view: view && view.id,
            ...(view && view.analyticsAttributes),
          },
        }}
      >
        <LayoutManager
          globalNavigation={this.renderGlobalNavigation}
          containerNavigation={
            shouldRenderContainerLayer ? this.renderContainerNavigation : null
          }
          experimental_flyoutOnHover={experimental_flyoutOnHover}
          productNavigation={this.renderProductNavigation}
          onExpandStart={onExpandStart}
          onExpandEnd={onExpandEnd}
          onCollapseStart={onCollapseStart}
          onCollapseEnd={onCollapseEnd}
          getRefs={getRefs}
        >
          {children}
        </LayoutManager>
      </NavigationAnalyticsContext>
    );
  }
}

const LayoutManagerWithViews = props => (
  <ViewControllerSubscriber>
    {({ state: { activeView } }) => {
      return (
        <LayoutManagerWithViewControllerBase view={activeView} {...props} />
      );
    }}
  </ViewControllerSubscriber>
);

export default withNavigationUI(LayoutManagerWithViews);
