// @flow

import React from 'react';
import styled from 'styled-components';
import { borderRadius, colors } from '@atlaskit/theme';
import Badge from '../src';

const Item = styled.div`
  align-items: center;
  border-radius: ${borderRadius}px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  max-width: 300px;
  padding: 0.6em 1em;

  &:hover {
    background-color: ${colors.N20};
  }
`;

export default function Example() {
  return (
    <div>
      <Item>
        <p>Default</p>
        <Badge value={5} />
      </Item>
      <Item>
        <p>Primary</p>
        <Badge appearance="primary" value={-5} />
      </Item>
      <Item>
        <p>Primary Inverted</p>
        <Badge appearance="primaryInverted" value={-5} />
      </Item>
      <Item>
        <p>Important</p>
        <Badge appearance="important" value={25} />
      </Item>
      <Item>
        <p>Added (no theme change)</p>
        <Badge appearance="added" max={99} value={3000} />
      </Item>
      <Item>
        <p>Removed (no theme change)</p>
        <Badge appearance="removed" />
      </Item>
      <Item>
        <p>Infinity (∞)</p>
        <Badge max={Infinity} value={Infinity} />
      </Item>
    </div>
  );
}
