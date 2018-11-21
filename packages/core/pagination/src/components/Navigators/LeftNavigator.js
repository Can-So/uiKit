//@flow
import React, { Component } from 'react';
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import Navigator from './Navigator';
import type { NavigatorPropsType } from '../../types';

export default class LeftNavigator extends Component<NavigatorPropsType> {
  static defaultProps = {
    ariaLabel: 'previous',
    iconBefore: <ChevronLeftLargeIcon />,
    isDisabled: false,
  };

  render() {
    return <Navigator {...this.props} />;
  }
}
