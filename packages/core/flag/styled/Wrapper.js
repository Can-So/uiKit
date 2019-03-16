import styled, { keyframes } from 'styled-components';
import { gridSize } from '@atlaskit/theme';
export var flagWidth = gridSize() * 50; // This is the translateX position that we target when animating a card out
// towards the left of screen.

var exitXPosition = "".concat(0 - flagWidth / 2, "px");
var flagAnimationDuration = '0.4s';
var animationEnter = keyframes(["\n    from {\n      opacity: 0;\n      transform: translate(", ", 0);\n    }\n    to {\n      opacity: 1;\n      transform: translate(0, 0);\n    }\n"], exitXPosition);
var animationLeave = keyframes(["\n  from {\n    opacity: 1;\n    transform: translate(0, 0);\n  }\n  to {\n    opacity: 0;\n    transform: translate(", ", 0);\n  }\n"], exitXPosition);

var getAnimation = function getAnimation(_ref) {
  var transitionState = _ref.transitionState;

  if (transitionState === 'entering') {
    return "".concat(animationEnter, " ").concat(flagAnimationDuration);
  }

  if (transitionState === 'exiting') {
    return "".concat(animationLeave, " ").concat(flagAnimationDuration);
  }

  return 'initial';
};

var Wrapper = styled.div.withConfig({
  displayName: "Wrapper",
  componentId: "sc-19lmueh-0"
})(["\n  bottom: 0;\n  position: absolute;\n  transition: transform ", " ease-in-out;\n  width: ", "px;\n\n  &:first-child {\n    animation: ", ";\n  }\n\n  &:nth-child(n + 2) {\n    transform: translateX(0) translateY(100%) translateY(", "px);\n  }\n\n  /* Layer the 'primary' flag above the 'secondary' flag */\n  &:nth-child(1) {\n    z-index: 5;\n  }\n  &:nth-child(2) {\n    z-index: 4;\n  }\n\n  /* The 2nd flag should be placed at 0,0 position when the 1st flag is animating out. */\n  ", " &:nth-child(n+4) {\n    display: none;\n  }\n"], flagAnimationDuration, flagWidth, getAnimation, 2 * gridSize(), function (_ref2) {
  var transitionState = _ref2.transitionState;
  return transitionState === 'exiting' ? "\n    && + * {\n      transform: translate(0, 0);\n    }\n  " : null;
});
Wrapper.displayName = 'Wrapper';
export default Wrapper;