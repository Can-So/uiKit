import styled, { keyframes } from 'styled-components';

/* Define keyframes statically to prevent a perfomance issue in styled components v1 where the keyframes function
 * does not cache previous values resulting in each spinner injecting the same keyframe definition
 * in the DOM.
 * This can be reverted to use dynamic keyframes when we upgrade to styled components v2
 */
var keyframeNames = {
  noop: keyframes(["\n    from { opacity: 0; }\n    to { opacity: 0; }\n  "]),
  enterRotate: keyframes(["\n    from { transform: rotate(50deg); }\n    to { transform: rotate(230deg); }\n  "]),
  leaveRotate: keyframes(["\n    from { transform: rotate(230deg); }\n    to { transform: rotate(510deg); }\n  "]),
  leaveOpacity: keyframes(["\n    from { opacity: 1; }\n    to { opacity: 0; }\n  "])
};
export var getContainerAnimation = function getContainerAnimation(_ref) {
  var delay = _ref.delay,
      phase = _ref.phase;

  if (phase === 'DELAY') {
    /* This hides the spinner and allows us to use animationend events to move to the next phase in
     * the same way we do with the other lifecycle stages */
    return "animation: ".concat(delay, "s ").concat(keyframeNames.noop, ";");
  }

  if (phase === 'ENTER' || phase === 'IDLE') {
    return "animation: 1s ease-in-out forwards ".concat(keyframeNames.enterRotate, ";");
  }

  if (phase === 'LEAVE') {
    return "animation: 0.53s ease-in-out forwards ".concat(keyframeNames.leaveRotate, ",\n      0.2s ease-in-out 0.33s ").concat(keyframeNames.leaveOpacity, ";");
  }

  return '';
};

var getSize = function getSize(_ref2) {
  var size = _ref2.size;
  return "".concat(size, "px");
};

var Container = styled.div.withConfig({
  displayName: "styledContainer__Container",
  componentId: "sc-1qs8wxp-0"
})(["\n  ", " display: flex;\n  height: ", ";\n  width: ", ";\n\n  /* Rapidly creating and removing spinners will result in multiple spinners being visible while\n   * they complete their exit animations. This rules hides the spinner if another one has been\n   * added. */\n  div + & {\n    display: none;\n  }\n"], getContainerAnimation, getSize, getSize);
Container.displayName = 'SpinnerContainer';
export default Container;