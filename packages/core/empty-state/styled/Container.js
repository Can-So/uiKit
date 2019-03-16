import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
var verticalMarginSize = gridSize() * 6;
var columnWidth = gridSize() * 8;
var gutter = gridSize() * 2;
var wideContainerWidth = columnWidth * 6 + gutter * 5;
var narrowContainerWidth = columnWidth * 4 + gutter * 3;
var Container = styled.div.withConfig({
  displayName: "Container",
  componentId: "sc-19i9g24-0"
})(["\n  margin: ", "px auto;\n  text-align: center;\n  /* Use max-width so the component can shrink on smaller viewports. */\n  max-width: ", "px;\n"], verticalMarginSize, function (props) {
  return props.size === 'narrow' ? narrowContainerWidth : wideContainerWidth;
});
export default Container;