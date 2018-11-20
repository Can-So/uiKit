// @flow
import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';

/**
 * Provide a styled container for form headers.
 */
export const FormFooterWrapper = styled.footer`
  margin-top: ${math.multiply(gridSize, 3)}px;
  display: flex;
  justify-content: flex-end;
`;
