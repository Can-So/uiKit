import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed, elevation, layers } from '@atlaskit/theme';
var backgroundColor = themed({
  light: colors.N0,
  dark: colors.DN50
});
var textColor = themed({
  light: colors.N900,
  dark: colors.DN600
}); // eslint-disable-next-line import/prefer-default-export

export var Container = styled.div.withConfig({
  displayName: "styled__Container",
  componentId: "sc-1v7azd6-0"
})(["\n  background: ", ";\n  border-radius: ", "px;\n  box-sizing: content-box; /* do not set this to border-box or it will break the overflow handling */\n  color: ", ";\n  max-height: ", "px;\n  max-width: ", "px;\n  padding: ", "px ", "px;\n  z-index: ", ";\n\n  ", ";\n\n  &:focus {\n    outline: none;\n  }\n"], backgroundColor, borderRadius, textColor, math.multiply(gridSize, 56), math.multiply(gridSize, 56), math.multiply(gridSize, 2), math.multiply(gridSize, 3), layers.dialog, elevation.e200);