import { components } from '@atlaskit/select';
import * as React from 'react';
import styled from 'styled-components';
import { SizeableAvatar } from './SizeableAvatar';
import { PLACEHOLDER_PADDING } from './styles';

const PlaceholderIconContainer = styled.div`
  padding-left: ${PLACEHOLDER_PADDING}px;
  line-height: 0;
`;

const showUserAvatar = (inputValue, value) =>
  value && inputValue === value.label;

export class SingleValueContainer extends React.Component<any> {
  private renderAvatar = () => {
    const {
      hasValue,
      selectProps: { appearance, isFocused, inputValue, value },
    } = this.props;

    if (isFocused || !hasValue) {
      return (
        <SizeableAvatar
          appearance={appearance}
          src={
            showUserAvatar(inputValue, value) ? value.user.avatarUrl : undefined
          }
        />
      );
    }
  };

  render() {
    const { children, ...valueContainerProps } = this.props;

    return (
      <components.ValueContainer {...valueContainerProps}>
        <PlaceholderIconContainer>
          {this.renderAvatar()}
        </PlaceholderIconContainer>
        {children}
      </components.ValueContainer>
    );
  }
}
