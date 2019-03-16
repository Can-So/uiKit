import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import { css as _css4 } from "emotion";
import { css as _css3 } from "emotion";
import { css as _css2 } from "emotion";
import _extends from "@babel/runtime/helpers/extends";
import { css as _css } from "emotion";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React, { Component } from 'react';
import { colors, layers, gridSize } from '@atlaskit/theme';
import ArrowLeft from '@atlaskit/icon/glyph/arrow-left';
import { Slide } from './transitions';
// Misc.
var widths = {
  full: '100vw',
  extended: '95vw',
  narrow: 45 * gridSize(),
  medium: 60 * gridSize(),
  wide: 75 * gridSize()
}; // Wrapper
// ------------------------------

var Wrapper = function Wrapper(_ref) {
  var _ref$width = _ref.width,
      width = _ref$width === void 0 ? 'narrow' : _ref$width,
      shouldUnmountOnExit = _ref.shouldUnmountOnExit,
      props = _objectWithoutProperties(_ref, ["width", "shouldUnmountOnExit"]);

  return React.createElement("div", _extends({
    className: _css({
      backgroundColor: colors.N0,
      display: 'flex',
      height: '100vh',
      left: 0,
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      width: widths[width],
      zIndex: layers.blanket() + 1
    })
  }, props));
}; // Content
// ------------------------------


var Content = function Content(props) {
  return React.createElement("div", _extends({
    className: _css2({
      flex: 1,
      marginTop: 3 * gridSize(),
      overflow: 'auto'
    })
  }, props));
}; // Sidebar / Icons etc.
// ------------------------------


var Sidebar = function Sidebar(props) {
  return React.createElement("div", _extends({
    className: _css3({
      alignItems: 'center',
      boxSizing: 'border-box',
      color: colors.N500,
      display: 'flex',
      flexShrink: 0,
      flexDirection: 'column',
      height: '100vh',
      paddingBottom: 2 * gridSize(),
      paddingTop: 3 * gridSize(),
      width: 8 * gridSize()
    })
  }, props));
};

var IconWrapper = function IconWrapper(props) {
  return React.createElement("button", _extends({
    type: "button",
    className: _css4({
      alignItems: 'center',
      background: 0,
      border: 0,
      borderRadius: '50%',
      color: 'inherit',
      cursor: props.onClick ? 'pointer' : null,
      display: 'flex',
      fontSize: 'inherit',
      height: 5 * gridSize(),
      justifyContent: 'center',
      lineHeight: 1,
      marginBottom: 2 * gridSize(),
      padding: 0,
      width: 5 * gridSize(),
      '&:hover': {
        backgroundColor: props.onClick ? colors.N30A : null
      },
      '&:active': {
        backgroundColor: props.onClick ? colors.B50 : null,
        outline: 0
      }
    })
  }, props));
};

var DrawerPrimitive =
/*#__PURE__*/
function (_Component) {
  _inherits(DrawerPrimitive, _Component);

  function DrawerPrimitive() {
    _classCallCheck(this, DrawerPrimitive);

    return _possibleConstructorReturn(this, _getPrototypeOf(DrawerPrimitive).apply(this, arguments));
  }

  _createClass(DrawerPrimitive, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          Icon = _this$props.icon,
          onClose = _this$props.onClose,
          onCloseComplete = _this$props.onCloseComplete,
          props = _objectWithoutProperties(_this$props, ["children", "icon", "onClose", "onCloseComplete"]);

      return React.createElement(Slide, _extends({
        component: Wrapper,
        onExited: onCloseComplete
      }, props), React.createElement(Sidebar, null, React.createElement(IconWrapper, {
        onClick: onClose,
        "data-test-selector": "DrawerPrimitiveSidebarCloseButton"
      }, Icon ? React.createElement(Icon, {
        size: "large"
      }) : React.createElement(ArrowLeft, null))), React.createElement(Content, null, children));
    }
  }]);

  return DrawerPrimitive;
}(Component);

export { DrawerPrimitive as default };