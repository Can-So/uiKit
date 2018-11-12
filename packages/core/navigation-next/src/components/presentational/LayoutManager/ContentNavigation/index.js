// @flow

import React, { Component, Fragment } from 'react';
import Transition from 'react-transition-group/Transition';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';

import { transitionDurationMs } from '../../../../common/constants';
import { ContainerNavigation, ProductNavigation } from './primitives';
import type { ContentNavigationProps } from './types';

export default class ContentNavigation extends Component<ContentNavigationProps> {
  isMounted = false;

  componentDidMount() {
    this.isMounted = true;
  }

  render() {
    const { container: Container, isVisible, product: Product } = this.props;

    return (
      <Fragment>
        <ProductNavigation>
          {isVisible ? (
            <NavigationAnalyticsContext
              data={{ attributes: { navigationLayer: 'product' } }}
            >
              <Product />
            </NavigationAnalyticsContext>
          ) : null}
        </ProductNavigation>
        <Transition
          in={!!Container}
          timeout={this.isMounted ? transitionDurationMs : 0}
          mountOnEnter
          unmountOnExit
        >
          {state => (
            <ContainerNavigation
              isEntering={state === 'entering'}
              isExiting={state === 'exiting'}
            >
              <NavigationAnalyticsContext
                data={{ attributes: { navigationLayer: 'container' } }}
              >
                <Fragment>
                  {isVisible && Container ? <Container /> : null}
                </Fragment>
              </NavigationAnalyticsContext>
            </ContainerNavigation>
          )}
        </Transition>
      </Fragment>
    );
  }
}
