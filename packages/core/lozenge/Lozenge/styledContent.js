import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
var HORIZONTAL_SPACING = "".concat(gridSize() / 2, "px");
export default styled.span.withConfig({
  displayName: "styledContent",
  componentId: "ku88a7-0"
})(["\n  display: inline-block;\n  vertical-align: top;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  box-sizing: border-box;\n  padding: 0 ", ";\n  max-width: ", ";\n  width: 100%;\n"], HORIZONTAL_SPACING, function (props) {
  return typeof props.maxWidth === 'number' ? "".concat(props.maxWidth, "px") : props.maxWidth;
});