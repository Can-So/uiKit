// @flow
import styled from 'styled-components';

import { gridSize } from '@atlaskit/theme';

export default styled.div`
  height: 100%;
  padding-top: ${gridSize() * 3}px;
  padding-bottom: ${gridSize() * 2}px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
