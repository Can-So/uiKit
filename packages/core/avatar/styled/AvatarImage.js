import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import styled from 'styled-components';
import { colors, themed, withTheme } from '@findable/theme';
import { Theme } from '../theme';
export var ShapeGroup = withTheme(styled.g.withConfig({
  displayName: "AvatarImage__ShapeGroup",
  componentId: "sc-1hf6c4m-0"
})(["\n  & circle,\n  & rect {\n    fill: ", ";\n  }\n  & g {\n    fill: ", ";\n  }\n"], themed({
  light: colors.N50,
  dark: colors.DN100
}), colors.background));
export var Slot = function Slot(_ref) {
  var isLoading = _ref.isLoading,
      appearance = _ref.appearance,
      size = _ref.size,
      backgroundImage = _ref.backgroundImage,
      label = _ref.label,
      role = _ref.role;
  return React.createElement(Theme.Consumer, {
    appearance: appearance,
    isLoading: isLoading,
    size: size
  }, function (_ref2) {
    var backgroundColor = _ref2.backgroundColor,
        borderRadius = _ref2.borderRadius;
    return React.createElement("span", {
      style: {
        backgroundColor: backgroundColor,
        backgroundImage: backgroundImage ? "url(".concat(backgroundImage, ")") : null,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: borderRadius,
        display: 'flex',
        flex: '1 1 100%',
        height: '100%',
        width: '100%'
      },
      role: role,
      "aria-label": label
    });
  });
};
export var Svg = function Svg(_ref3) {
  var appearance = _ref3.appearance,
      size = _ref3.size,
      children = _ref3.children,
      isLoading = _ref3.isLoading,
      otherProps = _objectWithoutProperties(_ref3, ["appearance", "size", "children", "isLoading"]);

  return React.createElement(Theme.Consumer, {
    appearance: appearance,
    isLoading: isLoading,
    size: size
  }, function (_ref4) {
    var backgroundColor = _ref4.backgroundColor,
        borderRadius = _ref4.borderRadius;
    return React.createElement("svg", _extends({
      style: {
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        height: '100%',
        width: '100%'
      }
    }, otherProps), children);
  });
};