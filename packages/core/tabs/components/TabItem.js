import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { NavItem, NavLine } from '../styled';

var noop = function noop() {};

var TabItem =
/*#__PURE__*/
function (_Component) {
  _inherits(TabItem, _Component);

  function TabItem() {
    _classCallCheck(this, TabItem);

    return _possibleConstructorReturn(this, _getPrototypeOf(TabItem).apply(this, arguments));
  }

  _createClass(TabItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          elementProps = _this$props.elementProps,
          innerRef = _this$props.innerRef,
          isSelected = _this$props.isSelected;
      return React.createElement(NavItem, _extends({}, elementProps, {
        innerRef: innerRef,
        status: isSelected ? 'selected' : 'normal'
      }), data.label, isSelected ? React.createElement(NavLine, {
        status: "selected"
      }) : null);
    }
  }]);

  return TabItem;
}(Component);

_defineProperty(TabItem, "defaultProps", {
  data: {},
  elementProps: {},
  innerRef: noop,
  isSelected: false
});

export { TabItem as default };