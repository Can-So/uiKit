import { components } from '@atlaskit/select';
import * as React from 'react';
import styled from 'styled-components';
import { SizeableAvatar } from './SizeableAvatar';
import { BORDER_PADDING } from './styles';
import { Option } from '../types';

const PlaceholderIconContainer = styled.div`
  padding-left: ${BORDER_PADDING}px;
  line-height: 0;
`;

const showUserAvatar = (inputValue: string, value?: Option) =>
  value && value.data && inputValue === value.label;

type Props = {
  hasValue: boolean;
  selectProps: any;
};

export class SingleValueContainer extends React.Component<Props> {
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
            showUserAvatar(inputValue, value) ? value.data.avatarUrl : undefined
          }
        />
      );
    }
    return null;
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
