import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/* eslint-disable react/no-unused-prop-types, react/prop-types, react/sort-comp */
import React, { Component } from 'react';
import { withPseudoState, getProps } from '@findable/avatar';
import { Outer, Inner } from '../styled/MoreIndicator';
var MAX_DISPLAY_COUNT = 99;

var MoreIndicator =
/*#__PURE__*/
function (_Component) {
  _inherits(MoreIndicator, _Component);

  function MoreIndicator() {
    _classCallCheck(this, MoreIndicator);

    return _possibleConstructorReturn(this, _getPrototypeOf(MoreIndicator).apply(this, arguments));
  }

  _createClass(MoreIndicator, [{
    key: "render",
    value: function render() {
      var count = this.props.count;
      var outerProps = getProps(this);
      var _this$props = this.props,
          appearance = _this$props.appearance,
          isActive = _this$props.isActive,
          isFocus = _this$props.isFocus,
          isHover = _this$props.isHover,
          size = _this$props.size;
      var innerProps = {
        appearance: appearance,
        isActive: isActive,
        isFocus: isFocus,
        isHover: isHover,
        size: size
      };
      var displayCount = count > MAX_DISPLAY_COUNT ? MAX_DISPLAY_COUNT : count;
      return React.createElement(Outer, _extends({}, outerProps, {
        isInteractive: true
      }), React.createElement(Inner, innerProps, "+", displayCount));
    }
  }]);

  return MoreIndicator;
}(Component);

_defineProperty(MoreIndicator, "defaultProps", {
  appearance: 'circle'
});

export default withPseudoState(MoreIndicator);