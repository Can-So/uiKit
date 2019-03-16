import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { Inner, Outer } from '../styled/Icon';
import getStatusSVG from '../helpers/getStatusSVG';

var Status =
/*#__PURE__*/
function (_Component) {
  _inherits(Status, _Component);

  function Status() {
    _classCallCheck(this, Status);

    return _possibleConstructorReturn(this, _getPrototypeOf(Status).apply(this, arguments));
  }

  _createClass(Status, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          borderColor = _this$props.borderColor,
          children = _this$props.children,
          status = _this$props.status,
          size = _this$props.size;
      return React.createElement(Outer, {
        size: size,
        bgColor: borderColor
      }, React.createElement(Inner, null, children || status && getStatusSVG(status)));
    }
  }]);

  return Status;
}(Component);

export { Status as default };