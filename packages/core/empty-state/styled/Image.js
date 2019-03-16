import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
var Image = styled.img.withConfig({
  displayName: "Image",
  componentId: "sc-1fxcbfe-0"
})(["\n  max-width: ", "px;\n  max-height: ", "px;\n  width: ", ";\n  height: ", ";\n  margin: 0 auto ", "px;\n  display: block;\n"], function (props) {
  return props.maxWidth;
}, function (props) {
  return props.maxHeight;
}, function (props) {
  return props.width || 'auto';
}, function (props) {
  return props.height || 'auto';
}, gridSize() * 3);
export default Image;