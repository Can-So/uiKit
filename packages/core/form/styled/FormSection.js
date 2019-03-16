import styled from 'styled-components';
import { gridSize, math, typography } from '@atlaskit/theme';
/**
 * Provide a styled container for form sections.
 */

var FormSectionWrapper = styled.div.withConfig({
  displayName: "FormSection__FormSectionWrapper",
  componentId: "hwqcq1-0"
})(["\n  margin-top: ", "px;\n"], math.multiply(gridSize, 3));
/**
 * Provide a styled container for form section title
 */

var FormSectionTitle = styled.h2.withConfig({
  displayName: "FormSection__FormSectionTitle",
  componentId: "hwqcq1-1"
})(["\n  ", ";\n  line-height: ", "px;\n  margin-right: ", "px;\n  margin-top: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"], typography.h600, math.multiply(gridSize, 4), math.multiply(gridSize, 4));
/**
 * Provide a styled container for form section content.
 */

var FormSectionDescription = styled.div.withConfig({
  displayName: "FormSection__FormSectionDescription",
  componentId: "hwqcq1-2"
})(["\n  margin-top: ", "px;\n"], gridSize);
export default FormSectionWrapper;
export { FormSectionTitle, FormSectionDescription };