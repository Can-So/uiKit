import React from 'react';
import styled, { css } from 'styled-components';
import { colors, gridSize, math, themed } from '@atlaskit/theme';
import { flexMaxHeightIEFix } from '../utils/flex-max-height-ie-fix'; // Constants
// ==============================

var innerGutter = 16;
var outerGutter = 20;
var keylineColor = themed({
  light: colors.N30,
  dark: colors.DN30
});
export var keylineHeight = 2; // Wrapper
// ==============================

var DefaultWrapperComponent = styled.div.withConfig({
  displayName: "Content__DefaultWrapperComponent",
  componentId: "sc-1npw367-0"
})(["\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n  ", ";\n"], flexMaxHeightIEFix);
export var Wrapper = function Wrapper(_ref) {
  var component = _ref.component,
      children = _ref.children;
  var StyledComponent = DefaultWrapperComponent;

  if (component !== 'div') {
    // $FlowFixMe
    StyledComponent = styled(component).withConfig({
      displayName: "Content__StyledComponent",
      componentId: "sc-1npw367-1"
    })(["\n      display: flex;\n      flex-direction: column;\n      flex: 1 1 auto;\n      ", ";\n    "], flexMaxHeightIEFix);
  }

  return React.createElement(StyledComponent, null, children);
};
Wrapper.defaultProps = {
  component: 'div'
}; // Header
// ==============================

var HeaderOrFooter = styled.div.withConfig({
  displayName: "Content__HeaderOrFooter",
  componentId: "sc-1npw367-2"
})(["\n  align-items: center;\n  display: flex;\n  flex: 0 0 auto;\n  justify-content: space-between;\n  transition: box-shadow 200ms;\n  z-index: 1;\n"]);
export var Header = styled(HeaderOrFooter).withConfig({
  displayName: "Content__Header",
  componentId: "sc-1npw367-3"
})(["\n  padding: ", "px ", "px ", "px;\n  box-shadow: ", ";\n"], outerGutter, outerGutter, innerGutter - keylineHeight, function (p) {
  return p.showKeyline ? " 0 ".concat(keylineHeight, "px 0 0 ").concat(keylineColor(p)) : 'none';
}); // Title

var oneLineTitleText = css(["\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n"]);
export var Title = styled.h4.withConfig({
  displayName: "Content__Title",
  componentId: "sc-1npw367-4"
})(["\n  align-items: center;\n  display: flex;\n  font-size: 20px;\n  font-style: inherit;\n  font-weight: 500;\n  letter-spacing: -0.008em;\n  line-height: 1;\n  margin: 0;\n  min-width: 0;\n"]);
export var TitleText = styled.span.withConfig({
  displayName: "Content__TitleText",
  componentId: "sc-1npw367-5"
})(["\n  flex: 1 1 auto;\n  min-width: 0;\n  word-wrap: break-word;\n  width: 100%;\n  ", ";\n"], function (_ref2) {
  var isHeadingMultiline = _ref2.isHeadingMultiline;
  return !isHeadingMultiline && oneLineTitleText;
});
var iconColor = {
  danger: colors.R400,
  warning: colors.Y400
};
export var TitleIconWrapper = styled.span.withConfig({
  displayName: "Content__TitleIconWrapper",
  componentId: "sc-1npw367-6"
})(["\n  color: ", ";\n  margin-right: ", "px;\n  flex: 0 0 auto;\n"], function (p) {
  return iconColor[p.appearance];
}, gridSize); // Body
// ==============================

/**
  Adding the padding here avoids cropping box shadow on first/last
  children. The combined vertical spacing is maintained by subtracting the
  keyline height from header and footer.
*/

export var Body = styled.div.withConfig({
  displayName: "Content__Body",
  componentId: "sc-1npw367-7"
})(["\n  flex: 1 1 auto;\n  ", ";\n\n  @media (min-width: 320px) and (max-width: 480px) {\n    overflow-y: auto;\n    height: 100%;\n  }\n"], function (p) {
  return p.shouldScroll ? "\n          overflow-y: auto;\n          overflow-x: hidden;\n          padding: ".concat(keylineHeight, "px ").concat(outerGutter, "px;\n        ") : "\n          padding: 0 ".concat(outerGutter, "px;\n        ");
});
export var styledBody = function styledBody(component) {
  return component ? // $FlowFixMe
  styled(component).withConfig({
    displayName: "Content",
    componentId: "sc-1npw367-8"
  })(["\n        flex: 1 1 auto;\n        ", ";\n      "], function (p) {
    return p.shouldScroll ? "\n            overflow-y: auto;\n            overflow-x: hidden;\n            padding: ".concat(keylineHeight, "px ").concat(outerGutter, "px;\n          ") : "\n            border-radius: 0px;\n            padding: 0 ".concat(outerGutter, "px;\n    ");
  }) : undefined;
}; // Footer
// ==============================

export var Footer = styled(HeaderOrFooter).withConfig({
  displayName: "Content__Footer",
  componentId: "sc-1npw367-9"
})(["\n  padding: ", "px ", "px ", "px;\n  box-shadow: ", ";\n"], innerGutter - keylineHeight, outerGutter, outerGutter, function (p) {
  return p.showKeyline ? "0 -".concat(keylineHeight, "px 0 0 ").concat(keylineColor(p)) : 'none';
});
export var Actions = styled.div.withConfig({
  displayName: "Content__Actions",
  componentId: "sc-1npw367-10"
})(["\n  display: inline-flex;\n  margin: 0 -", "px;\n"], math.divide(gridSize, 2));
export var ActionItem = styled.div.withConfig({
  displayName: "Content__ActionItem",
  componentId: "sc-1npw367-11"
})(["\n  flex: 1 0 auto;\n  margin: 0 ", "px;\n"], math.divide(gridSize, 2));