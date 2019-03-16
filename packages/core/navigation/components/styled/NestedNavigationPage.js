import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    padding-right: ", "px;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled, { keyframes } from 'styled-components';
import { animationTimeUnitless, scrollHintSpacing, gridSize } from '../../shared-variables';
import ScrollHintScrollContainer from '../styled/ScrollHintScrollContainer';
import { whenCollapsed } from '../../theme/util';
var animationTime = animationTimeUnitless / 1000;
export var getAnimation = function getAnimation(_ref) {
  var transitionState = _ref.transitionState,
      traversalDirection = _ref.traversalDirection;
  return transitionState === 'entering' || transitionState === 'exiting' ? "animation: ".concat(animationTime, "s ").concat(keyframes(["\n      from { transform: translateX(", "%); }\n      to { transform: translateX(0); }\n    "], traversalDirection === 'down' ? 100 : -100), ";") : null;
}; // Use the same scrollbar styling as the main container navigation

var NestedNavigationPage = styled(ScrollHintScrollContainer).withConfig({
  displayName: "NestedNavigationPage",
  componentId: "ruacvy-0"
})(["\n  ", " flex-shrink: 0;\n  /* we want each page to have internal scrolling */\n  overflow-y: auto;\n  /* The parent container nav scroll container already sets padding left/right.\n   * Set extra padding right to account for the negative margin-right that is set\n   * on NestedNavigationWrapper to pull the scrollbar over to the edge of the nav\n   */\n  padding-left: 0;\n  padding-right: ", "px;\n\n  ", ";\n"], getAnimation, scrollHintSpacing, whenCollapsed(_templateObject(), gridSize));
NestedNavigationPage.displayName = 'NestedNavigationPage';
export default NestedNavigationPage;