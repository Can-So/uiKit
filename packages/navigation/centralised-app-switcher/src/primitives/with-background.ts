import React from 'react';
import styled from 'styled-components';
import { gridSize, colors } from '@atlaskit/theme';

export default styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${4 * gridSize()}px;
  height: ${4 * gridSize()}px;
  border-radius: ${gridSize() / 2}px;

  background-color: ${({ isAdmin }) => (isAdmin ? colors.DN70 : colors.B400)};
`;
