import * as React from 'react';
import styled from 'styled-components';
import { components } from '@atlaskit/select';
import { colors } from '@atlaskit/theme';

const PlaceholderContainer = styled.div`
  input::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${colors.N100};
    opacity: 1; /* Firefox */
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${colors.N100};
  }
`;

export class Input extends React.PureComponent<any> {
  render() {
    const { ...inputProps } = this.props;
    return (
      <PlaceholderContainer>
        <components.Input placeholder="add more people..." {...inputProps} />
      </PlaceholderContainer>
    );
  }
}
