//@flow
import React, { Component } from 'react';
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large';
import Navigator from './Navigator';
import type { NavigatorPropsType } from '../../types';

export default class RightNavigator extends Component<NavigatorPropsType> {
  static defaultProps = {
    ariaLabel: 'next',
    iconBefore: <ChevronRightLargeIcon />,
    isDisabled: false,
  };

  render() {
    return <Navigator {...this.props} />;
  }
}
