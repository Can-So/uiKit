// @flow

import React, { Component } from 'react';
import { Provider } from 'unstated';
import { UIState, ViewState } from '../';
import { CONTENT_NAV_WIDTH } from '../common/constants';
import type { UIStateShape } from '../ui-state/types';
import type { NavigationProviderProps } from './types';

const LS_KEY = 'ATLASKIT_NAVIGATION_UI_STATE';

function defaultGetCache(): UIStateShape {
  const stored = localStorage.getItem(LS_KEY);
  return stored
    ? JSON.parse(stored)
    : {
        isHinting: false,
        isPeeking: false,
        isCollapsed: false,
        productNavWidth: CONTENT_NAV_WIDTH,
        isResizing: false,
      };
}

function defaultSetCache(state: UIStateShape) {
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
    isDebugEnabled: false,
  };
  uiState: UIState;
  viewState: ViewState;

  constructor(props: NavigationProviderProps) {
    super(props);

    const { cache, initialState, isDebugEnabled } = props;
    this.uiState = new UIState(initialState, cache);
    this.viewState = new ViewState({ isDebugEnabled: isDebugEnabled || false });
  }

  componentDidUpdate(prevProps: NavigationProviderProps) {
    const { viewState } = this;
    const { isDebugEnabled } = this.props;
    if (isDebugEnabled !== prevProps.isDebugEnabled) {
      viewState.setIsDebugEnabled(!!isDebugEnabled);
    }
  }

  render() {
    const { children } = this.props;
    const { uiState, viewState } = this;

    return <Provider inject={[uiState, viewState]}>{children}</Provider>;
  }
}
