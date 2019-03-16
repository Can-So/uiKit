//@flow
import styled from 'styled-components';
import Button from '@findable/button';
import { gridSize } from '@findable/theme';

export const StyledButton = styled(Button)`
  [dir='rtl'] & {
    transform: rotate(180deg);
  }
  padding-left: ${gridSize() / 2}px;
  padding-right: ${gridSize() / 2}px;
`;
