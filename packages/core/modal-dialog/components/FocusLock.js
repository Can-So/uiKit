import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import invariant from 'tiny-invariant';
import ReactFocusLock from 'react-focus-lock';

// Thin wrapper over react-focus-lock. This wrapper only exists to ensure API compatibility.
// This component should be deleted during https://ecosystem.atlassian.net/browse/AK-5658
var FocusLock =
/*#__PURE__*/
function (_Component) {
  _inherits(FocusLock, _Component);

  function FocusLock() {
    _classCallCheck(this, FocusLock);

    return _possibleConstructorReturn(this, _getPrototypeOf(FocusLock).apply(this, arguments));
  }

  _createClass(FocusLock, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          isEnabled = _this$props.isEnabled,
          autoFocus = _this$props.autoFocus;

      if (process.env.NODE_ENV !== 'production') {
        invariant(typeof autoFocus === 'boolean', '@atlaskit/modal-dialog: Passing a function as autoFocus is deprecated. Instead call focus on the element ref or use the autofocus property.');
      }

      if (typeof autoFocus === 'function' && isEnabled) {
        var elem = autoFocus();

        if (elem && elem.focus) {
          elem.focus();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          isEnabled = _this$props2.isEnabled,
          autoFocus = _this$props2.autoFocus,
          shouldReturnFocus = _this$props2.shouldReturnFocus;
      return React.createElement(ReactFocusLock, {
        disabled: !isEnabled,
        autoFocus: !!autoFocus,
        returnFocus: shouldReturnFocus
      }, this.props.children);
    }
  }]);

  return FocusLock;
}(Component);

_defineProperty(FocusLock, "defaultProps", {
  autoFocus: true,
  isEnabled: true,
  shouldReturnFocus: true
});

export { FocusLock as default };