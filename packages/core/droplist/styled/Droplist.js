import styled, { css } from 'styled-components';
import { borderRadius, colors, gridSize, math } from '@atlaskit/theme';
/* When dropdown contains more than 9 elements (droplist items, droplist groups),
 * it should have scroll and cut off half of the 10th item to indicate that there are more
 * items then are seen. This was previously calculated by mapping over children, but with
 * the current composed API it is simpler to just assume 9 items. */

var getMaxHeight = function getMaxHeight(_ref) {
  var isTall = _ref.isTall,
      maxHeight = _ref.maxHeight;
  if (maxHeight) return "".concat(maxHeight, "px");
  var heightWithoutPadding = 17;
  var verticalPadding = gridSize();
  var height = heightWithoutPadding + verticalPadding * 2;
  var defaultMaxHeight = 9.5 * height + verticalPadding / 2;
  return isTall ? '90vh' : "".concat(defaultMaxHeight, "px");
};

export default styled.div.withConfig({
  displayName: "Droplist",
  componentId: "sc-1z05y4v-0"
})(["\n  display: inline-flex;\n\n  ", ";\n"], function (props) {
  return props.fit && "\n    display: block;\n    flex: 1 1 auto;\n  ";
});
var backgroundColor = colors.backgroundOnLayer;
var boxShadow = css(["\n  box-shadow: 0 ", "px ", "px -", "px ", ",\n    0 0 1px ", ";\n"], math.divide(gridSize, 2), gridSize, math.divide(gridSize, 4), colors.N50A, colors.N60A);
export var Content = styled.div.withConfig({
  displayName: "Droplist__Content",
  componentId: "sc-1z05y4v-1"
})(["\n  background: ", ";\n  border-radius: ", "px;\n  ", ";\n  box-sizing: border-box;\n  overflow: auto;\n  padding: ", "px 0;\n  max-height: ", ";\n"], backgroundColor, borderRadius, boxShadow, math.divide(gridSize, 2), getMaxHeight);
export var SpinnerContainer = styled.div.withConfig({
  displayName: "Droplist__SpinnerContainer",
  componentId: "sc-1z05y4v-2"
})(["\n  display: flex;\n  justify-content: center;\n  min-width: ", "px;\n  padding: ", "px;\n"], math.multiply(gridSize, 20), math.multiply(gridSize, 2.5));
export var Trigger = styled.div.withConfig({
  displayName: "Droplist__Trigger",
  componentId: "sc-1z05y4v-3"
})(["\n  display: inline-flex;\n  transition-duration: 0.2s;\n  transition: box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);\n\n  ", ";\n"], function (props) {
  return props.fit && "\n    box-sizing: border-box;\n    display: block;\n  ";
});