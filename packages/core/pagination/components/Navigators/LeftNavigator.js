import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import ChevronLeftLargeIcon from '@findable/icon/glyph/chevron-left-large';
import Navigator from './Navigator';

var LeftNavigator =
/*#__PURE__*/
function (_Component) {
  _inherits(LeftNavigator, _Component);

  function LeftNavigator() {
    _classCallCheck(this, LeftNavigator);

    return _possibleConstructorReturn(this, _getPrototypeOf(LeftNavigator).apply(this, arguments));
  }

  _createClass(LeftNavigator, [{
    key: "render",
    value: function render() {
      return React.createElement(Navigator, this.props);
    }
  }]);

  return LeftNavigator;
}(Component);

_defineProperty(LeftNavigator, "defaultProps", {
  ariaLabel: 'previous',
  iconBefore: React.createElement(ChevronLeftLargeIcon, null),
  isDisabled: false
});

export { LeftNavigator as default };