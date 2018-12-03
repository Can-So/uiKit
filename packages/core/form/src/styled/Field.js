// @flow
import styled from 'styled-components';
import { typography, colors } from '@atlaskit/theme';

/**
 * Provide a styled container for field components
 */
const FieldWrapper = styled.div`
  margin-top: 8px;
`;

/**
 * Provide a styled Label for field components
 */
export const Label = styled.label`
  ${typography.h200()} display: inline-block;
  margin-bottom: 4px;
  margin-top: 0;
`;

export const RequiredIndicator = styled.span`
  color: ${colors.R400};
  padding-left: 2px;
`;

export default FieldWrapper;
