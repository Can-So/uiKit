// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
import { Label } from './styled/Field';

const FieldsetLabel = styled(Label)`
  margin-bottom: 0;
`;

const Fieldset = styled.fieldset`
  margin-top: ${gridSize}px;
`;

type Props = {
  /* Children to be rendered in the fieldset */
  children: Node,
  /* Legend of the the fieldset */
  legend?: Node,
};

export default ({ children, legend }: Props) => (
  <Fieldset>
    {legend && (
      <legend>
        <FieldsetLabel>{legend}</FieldsetLabel>
      </legend>
    )}
    {children}
  </Fieldset>
);
