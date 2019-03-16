import styled from 'styled-components';
import { gridSize, math, typography } from '@atlaskit/theme';
/**
 * Provide a styled container for form headers.
 */

var FormHeaderWrapper = styled.div.withConfig({
  displayName: "FormHeader__FormHeaderWrapper",
  componentId: "sc-10ulekx-0"
})([""]);
/**
 * Provide a styled container for form header title.
 */

var FormHeaderTitle = styled.h1.withConfig({
  displayName: "FormHeader__FormHeaderTitle",
  componentId: "sc-10ulekx-1"
})(["\n  ", ";\n  line-height: ", "px;\n  margin-right: ", "px;\n  margin-top: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"], typography.h700, math.multiply(gridSize, 4), math.multiply(gridSize, 4));
/**
 * Provide a styled container for form header title.
 */

var FormHeaderDescription = styled.div.withConfig({
  displayName: "FormHeader__FormHeaderDescription",
  componentId: "sc-10ulekx-2"
})(["\n  margin-top: ", "px;\n"], gridSize);
/**
 * Provide a styled container for form header content.
 */

var FormHeaderContent = styled.div.withConfig({
  displayName: "FormHeader__FormHeaderContent",
  componentId: "sc-10ulekx-3"
})(["\n  min-width: 100%;\n  margin-top: ", "px;\n"], gridSize);
export default FormHeaderWrapper;
export { FormHeaderTitle, FormHeaderDescription, FormHeaderContent };