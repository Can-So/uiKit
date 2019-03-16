import styled, { keyframes } from 'styled-components';
import { maxWidth, maxWidthUnitless } from '../constants';
var removeAnimation = keyframes(["\n  0% {\n    animation-timing-function: cubic-bezier(0.23830050393398, 0, 0.25586732616931, 0.79011192334632);\n    max-width: ", ";\n  }\n  20% {\n    animation-timing-function: cubic-bezier(0.21787238302442, 0.98324004924648, 0.58694150667646, 1);\n    max-width: ", "px;\n  }\n  100% { max-width: 0; }\n"], maxWidth, maxWidthUnitless * 0.8);

function getRemovedStyles(_ref) {
  var isRemoved = _ref.isRemoved;
  var styles;
  if (isRemoved) styles = 'width: 0; visibility: hidden;';
  return styles;
}

function getRemovingStyles(_ref2) {
  var isRemoving = _ref2.isRemoving;
  var styles;
  if (isRemoving) styles = "animation: ".concat(removeAnimation, " 250ms forwards; will-change: width;");
  return styles;
}

export default styled.div.withConfig({
  displayName: "styledContainer",
  componentId: "sc-1dgacol-0"
})(["\n  box-sizing: border-box;\n  display: inline-block;\n\n  ", " ", ";\n"], getRemovingStyles, getRemovedStyles);