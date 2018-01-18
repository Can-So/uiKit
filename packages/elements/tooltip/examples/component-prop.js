// @flow
import React from 'react';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import Tooltip from '../src';

const InlineDialog = styled.div`
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-sizing: content-box; /* do not set this to border-box or it will break the overflow handling */
  color: #333;
  max-height: 300px;
  max-width: 300px;
  padding: 8px 12px;
  z-index: 500;
  /* required by component */
  pointer-events: none;
  position: fixed;
`;

export default () => (
  <Tooltip component={InlineDialog} content="Hello World">
    <Button>Hover Over Me</Button>
  </Tooltip>
);
