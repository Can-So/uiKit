import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import GlobalTheme from '@findable/theme';
import React, { Component } from 'react';
import { Container } from './Container';
import { Format } from './Format';
import { Theme } from '../theme';

var Badge =
/*#__PURE__*/
function (_Component) {
  _inherits(Badge, _Component);

  function Badge() {
    _classCallCheck(this, Badge);

    return _possibleConstructorReturn(this, _getPrototypeOf(Badge).apply(this, arguments));
  }

  _createClass(Badge, [{
    key: "componentWillUpdate",
    // TODO This can be removed when we remove support for onValueUpdated.
    value: function componentWillUpdate(nextProps) {
      var _this$props = this.props,
          children = _this$props.children,
          onValueUpdated = _this$props.onValueUpdated,
          value = _this$props.value;
      var oldValue = children;
      var newValue = nextProps.children; // This allows us to still prefer the value prop to maintain backward
      // compatibility.

      if (value != null) {
        oldValue = value;
      }

      if (nextProps.value != null) {
        newValue = nextProps.value;
      }

      if (onValueUpdated && newValue !== oldValue) {
        onValueUpdated({
          oldValue: oldValue,
          newValue: newValue
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      return React.createElement(Theme.Provider, {
        value: this.props.theme
      }, React.createElement(GlobalTheme.Consumer, null, function (_ref) {
        var mode = _ref.mode;
        return React.createElement(Theme.Consumer, {
          appearance: props.appearance,
          mode: mode
        }, function (tokens) {
          return React.createElement(Container, tokens, typeof props.children === 'string' ? props.children : React.createElement(Format, {
            max: props.max
          }, props.value || props.children));
        });
      }));
    }
  }]);

  return Badge;
}(Component);

_defineProperty(Badge, "displayName", 'Ak.Badge');

_defineProperty(Badge, "defaultProps", {
  appearance: 'default',
  children: 0,
  max: 99,
  onValueUpdated: function onValueUpdated() {},
  value: undefined
});

export { Badge as default };