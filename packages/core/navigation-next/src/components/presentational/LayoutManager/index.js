// @flow

import React, { Component } from 'react';

import { withNavigationUI } from '../../../ui-controller';
import LayoutManager from './LayoutManager';
import type { ConnectedLayoutManagerProps } from './types';

function defaultTooltipContent(isCollapsed: boolean) {
  return isCollapsed
    ? { text: 'Expand', char: '[' }
    : { text: 'Collapse', char: '[' };
}

const LayoutManagerWithNavigationUI = withNavigationUI(LayoutManager);

export default class ConnectedLayoutManager extends Component<ConnectedLayoutManagerProps> {
  static defaultProps = {
    collapseToggleTooltipContent: defaultTooltipContent,
    experimental_flyoutOnHover: false,
  };

  render() {
    return <LayoutManagerWithNavigationUI {...this.props} />;
  }
}
