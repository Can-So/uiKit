/* eslint no-confusing-arrow: 0 */
import styled, { css } from 'styled-components';
import { colors, themed } from '@findable/theme';
var getTransparent = themed({
  light: 'transparent',
  dark: 'transparent'
});
var selectedBackground = themed({
  light: colors.N500,
  dark: colors.N0
});
var prevSelectedBackground = themed({
  light: colors.B50,
  dark: colors.B50
});
var textDisabled = themed({
  light: colors.N40,
  dark: colors.N40
});
var textHoverSelected = themed({
  light: colors.N600,
  dark: colors.N600
});
var textPreviouslySelected = themed({
  light: colors.N600,
  dark: colors.N600
});
var textSelected = themed({
  light: colors.N0,
  dark: colors.N700
});
var textSibling = themed({
  light: colors.N200,
  dark: colors.N200
});
var hoverPreviouslySelectedBackground = themed({
  light: colors.B50,
  dark: colors.B50
});
var isActiveBackground = themed({
  light: colors.B50,
  dark: colors.B50
});
var hoverBackground = themed({
  light: colors.N30,
  dark: colors.N800
});
var getBackgroundColorSelectedAfter = themed({
  light: colors.N700,
  dark: colors.N700
});

var getBackgroundColorsAfter = function getBackgroundColorsAfter(props) {
  return props.selected ? getBackgroundColorSelectedAfter(props) : colors.primary(props);
};

var getBorderColorFocused = themed({
  light: colors.B100,
  dark: colors.B75
});

var getBorderColors = function getBorderColors(props) {
  return props.focused ? getBorderColorFocused(props) : getTransparent(props);
};

function getBackgroundColor(props) {
  if (props.selected) return selectedBackground(props);
  if (props.previouslySelected) return prevSelectedBackground(props);
  return getTransparent(props);
}

function getColor(props) {
  if (props.disabled) return textDisabled(props);
  if (props.selected) return textSelected(props);
  if (props.previouslySelected) return textPreviouslySelected(props);
  if (props.isToday) return colors.primary(props);
  if (props.sibling) return textSibling(props);
  return colors.text(props);
}

var getCursor = function getCursor(_ref) {
  var disabled = _ref.disabled;
  return disabled ? 'not-allowed' : 'pointer';
};

function getHoverBackgroundColor(props) {
  if (props.disabled) return getTransparent(props);
  if (props.previouslySelected) return hoverPreviouslySelectedBackground(props);
  if (props.isActive) return isActiveBackground(props);
  return hoverBackground(props);
}

var getHoverColor = function getHoverColor(props) {
  if (props.sibling) return textSibling(props);
  if (props.disabled) return textDisabled(props);
  if (props.selected || props.previouslySelected || props.isActive) return textHoverSelected(props);
  return colors.text(props);
};

export var DateDiv = styled.div.withConfig({
  displayName: "Date__DateDiv",
  componentId: "sc-1h7o82l-0"
})(["\n  background-color: ", ";\n  border: 2px solid ", ";\n  border-radius: 3px;\n  color: ", ";\n  cursor: ", ";\n  font-size: 14px;\n  padding: 4px 9px;\n  position: relative;\n  text-align: center;\n\n  ", " &:hover {\n    background-color: ", ";\n    color: ", ";\n  }\n"], getBackgroundColor, getBorderColors, getColor, getCursor, function (props) {
  return props.isToday ? css(["\n          font-weight: bold;\n          &::after {\n            background-color: ", ";\n            bottom: 2px;\n            content: '';\n            display: block;\n            height: 2px;\n            left: 2px;\n            position: absolute;\n            right: 2px;\n          }\n        "], getBackgroundColorsAfter(props)) : '';
}, getHoverBackgroundColor, getHoverColor);
export var DateTd = styled.td.withConfig({
  displayName: "Date__DateTd",
  componentId: "sc-1h7o82l-1"
})(["\n  border: 0;\n  padding: 0;\n  text-align: center;\n"]);