import { components } from '@atlaskit/select';
import * as React from 'react';
import styled from 'styled-components';
import { SizeableAvatar } from './SizeableAvatar';
import { PLACEHOLDER_PADDING } from './styles';

const PlaceholderIconContainer = styled.div`
  padding-left: ${PLACEHOLDER_PADDING}px;
  line-height: 0;
`;

export class SingleValueContainer extends React.PureComponent<any, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, ...valueContainerProps } = this.props;

    const { appearance } = valueContainerProps.selectProps;

    return (
      <components.ValueContainer {...valueContainerProps}>
        <PlaceholderIconContainer>
          {!valueContainerProps.hasValue ? (
            <SizeableAvatar appearance={appearance} />
          ) : null}
        </PlaceholderIconContainer>
        {children}
      </components.ValueContainer>
    );
  }
}
