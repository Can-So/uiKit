import styled from 'styled-components';
import { borderRadius, gridSize, math } from '@atlaskit/theme';
import { flagBackgroundColor, flagBorderColor, flagTextColor, flagShadowColor, flagFocusRingColor } from '../../theme';

var getBoxShadow = function getBoxShadow(props) {
  var borderColor = flagBorderColor(props);
  var shadowColor = flagShadowColor(props);
  var border = borderColor && "0 0 1px ".concat(borderColor);
  var shadow = "0 20px 32px -8px ".concat(shadowColor);
  return [border, shadow].filter(function (p) {
    return p;
  }).join(',');
};

export default styled.div.withConfig({
  displayName: "styledFlag",
  componentId: "qhniyv-0"
})(["\n  background-color: ", ";\n  border-radius: ", "px;\n  box-sizing: border-box;\n  box-shadow: ", ";\n  color: ", ";\n  padding: ", "px;\n  transition: background-color 200ms;\n  width: 100%;\n  z-index: 600;\n\n  &:focus {\n    outline: none;\n    box-shadow: 0 0 0 2px ", ";\n  }\n"], flagBackgroundColor, borderRadius, getBoxShadow, flagTextColor, math.multiply(gridSize, 2), flagFocusRingColor); // Header

export var Header = styled.div.withConfig({
  displayName: "styledFlag__Header",
  componentId: "qhniyv-1"
})(["\n  display: flex;\n  align-items: center;\n  height: ", "px;\n"], math.multiply(gridSize, 4));
export var Icon = styled.div.withConfig({
  displayName: "styledFlag__Icon",
  componentId: "qhniyv-2"
})(["\n  flex: 0 0 auto;\n  width: ", "px;\n"], math.multiply(gridSize, 5));
export var Title = styled.span.withConfig({
  displayName: "styledFlag__Title",
  componentId: "qhniyv-3"
})(["\n  color: ", ";\n  font-weight: 600;\n  flex: 1;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"], flagTextColor);
export var DismissButton = styled.button.withConfig({
  displayName: "styledFlag__DismissButton",
  componentId: "qhniyv-4"
})(["\n  appearance: none;\n  background: none;\n  border: none;\n  border-radius: ", "px;\n  color: ", ";\n  cursor: pointer;\n  flex: 0 0 auto;\n  margin-left: ", "px;\n  padding: 0;\n  white-space: nowrap;\n\n  &:focus {\n    outline: none;\n    box-shadow: 0 0 0 2px ", ";\n  }\n"], borderRadius, flagTextColor, gridSize, flagFocusRingColor); // Content

export var Content = styled.div.withConfig({
  displayName: "styledFlag__Content",
  componentId: "qhniyv-5"
})(["\n  display: flex;\n  flex: 1 1 100%;\n  flex-direction: column;\n  justify-content: center;\n  min-width: 0;\n  padding: 0 0 0 ", "px;\n"], math.multiply(gridSize, 5));
export var Expander = styled.div.withConfig({
  displayName: "styledFlag__Expander",
  componentId: "qhniyv-6"
})(["\n  max-height: ", "px;\n  opacity: ", ";\n  overflow: ", ";\n  transition: max-height 0.3s, opacity 0.3s;\n"], function (_ref) {
  var isExpanded = _ref.isExpanded;
  return isExpanded ? 150 : 0;
}, function (_ref2) {
  var isExpanded = _ref2.isExpanded;
  return isExpanded ? 1 : 0;
}, function (_ref3) {
  var isExpanded = _ref3.isExpanded;
  return isExpanded ? 'visible' : 'hidden';
});
export var Description = styled.div.withConfig({
  displayName: "styledFlag__Description",
  componentId: "qhniyv-7"
})(["\n  color: ", ";\n  word-wrap: break-word;\n"], flagTextColor);