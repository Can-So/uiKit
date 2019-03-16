import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import styled, { css, keyframes } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import { SIZES_MAP } from './constants';

var getStrokeWidth = function getStrokeWidth(size) {
  return Math.round(size / 10);
};

var getStrokeCircumference = function getStrokeCircumference(size) {
  var strokeWidth = getStrokeWidth(size);
  var strokeRadius = size / 2 - strokeWidth / 2;
  return Math.PI * strokeRadius * 2;
};
/* Define keyframes statically to prevent a perfomance issue in styled components v1 where the keyframes function
 * does not cache previous values resulting in each spinner injecting the same keyframe definition
 * in the DOM.
 * This can be reverted to dynamic keyframes when we upgrade to styled components v2
 */


var keyframeNames = {
  noop: keyframes(["\n    from { opacity: 0; }\n    to { opacity: 0; }\n  "]),
  rotate: keyframes(["\n    to { transform: rotate(360deg); }\n  "]),
  enterOpacity: keyframes(["\n    from { opacity: 0; }\n    to { opacity: 1; }\n  "]),
  smallEnterStroke: keyframes(["\n    from { stroke-dashoffset: ", "px; }\n    to { stroke-dashoffset: ", "px; }\n  "], getStrokeCircumference(SIZES_MAP.small), getStrokeCircumference(SIZES_MAP.small) * 0.8),
  mediumEnterStroke: keyframes(["\n    from { stroke-dashoffset: ", "px; }\n    to { stroke-dashoffset: ", "px; }\n  "], getStrokeCircumference(SIZES_MAP.medium), getStrokeCircumference(SIZES_MAP.medium) * 0.8),
  largeEnterStroke: keyframes(["\n    from { stroke-dashoffset: ", "px; }\n    to { stroke-dashoffset: ", "px; }\n  "], getStrokeCircumference(SIZES_MAP.large), getStrokeCircumference(SIZES_MAP.large) * 0.8),
  xlargeEnterStroke: keyframes(["\n    from { stroke-dashoffset: ", "px; }\n    to { stroke-dashoffset: ", "px; }\n  "], getStrokeCircumference(SIZES_MAP.xlarge), getStrokeCircumference(SIZES_MAP.xlarge) * 0.8)
};
/* If a standard size is used, we can use one of our statically defined keyframes, otherwise
 * we're forced to dynamically create the keyframe and incur a performance cost.
 */

var getEnterStrokeKeyframe = function getEnterStrokeKeyframe(size) {
  var standardSizeName = Object.keys(SIZES_MAP).find(function (sizeName) {
    return size === SIZES_MAP[sizeName];
  });

  if (standardSizeName) {
    return keyframeNames["".concat(standardSizeName, "EnterStroke")];
  }

  var circumference = getStrokeCircumference(size);
  return keyframes(["\n    from { stroke-dashoffset: ", "px; }\n    to { stroke-dashoffset: ", "px; }\n  "], circumference, circumference * 0.8);
};

var spinnerColor = themed({
  light: colors.N500,
  dark: colors.N0
});
var spinnerColorInverted = themed({
  light: colors.N0,
  dark: colors.N0
});
export var getStrokeColor = function getStrokeColor(_ref // $FlowFixMe - theme is not found in props
) {
  var invertColor = _ref.invertColor,
      props = _objectWithoutProperties(_ref, ["invertColor"]);

  return invertColor ? spinnerColorInverted(props) : spinnerColor(props);
};
export var svgStyles = css(["\n  ", ";\n"], function (props) {
  var circumference = getStrokeCircumference(props.size);
  var idleRotation = "0.86s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite ".concat(keyframeNames.rotate);
  var spinUpStroke = "0.8s ease-in-out ".concat(getEnterStrokeKeyframe(props.size));
  var spinUpOpacity = "0.2s ease-in-out ".concat(keyframeNames.enterOpacity);
  var activeAnimations = [idleRotation];

  if (props.phase === 'ENTER') {
    activeAnimations.push(spinUpStroke, spinUpOpacity);
  }

  return css(["\n      animation: ", ";\n      fill: none;\n      stroke: ", ";\n      stroke-dasharray: ", "px;\n      stroke-dashoffset: ", "px;\n      stroke-linecap: round;\n      stroke-width: ", "px;\n      transform-origin: center;\n    "], activeAnimations.join(', '), getStrokeColor, circumference, circumference * 0.8, getStrokeWidth(props.size));
});
var Svg = styled.svg.withConfig({
  displayName: "styledSvg__Svg",
  componentId: "y2l69q-0"
})(["\n  ", ";\n"], svgStyles);
Svg.displayName = 'SpinnerSvg';
export default Svg;