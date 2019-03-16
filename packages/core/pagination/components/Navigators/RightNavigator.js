import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import ChevronRightLargeIcon from '@findable/icon/glyph/chevron-right-large';
import Navigator from './Navigator';

var RightNavigator =
/*#__PURE__*/
function (_Component) {
  _inherits(RightNavigator, _Component);

  function RightNavigator() {
    _classCallCheck(this, RightNavigator);

    return _possibleConstructorReturn(this, _getPrototypeOf(RightNavigator).apply(this, arguments));
  }

  _createClass(RightNavigator, [{
    key: "render",
    value: function render() {
      return React.createElement(Navigator, this.props);
    }
  }]);

  return RightNavigator;
}(Component);

_defineProperty(RightNavigator, "defaultProps", {
  ariaLabel: 'next',
  iconBefore: React.createElement(ChevronRightLargeIcon, null),
  isDisabled: false
});

export { RightNavigator as default };