// @flow
import styled from 'styled-components';
import { gridSize, math, typography } from '@atlaskit/theme';

/**
 * Provide a styled container for form sections.
 */
const FormSectionWrapper = styled.div`
  margin-top: ${math.multiply(gridSize, 3)}px;
`;

/**
 * Provide a styled container for form section title
 */
const FormSectionTitle = styled.h2`
  ${typography.h600};
  line-height: ${math.multiply(gridSize, 4)}px;
  margin-right: ${math.multiply(gridSize, 4)}px;
  margin-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * Provide a styled container for form section content.
 */
const FormSectionDescription = styled.div`
  margin-top: ${gridSize}px;
`;

export default FormSectionWrapper;
export { FormSectionTitle, FormSectionDescription };
