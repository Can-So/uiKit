//@flow
import React, { Component } from 'react';
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large';
import Navigator, { type NavigatorPropsType } from './Navigator';

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
