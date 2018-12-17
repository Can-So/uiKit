// @flow
import styled from 'styled-components';
import { typography, colors, gridSize, math } from '@atlaskit/theme';

/**
 * Provide a styled container for field components
 */
const FieldWrapper = styled.div`
  margin-top: ${gridSize}px;
`;

/**
 * Provide a styled Label for field components
 */
export const Label = styled.label`
  ${typography.h200()} display: inline-block;
  margin-bottom: ${math.multiply(gridSize, 0.5)}px;
  margin-top: 0;
`;

export const RequiredIndicator = styled.span`
  color: ${colors.R400};
  padding-left: ${math.multiply(gridSize, 0.25)}px;
`;

export default FieldWrapper;
