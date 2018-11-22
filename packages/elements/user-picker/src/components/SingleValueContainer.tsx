import { components } from '@atlaskit/select';
import * as React from 'react';
import styled from 'styled-components';
import { SizeableAvatar } from './SizeableAvatar';
import { PLACEHOLDER_PADDING } from './styles';
import { isChildInput } from './utils';

const PlaceholderIconContainer = styled.div`
  padding-left: ${PLACEHOLDER_PADDING}px;
  line-height: 0;
`;

const showDefaultAvatar = (isFocused, inputValue, hasValue) =>
  (isFocused && inputValue) || !hasValue;

export class SingleValueContainer extends React.PureComponent<any, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, ...valueContainerProps } = this.props;

    const {
      hasValue,
      selectProps,
      selectProps: { appearance, isFocused, inputValue },
    } = valueContainerProps;
    return (
      <components.ValueContainer {...valueContainerProps}>
        <PlaceholderIconContainer>
          {showDefaultAvatar(isFocused, inputValue, hasValue) ? (
            <SizeableAvatar appearance={appearance} />
          ) : null}
        </PlaceholderIconContainer>
        {React.Children.map(children, child =>
          isChildInput(child)
            ? React.cloneElement(child, { selectProps })
            : child,
        )}
      </components.ValueContainer>
    );
  }
}
