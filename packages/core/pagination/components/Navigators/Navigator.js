import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { StyledButton } from './styled';

var Navigator =
/*#__PURE__*/
function (_Component) {
  _inherits(Navigator, _Component);

  function Navigator() {
    _classCallCheck(this, Navigator);

    return _possibleConstructorReturn(this, _getPrototypeOf(Navigator).apply(this, arguments));
  }

  _createClass(Navigator, [{
    key: "render",
    value: function render() {
      return React.createElement(StyledButton, _extends({}, this.props, {
        appearance: "subtle",
        spacing: "none"
      }));
    }
  }]);

  return Navigator;
}(Component);

export { Navigator as default };