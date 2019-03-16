import styled, { css } from 'styled-components';
import { colors, fontSize, gridSize, math, themed } from '@atlaskit/theme';
var activeBackgroundColor = themed({
  light: colors.B75,
  dark: colors.DN30
});
var hoverBackgroundColor = themed({
  light: colors.N20,
  dark: colors.DN60
});
var selectedBackgroundColor = themed({
  light: colors.N0,
  dark: colors.DN30
});
var activePrimaryTextColor = themed({
  light: colors.N800,
  dark: colors.DN300
});
var defaultPrimaryTextColor = themed({
  light: colors.N800,
  dark: colors.DN600
});
var disabledPrimaryTextColor = themed({
  light: colors.N70,
  dark: colors.DN70
});
var primaryPrimaryTextColor = themed({
  light: colors.B400,
  dark: colors.B400
});
var selectedPrimaryTextColor = themed({
  light: colors.N800,
  dark: colors.N800
});
var focusedStyles = css(["\n  box-shadow: 0 0 0 2px ", "\n    inset;\n  outline: none;\n  outline-offset: 0;\n  position: relative; /* prevents bgcolor of a hovered element from obfuscating focus ring of a focused sibling element */\n"], themed({
  light: colors.B100,
  dark: colors.B75
}));
var activeStyles = css(["\n  &,\n  &:hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"], selectedBackgroundColor, selectedPrimaryTextColor);
var primaryStyles = css(["\n  color: ", ";\n"], primaryPrimaryTextColor);

var sharedStyles = function sharedStyles(props) {
  return css(["\n  align-items: center;\n  box-sizing: border-box;\n  color: ", ";\n  cursor: ", ";\n  display: ", ";\n  flex-wrap: nowrap;\n  font-size: ", "px;\n  font-weight: normal;\n  padding: 0 ", "px;\n  text-decoration: none;\n\n  &:hover {\n    background-color: ", ";\n    color: ", ";\n    text-decoration: none;\n\n    ", ";\n  }\n  &:active {\n    background-color: ", ";\n    color: ", ";\n\n    ", ";\n  }\n  &:focus {\n    ", ";\n  }\n\n  ", " ", " ", ";\n"], props.isDisabled ? disabledPrimaryTextColor : defaultPrimaryTextColor, props.isDisabled ? 'not-allowed' : 'pointer', props.isHidden ? 'none' : 'flex', fontSize, math.multiply(gridSize, 1.5), !props.isDisabled && hoverBackgroundColor, props.isDisabled ? disabledPrimaryTextColor : defaultPrimaryTextColor, props.isPrimary && primaryStyles, !props.isDisabled && activeBackgroundColor, !props.isDisabled && activePrimaryTextColor, props.isPrimary && primaryStyles, focusedStyles, props.isFocused && focusedStyles, props.isActive && activeStyles, props.isPrimary && primaryStyles);
};

export var Anchor = styled.a.withConfig({
  displayName: "Item__Anchor",
  componentId: "aiqnor-0"
})(["\n  ", ";\n"], function (props) {
  return sharedStyles(props);
});
export var Span = styled.span.withConfig({
  displayName: "Item__Span",
  componentId: "aiqnor-1"
})(["\n  ", ";\n"], function (props) {
  return sharedStyles(props);
}); // Checkbox/Radio wrapper -- sits left of the children

export var InputWrapper = styled.span.withConfig({
  displayName: "Item__InputWrapper",
  componentId: "aiqnor-2"
})(["\n  display: flex;\n  margin: 0 2px;\n"]); // Elements injected before/after the children

export var Before = styled.span.withConfig({
  displayName: "Item__Before",
  componentId: "aiqnor-3"
})(["\n  display: flex;\n"]);
export var After = styled.span.withConfig({
  displayName: "Item__After",
  componentId: "aiqnor-4"
})(["\n  align-items: center;\n  display: flex;\n"]); // Alignment and layout for the children

export var ContentWrapper = styled.span.withConfig({
  displayName: "Item__ContentWrapper",
  componentId: "aiqnor-5"
})(["\n  display: flex;\n  flex-direction: column;\n  margin: 0 ", "px;\n  padding: ", "px 0;\n  overflow: hidden;\n\n  &:first-child {\n    margin: 0;\n  }\n"], gridSize, gridSize);
export var Content = styled.span.withConfig({
  displayName: "Item__Content",
  componentId: "aiqnor-6"
})(["\n  flex: 1 1 auto;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  ", ";\n"], function (props) {
  return props.allowMultiline && css(["\n      white-space: normal;\n    "]);
}); // Description is a block element below the children, like a subtitle

export var Description = styled.span.withConfig({
  displayName: "Item__Description",
  componentId: "aiqnor-7"
})(["\n  color: ", ";\n  flex: 1 1 auto;\n  font-size: 12px;\n  line-height: 16 / 12;\n  margin-top: ", "px;\n"], colors.subtleText, math.divide(gridSize, 2)); // NOTE: Exposed as a named export for this package

export var SecondaryText = styled.span.withConfig({
  displayName: "Item__SecondaryText",
  componentId: "aiqnor-8"
})(["\n  color: ", ";\n"], colors.subtleText);