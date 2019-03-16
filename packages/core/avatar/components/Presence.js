import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { Inner, Outer } from '../styled/Icon';
import getPresenceSVG from '../helpers/getPresenceSVG';

var Presence =
/*#__PURE__*/
function (_Component) {
  _inherits(Presence, _Component);

  function Presence() {
    _classCallCheck(this, Presence);

    return _possibleConstructorReturn(this, _getPrototypeOf(Presence).apply(this, arguments));
  }

  _createClass(Presence, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          borderColor = _this$props.borderColor,
          children = _this$props.children,
          presence = _this$props.presence,
          size = _this$props.size;
      return React.createElement(Outer, {
        size: size,
        bgColor: borderColor
      }, React.createElement(Inner, null, children || presence && getPresenceSVG(presence)));
    }
  }]);

  return Presence;
}(Component);

export { Presence as default };