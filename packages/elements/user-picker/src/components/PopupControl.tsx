import * as React from 'react';
import { Label } from '@findable/field-base';
import { components } from '@findable/select';
import styled from 'styled-components';

interface Props {
  selectProps: { popupTitle: string };
}

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 8px 8px;
`;

export class PopupControl extends React.PureComponent<Props> {
  render() {
    const {
      selectProps: { popupTitle },
    } = this.props;

    return (
      <ControlWrapper>
        <Label label={popupTitle} />
        <components.Control {...this.props} />
      </ControlWrapper>
    );
  }
}
