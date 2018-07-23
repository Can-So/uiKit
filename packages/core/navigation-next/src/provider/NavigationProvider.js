// @flow

import React, { Component } from 'react';
import { Provider } from 'unstated';
import { UIController, ViewController } from '..';
import { CONTENT_NAV_WIDTH } from '../common/constants';
import type { UIControllerShape } from '../ui-controller/types';
import type { NavigationProviderProps } from './types';

const LS_KEY = 'ATLASKIT_NAVIGATION_UI_STATE';

function defaultGetCache(): UIControllerShape {
  const stored = localStorage.getItem(LS_KEY);
  return stored
    ? JSON.parse(stored)
    : {
        isPeekHinting: false,
        isPeeking: false,
        isCollapsed: false,
        productNavWidth: CONTENT_NAV_WIDTH,
        isResizing: false,
      };
}

function defaultSetCache(state: UIControllerShape) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

export default class NavigationProvider extends Component<
  NavigationProviderProps,
> {
  static defaultProps = {
    cache: {
      get: defaultGetCache,
      set: defaultSetCache,
    },
    initialPeekViewId: null,
    isDebugEnabled: false,
  };
  uiState: UIController;
  viewController: ViewController;

  constructor(props: NavigationProviderProps) {
    super(props);

    const {
      cache,
      initialPeekViewId,
      initialUIController,
      isDebugEnabled,
    } = props;
    this.uiState = new UIController(initialUIController, cache);
    this.viewController = new ViewController({
      isDebugEnabled,
      initialPeekViewId,
    });
  }

  componentDidUpdate(prevProps: NavigationProviderProps) {
    const { viewController } = this;
    const { isDebugEnabled } = this.props;
    if (isDebugEnabled !== prevProps.isDebugEnabled) {
      viewController.setIsDebugEnabled(!!isDebugEnabled);
    }
  }

  render() {
    const { children } = this.props;
    const { uiState, viewController } = this;

    return <Provider inject={[uiState, viewController]}>{children}</Provider>;
  }
}
