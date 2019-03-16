import styled, { css } from 'styled-components';
import { colors } from '@atlaskit/theme';
import { getThemeStyle, themeNamespace } from '../util/theme';

var getItemState = function getItemState(stateName) {
  return function (_ref) {
    var theme = _ref.theme;
    var stateStyles = getThemeStyle(theme[themeNamespace], stateName);
    return css(["\n    background-color: ", ";\n    color: ", ";\n    fill: ", ";\n    text-decoration: none;\n\n    &:focus {\n      color: ", ";\n    }\n  "], stateStyles.background, stateStyles.text, stateStyles.background, stateStyles.text);
  };
};

var getPadding = function getPadding(_ref2) {
  var isCompact = _ref2.isCompact,
      theme = _ref2.theme,
      description = _ref2.description;
  var paddingKey = isCompact ? 'compact' : 'default';

  var _getThemeStyle = getThemeStyle(theme[themeNamespace], paddingKey, 'padding'),
      _getThemeStyle$bottom = _getThemeStyle.bottom,
      bottom = _getThemeStyle$bottom === void 0 ? 0 : _getThemeStyle$bottom,
      _getThemeStyle$left = _getThemeStyle.left,
      left = _getThemeStyle$left === void 0 ? 0 : _getThemeStyle$left,
      _getThemeStyle$right = _getThemeStyle.right,
      right = _getThemeStyle$right === void 0 ? 0 : _getThemeStyle$right,
      _getThemeStyle$top = _getThemeStyle.top,
      top = _getThemeStyle$top === void 0 ? 0 : _getThemeStyle$top;

  var adjustedTop = typeof top === 'function' ? top() : top;
  var adjustedBottom = typeof bottom === 'function' ? bottom() : bottom; // Subtract the 1px padding-bottom added to the content and description elements
  // to maintain original height

  adjustedTop = Math.max(description ? adjustedTop - 1 : adjustedTop, 0);
  adjustedBottom = Math.max(adjustedBottom - 1, 0);
  return css(["\n    padding: ", "px ", "px ", "px ", "px;\n  "], adjustedTop, right, adjustedBottom, left);
};

var getHeightStyles = function getHeightStyles(_ref3) {
  var isCompact = _ref3.isCompact,
      theme = _ref3.theme;
  var heightKey = isCompact ? 'compact' : 'default';
  var height = getThemeStyle(theme[themeNamespace], heightKey, 'height');
  return height ? css(["\n        height: ", "px;\n      "], height) : '';
}; // This function is responsible for drawing any focus styles for the element


var getInteractiveStyles = function getInteractiveStyles(_ref4) {
  var theme = _ref4.theme,
      isDisabled = _ref4.isDisabled,
      isDragging = _ref4.isDragging,
      isSelected = _ref4.isSelected;

  if (isDragging) {
    return css(["\n      ", " box-shadow: 0 4px 8px -2px ", ",\n        0 0 1px ", ";\n    "], getItemState('dragging'), colors.N60A, colors.N60A);
  }

  var standardFocus = css(["\n    &:focus {\n      box-shadow: 0 0 0 2px\n        ", " inset;\n      text-decoration: none;\n    }\n  "], getThemeStyle(theme[themeNamespace], 'outline', 'focus'));

  if (isDisabled) {
    return css(["\n      cursor: not-allowed;\n      ", " ", ";\n    "], getItemState('disabled'), standardFocus);
  }

  if (isSelected) {
    return css(["\n      ", " &:hover {\n        ", ";\n      }\n\n      &:active {\n        ", ";\n      }\n\n      ", ";\n    "], getItemState('selected'), getItemState('hover'), getItemState('active'), standardFocus);
  }

  return css(["\n    &:hover {\n      ", ";\n    }\n\n    &:active {\n      ", ";\n    }\n\n    ", ";\n  "], getItemState('hover'), getItemState('active'), standardFocus);
}; // This is the main item style. It is defined as a basic style variable so it can
// later be applied to different component types (span / a / custom link component)


export var ItemBase = function ItemBase(_ref5) {
  var theme = _ref5.theme;
  return css(["\n  && {\n    align-items: center;\n    border-radius: ", "px;\n    box-sizing: border-box;\n    cursor: pointer;\n    display: ", ";\n    flex: none;\n    ", " ", " ", " ", " &:focus {\n      /* focus shadow drawn by getInteractiveStyles */\n\n      outline: none;\n      /* relative position prevents bgcolor of a hovered element from\n      obfuscating focus ring of a focused sibling element */\n      position: relative;\n    }\n  }\n"], getThemeStyle(theme[themeNamespace], 'borderRadius'), function (_ref6) {
    var isHidden = _ref6.isHidden;
    return isHidden ? 'none' : 'flex';
  }, getItemState('default'), getPadding, getInteractiveStyles, getHeightStyles);
}; // Given some optional link-related props, returns the relevant styled
// component. For links, it styles the linkComponent if provided, otherwise
// falling back to a styled <a> tag. If no href is present, a styled <span>
// is returned. When we upgrade to styled-components@2.x we will be able to
// simplify this by taking advantage of the withComponent() functionality.

var styledRootElement = function styledRootElement(_ref7) {
  var href = _ref7.href,
      linkComponent = _ref7.linkComponent;

  if (linkComponent) {
    return styled(linkComponent).withConfig({
      displayName: "Item",
      componentId: "z6qfkt-0"
    })(["\n      ", ";\n    "], ItemBase);
  }

  if (href) {
    return styled.a.withConfig({
      displayName: "Item",
      componentId: "z6qfkt-1"
    })(["\n      ", ";\n    "], ItemBase);
  }

  return styled.span.withConfig({
    displayName: "Item",
    componentId: "z6qfkt-2"
  })(["\n    ", ";\n  "], ItemBase);
};

export default styledRootElement;