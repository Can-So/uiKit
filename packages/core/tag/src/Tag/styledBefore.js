// @flow
import styled from 'styled-components';
import { gridSize } from '@findable/theme';

const gridSizeUnitless = gridSize();

export default styled.span`
  align-items: center;
  display: flex;
  justify-content: center;
  padding-left: ${gridSizeUnitless / 2}px;
`;
