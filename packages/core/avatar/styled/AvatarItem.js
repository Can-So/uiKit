import styled, { css } from 'styled-components';
import { borderRadius, colors, gridSize, math, themed, withTheme } from '@atlaskit/theme';
var focusBorderColor = themed({
  light: colors.B200,
  dark: colors.B75
});
var textColors = themed({
  light: colors.N900,
  dark: colors.DN600
});
var subtleTextColors = themed({
  light: colors.N200,
  dark: colors.DN300
});
export function getBackgroundColor(_ref) {
  var backgroundColor = _ref.backgroundColor,
      href = _ref.href,
      isActive = _ref.isActive,
      isHover = _ref.isHover,
      isSelected = _ref.isSelected,
      onClick = _ref.onClick;
  var isInteractive = href || onClick;
  var themedBackgroundColor = backgroundColor || colors.background; // Interaction: Hover

  if (isInteractive && (isHover || isSelected)) {
    themedBackgroundColor = colors.backgroundHover;
  } // Interaction: Active


  if (isInteractive && isActive) {
    themedBackgroundColor = colors.backgroundActive;
  }

  return themedBackgroundColor;
}
export function getStyles(_ref2) {
  var href = _ref2.href,
      isActive = _ref2.isActive,
      isDisabled = _ref2.isDisabled,
      isFocus = _ref2.isFocus,
      onClick = _ref2.onClick;
  var isInteractive = href || onClick;
  var borderColor = 'transparent';
  var cursor = 'auto';
  var opacity = 1;
  var outline = 'none';
  var pointerEvents = 'auto'; // Interaction: Focus

  if (isInteractive && isFocus && !isActive) {
    outline = 'none';
    borderColor = focusBorderColor;
  } // Disabled


  if (isDisabled) {
    cursor = 'not-allowed';
    opacity = 0.75;
    pointerEvents = 'none';
  } // Interactive


  if (isInteractive) {
    cursor = 'pointer';
  }

  return css(["\n    align-items: center;\n    background-color: ", ";\n    border-radius: ", "px;\n    border: 2px solid ", ";\n    box-sizing: content-box;\n    color: inherit;\n    cursor: ", ";\n    display: flex;\n    font-size: inherit;\n    font-style: normal;\n    font-weight: normal;\n    line-height: 1;\n    opacity: ", ";\n    outline: ", ";\n    margin: 0;\n    padding: ", "px;\n    pointer-events: ", ";\n    text-align: left;\n    text-decoration: none;\n    width: 100%;\n  "], getBackgroundColor, borderRadius, borderColor, cursor, opacity, outline, math.divide(gridSize, 2), pointerEvents);
}

var truncateText = function truncateText(p) {
  return p.truncate && css(["\n    overflow-x: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  "]);
};

var truncateTextFlexParent = function truncateTextFlexParent(p) {
  return p.truncate && css(["\n    max-width: 100%;\n    min-width: 0;\n  "]);
};

export var Content = styled.div.withConfig({
  displayName: "AvatarItem__Content",
  componentId: "sc-189r3pd-0"
})(["\n  ", " flex: 1 1 100%;\n  line-height: 1.4;\n  padding-left: ", "px;\n"], truncateTextFlexParent, gridSize);
export var PrimaryText = withTheme(styled.div.withConfig({
  displayName: "AvatarItem__PrimaryText",
  componentId: "sc-189r3pd-1"
})(["\n  ", " color: ", ";\n"], truncateText, textColors));
export var SecondaryText = withTheme(styled.div.withConfig({
  displayName: "AvatarItem__SecondaryText",
  componentId: "sc-189r3pd-2"
})(["\n  ", " color: ", ";\n  font-size: 0.85em;\n"], truncateText, subtleTextColors));