// @flow

import React, { Fragment } from 'react';
import Button from '@atlaskit/button';
import ChevronLeft from '@atlaskit/icon/glyph/chevron-left';
import ChevronRight from '@atlaskit/icon/glyph/chevron-right';
import { ToggleStateless } from '@atlaskit/toggle';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

import {
  GlobalNav,
  LayoutManager,
  NavigationProvider,
  UIControllerSubscriber,
} from '../src';

const gridSize = gridSizeFn();

const GlobalNavigation = () => (
  <GlobalNav primaryItems={[]} secondaryItems={[]} />
);
const ProductNavigation = () => null;
const ContainerNavigation = () => null;

export default () => (
  <NavigationProvider initialUIController={{ isResizeDisabled: true }}>
    <LayoutManager
      globalNavigation={GlobalNavigation}
      productNavigation={ProductNavigation}
      containerNavigation={ContainerNavigation}
    >
      <div style={{ padding: `${gridSize * 4}px ${gridSize * 5}px` }}>
        <p>
          <UIControllerSubscriber>
            {({ state: { isResizeDisabled }, enableResize, disableResize }) => (
              <Fragment>
                <ToggleStateless
                  isChecked={!isResizeDisabled}
                  onChange={isResizeDisabled ? enableResize : disableResize}
                />{' '}
                Allow resizing
              </Fragment>
            )}
          </UIControllerSubscriber>
        </p>
        <p>
          <UIControllerSubscriber>
            {({ state: { isCollapsed }, toggleCollapse }) => (
              <Button
                iconBefore={isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                onClick={toggleCollapse}
              >
                {isCollapsed ? 'Expand' : 'Collapse'} the navigation
              </Button>
            )}
          </UIControllerSubscriber>
        </p>
      </div>
    </LayoutManager>
  </NavigationProvider>
);
