import { css as _css6 } from "emotion";
import { css as _css5 } from "emotion";
import { css as _css4 } from "emotion";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import { css as _css3 } from "emotion";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { css as _css2 } from "emotion";
import _extends from "@babel/runtime/helpers/extends";
import { css as _css } from "emotion";
import React, { Fragment } from 'react';
import { keyframes } from 'emotion';
import { colors } from '@atlaskit/theme';
import { transitionDuration, transitionTimingFunction } from '../../../common/constants';
import { light, withContentTheme, ThemeProvider } from '../../../theme';
import { applyDisabledProperties } from '../../../common/helpers';
var _ref = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflowX: 'hidden',
  overflowY: 'auto',
  width: '100%'
};

/**
 * Component tree structure
 *  - ProductNavigation
 *  - ContainerNavigation
 *    - ContainerOverlay
 */
var ScrollProvider = function ScrollProvider(props) {
  return React.createElement("div", _extends({
    className: _css(_ref)
  }, props));
};
/**
 * ProductNavigation
 */


var ProductNavigationPrimitiveBase = function ProductNavigationPrimitiveBase(_ref2) {
  var children = _ref2.children,
      _ref2$theme = _ref2.theme,
      theme = _ref2$theme === void 0 ? {
    mode: light,
    context: 'product'
  } : _ref2$theme;
  return React.createElement("div", {
    className: _css2(_objectSpread({}, theme.mode.contentNav().product, {
      '&:not(:only-child)': {
        // Setting z-index ensures ScrollHints stay below the container nav
        // &:not(:only-child) sets it only when both container and product
        // nav are rendered.
        zIndex: -1
      }
    }))
  }, React.createElement(ScrollProvider, null, children));
};

var ProductNavigationPrimitive = withContentTheme(ProductNavigationPrimitiveBase);
export var ProductNavigationTheme = function ProductNavigationTheme(_ref3) {
  var children = _ref3.children;
  return React.createElement(ThemeProvider, {
    theme: function theme(oldTheme) {
      return _objectSpread({
        mode: light
      }, oldTheme, {
        context: 'product'
      });
    }
  }, React.createElement(Fragment, null, children));
};
export var ProductNavigation = function ProductNavigation(props) {
  return React.createElement(ProductNavigationTheme, null, React.createElement(ProductNavigationPrimitive, props));
};
var slideIn =
/*#__PURE__*/
keyframes(["\n  from { transform: translateX(100%); }\n  to { transform: translateX(0); }\n"]);
/**
 * ContainerNavigation
 */

var ContainerNavigationPrimitiveBase = function ContainerNavigationPrimitiveBase(_ref4) {
  var children = _ref4.children,
      isEntering = _ref4.isEntering,
      isExiting = _ref4.isExiting,
      theme = _ref4.theme;
  var animationName;
  if (isEntering) animationName = slideIn;
  var transform = isExiting ? 'translateX(100%)' : null;
  return React.createElement("div", {
    className: _css3(_objectSpread({}, theme.mode.contentNav().container, {
      animationName: animationName,
      animationDuration: transitionDuration,
      animationFillMode: 'forwards',
      animationTimingFunction: transitionTimingFunction,
      transitionProperty: 'boxShadow, transform',
      transitionDuration: transitionDuration,
      transitionTimingFunction: transitionTimingFunction,
      transform: transform
    }))
  }, React.createElement(ScrollProvider, null, children));
};

var ContainerNavigationPrimitive = withContentTheme(ContainerNavigationPrimitiveBase);
export var ContainerNavigationTheme = function ContainerNavigationTheme(_ref5) {
  var children = _ref5.children;
  return React.createElement(ThemeProvider, {
    theme: {
      mode: light,
      context: 'container'
    }
  }, React.createElement(Fragment, null, children));
};
export var ContainerNavigation = function ContainerNavigation(props) {
  return React.createElement(ContainerNavigationTheme, null, React.createElement(ContainerNavigationPrimitive, props));
};
/**
 * ContainerOverlay
 */

export var ContainerOverlay = function ContainerOverlay(_ref6) {
  var isVisible = _ref6.isVisible,
      onClick = _ref6.onClick,
      props = _objectWithoutProperties(_ref6, ["isVisible", "onClick"]);

  return React.createElement("div", _extends({
    className: _css4({
      backgroundColor: colors.N70A,
      cursor: isVisible ? 'pointer' : 'default',
      height: '100%',
      left: 0,
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'all' : 'none',
      position: 'absolute',
      top: 0,
      transitionDuration: transitionDuration,
      transitionProperty: 'opacity',
      transitionTimingFunction: transitionTimingFunction,
      width: '100%',
      zIndex: 5
    }),
    onClick: onClick,
    role: "presentation"
  }, props));
};
export var ContentNavigationWrapper = function ContentNavigationWrapper(_ref7) {
  var innerRef = _ref7.innerRef,
      disableInteraction = _ref7.disableInteraction,
      props = _objectWithoutProperties(_ref7, ["innerRef", "disableInteraction"]);

  return React.createElement("div", _extends({
    ref: innerRef,
    className: _css5(_objectSpread({
      height: '100%',
      position: 'relative'
    }, applyDisabledProperties(!!disableInteraction)))
  }, props));
};
export var ContainerNavigationMask = function ContainerNavigationMask(_ref8) {
  var disableInteraction = _ref8.disableInteraction,
      props = _objectWithoutProperties(_ref8, ["disableInteraction"]);

  return React.createElement("div", _extends({
    className: _css6(_objectSpread({
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      height: '100%'
    }, applyDisabledProperties(!!disableInteraction)))
  }, props));
};