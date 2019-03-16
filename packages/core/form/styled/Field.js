import styled from 'styled-components';
import { typography, colors, gridSize, math } from '@atlaskit/theme';
/**
 * Provide a styled container for field components
 */

var FieldWrapper = styled.div.withConfig({
  displayName: "Field__FieldWrapper",
  componentId: "vqybw1-0"
})(["\n  margin-top: ", "px;\n"], gridSize);
/**
 * Provide a styled Label for field components
 */

export var Label = styled.label.withConfig({
  displayName: "Field__Label",
  componentId: "vqybw1-1"
})(["\n  ", " display: inline-block;\n  margin-bottom: ", "px;\n  margin-top: 0;\n"], typography.h200(), math.multiply(gridSize, 0.5));
export var RequiredIndicator = styled.span.withConfig({
  displayName: "Field__RequiredIndicator",
  componentId: "vqybw1-2"
})(["\n  color: ", ";\n  padding-left: ", "px;\n"], colors.R400, math.multiply(gridSize, 0.25));
export default FieldWrapper;