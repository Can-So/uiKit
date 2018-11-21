//@flow
import React, { Component } from 'react';
import { StyledButton } from './styled';
import type { NavigatorPropsType } from '../../types';

export default class Navigator extends Component<NavigatorPropsType> {
  render() {
    return <StyledButton {...this.props} appearance="subtle" spacing="none" />;
  }
}
