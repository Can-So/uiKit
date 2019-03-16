import styled, { css } from 'styled-components';
import { colors, gridSize, math, themed } from '@atlaskit/theme';
var TRANSITION_DURATION = '0.25s ease-in-out';
/* Container */

export var getMaxHeight = function getMaxHeight(_ref) {
  var appearance = _ref.appearance;
  return appearance === 'announcement' ? '88px' : '52px';
};
export var backgroundColor = themed('appearance', {
  error: {
    light: colors.R400,
    dark: colors.R300
  },
  warning: {
    light: colors.Y300,
    dark: colors.Y300
  },
  announcement: {
    light: colors.N500,
    dark: colors.N500
  }
});
export var Container = styled.div.withConfig({
  displayName: "styled__Container",
  componentId: "sc-15ljts0-0"
})(["\n  max-height: ", ";\n  overflow: ", ";\n  background-color: ", ";\n"], getMaxHeight, function (_ref2) {
  var appearance = _ref2.appearance;
  return appearance === 'announcement' ? 'scroll' : 'visible';
}, backgroundColor);
export var testErrorBackgroundColor = colors.R400;
export var testErrorTextColor = colors.N0;
export var textColor = themed('appearance', {
  error: {
    light: colors.N0,
    dark: colors.DN40
  },
  warning: {
    light: colors.N700,
    dark: colors.DN40
  },
  announcement: {
    light: colors.N0,
    dark: colors.N0
  }
});
export var Content = styled.div.withConfig({
  displayName: "styled__Content",
  componentId: "sc-15ljts0-1"
})(["\n  align-items: center;\n  background-color: ", ";\n  color: ", ";\n  display: flex;\n  fill: ", ";\n  font-weight: 500;\n  justify-content: center;\n  padding: ", "px;\n  text-align: center;\n  ", "\n\n  margin: auto;\n  ", " transition: color ", ";\n\n  a,\n  a:visited,\n  a:hover,\n  a:active,\n  a:focus {\n    color: ", ";\n    text-decoration: underline;\n  }\n"], backgroundColor, textColor, backgroundColor, math.multiply(gridSize, 2), ''
/* transition: color ${TRANSITION_DURATION}; */
, function (_ref3) {
  var appearance = _ref3.appearance;
  return appearance === 'announcement' ? 'max-width: 876px;' : '';
}, TRANSITION_DURATION, textColor);
export var Icon = styled.span.withConfig({
  displayName: "styled__Icon",
  componentId: "sc-15ljts0-2"
})(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  flex: 0 0 auto;\n"]);

var textOverflow = function textOverflow(_ref4) {
  var appearance = _ref4.appearance;
  return appearance === 'announcement' ? '' : css(["\n        text-overflow: ellipsis;\n        white-space: nowrap;\n      "]);
};

export var Visibility = styled.div.withConfig({
  displayName: "styled__Visibility",
  componentId: "sc-15ljts0-3"
})(["\n  max-height: ", "px;\n  overflow: hidden;\n  transition: max-height ", ";\n"], function (_ref5) {
  var bannerHeight = _ref5.bannerHeight,
      isOpen = _ref5.isOpen;
  return isOpen ? bannerHeight : 0;
}, TRANSITION_DURATION);
export var Text = styled.span.withConfig({
  displayName: "styled__Text",
  componentId: "sc-15ljts0-4"
})(["\n  flex: 0 1 auto;\n  padding-left: ", "px;\n  ", ";\n  overflow: hidden;\n"], math.divide(gridSize, 2), textOverflow);