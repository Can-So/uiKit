import styled from 'styled-components';
import { borderRadius, colors, gridSize, math, themed } from '@atlaskit/theme'; // dialog may not be smaller than 160px or larger than 600px

var dialogWidth = function dialogWidth(_ref) {
  var width = _ref.width;
  return "".concat(Math.min(Math.max(width, 160), 600), "px");
};

var borderColor = themed({
  light: colors.N60A,
  dark: colors.DN60A
});
var shadowColor = themed({
  light: colors.N50A,
  dark: colors.DN50A
});

var boxShadow = function boxShadow(props) {
  var border = "0 0 1px ".concat(borderColor(props));
  var shadow = "0 4px 8px -2px ".concat(shadowColor(props));
  return [border, shadow].join(',');
};

export var FillScreen = styled.div.withConfig({
  displayName: "Dialog__FillScreen",
  componentId: "n00n3i-0"
})(["\n  height: 100%;\n  left: 0;\n  overflow-y: auto;\n  position: absolute;\n  top: ", "px;\n  width: 100%;\n"], function (p) {
  return p.scrollDistance;
});
export var Dialog = styled.div.withConfig({
  displayName: "Dialog",
  componentId: "n00n3i-1"
})(["\n  background: ", ";\n  border-radius: ", "px;\n  box-shadow: ", ";\n  box-sizing: border-box;\n  color: ", ";\n  display: flex;\n  flex-direction: column;\n  width: ", ";\n"], colors.P300, borderRadius, boxShadow, colors.N0, dialogWidth);
export var DialogBody = styled.div.withConfig({
  displayName: "Dialog__DialogBody",
  componentId: "n00n3i-2"
})(["\n  flex: 1 1 auto;\n  padding: ", "px ", "px\n    ", "px;\n\n  p:last-child,\n  ul:last-child,\n  ol:last-child {\n    margin-bottom: 0;\n  }\n"], math.multiply(gridSize, 2), math.multiply(gridSize, 3), gridSize); // internal elements

export var Heading = styled.h4.withConfig({
  displayName: "Dialog__Heading",
  componentId: "n00n3i-3"
})(["\n  color: inherit;\n  font-size: 20px;\n  font-style: inherit;\n  font-weight: 500;\n  letter-spacing: -0.008em;\n  line-height: 1.2;\n  margin-bottom: ", "px;\n"], gridSize);
export var Image = styled.img.withConfig({
  displayName: "Dialog__Image",
  componentId: "n00n3i-4"
})(["\n  height: auto;\n  max-width: 100%;\n"]); // actions

export var Actions = styled.div.withConfig({
  displayName: "Dialog__Actions",
  componentId: "n00n3i-5"
})(["\n  display: flex;\n  justify-content: space-between;\n  padding: 0 ", "px ", "px;\n"], math.multiply(gridSize, 3), math.multiply(gridSize, 2));
export var ActionItems = styled.div.withConfig({
  displayName: "Dialog__ActionItems",
  componentId: "n00n3i-6"
})(["\n  display: flex;\n  margin: 0 -", "px;\n"], math.divide(gridSize, 2));
export var ActionItem = styled.div.withConfig({
  displayName: "Dialog__ActionItem",
  componentId: "n00n3i-7"
})(["\n  margin: 0 ", "px;\n"], math.divide(gridSize, 2));