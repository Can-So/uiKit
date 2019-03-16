import styled from 'styled-components';
import { animationTime, animationTimeUnitless, unthemedColors, gridSize, resizerVisibleWidth } from '../../shared-variables';
import { focusOutline } from '../../utils/mixins';
var toggleButtonHeight = gridSize * 4.5;
var toggleArrowHeight = gridSize * 2;
var toggleArrowWidth = 2;
var toggleArrowTopVerticalOffset = (toggleButtonHeight - toggleArrowHeight) / 2;
var toggleArrowBottomVerticalOffset = toggleArrowTopVerticalOffset - toggleArrowWidth + toggleArrowHeight / 2;
var opacityTransition = "opacity ".concat(animationTimeUnitless + 100, "ms ease-in-out ").concat(animationTimeUnitless, "ms");
var transformTransition = "transform ".concat(animationTime, " ease-in-out");
var ResizerButtonInner = styled.button.withConfig({
  displayName: "ResizerButtonInner",
  componentId: "sc-3k1heu-0"
})(["\n  position: relative;\n  top: calc(50% - ", "px);\n  height: ", "px;\n  background: none;\n  border: none;\n  color: transparent;\n  width: ", "px;\n  left: -", "px;\n  cursor: pointer;\n\n  &:focus {\n    ", ";\n  }\n\n  &::before,\n  &::after {\n    content: '';\n    background-color: ", ";\n    width: ", "px;\n    border-radius: ", "px;\n    height: ", "px;\n    position: absolute;\n    left: 8px;\n    opacity: ", ";\n    transition: ", ", ", ";\n    transform: rotate(0deg);\n  }\n\n  &::before {\n    top: ", "px;\n    transform-origin: ", "px\n      ", "px;\n  }\n\n  &::after {\n    top: ", "px;\n    transform-origin: ", "px ", "px;\n  }\n\n  &:hover,\n  &:focus {\n    &::before,\n    &::after {\n      opacity: 1;\n    }\n    &::before {\n      transform: rotate(\n        ", "\n      );\n    }\n    &::after {\n      transform: rotate(\n        ", "\n      );\n    }\n  }\n"], toggleButtonHeight / 2, toggleButtonHeight, gridSize * 3, resizerVisibleWidth / 2, focusOutline(unthemedColors.resizer), unthemedColors.resizer, toggleArrowWidth, toggleArrowHeight, toggleArrowHeight / 2, function (props) {
  return props.isVisible ? 1 : 0;
}, transformTransition, opacityTransition, toggleArrowTopVerticalOffset, toggleArrowWidth / 2, toggleArrowHeight / 2 - toggleArrowWidth / 2, toggleArrowBottomVerticalOffset, toggleArrowWidth / 2, toggleArrowWidth / 2, function (_ref) {
  var isPointingRight = _ref.isPointingRight;
  return isPointingRight ? '-40deg' : '40deg';
}, function (_ref2) {
  var isPointingRight = _ref2.isPointingRight;
  return isPointingRight ? '40deg' : '-40deg';
});
ResizerButtonInner.displayName = 'ResizerButtonInner';
export default ResizerButtonInner;