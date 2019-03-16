import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";

/* eslint-disable max-len */
import React, { Component } from 'react';
import { uid } from 'react-uid';
import { DefaultProps } from '../constants';
import Wrapper from '../Wrapper';

var svg = function svg(iconGradientStart, iconGradientStop) {
  var id = uid({
    iconGradientStart: iconGradientStop
  });
  return "<canvas height=\"32\" width=\"32\" aria-hidden=\"true\"></canvas>\n  <svg viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\">\n    <defs>\n        <linearGradient x1=\"50%\" x2=\"50%\" y1=\"0%\" y2=\"68.184%\" id=\"".concat(id, "\">\n            <stop stop-color=\"").concat(iconGradientStart, "\" ").concat(iconGradientStart === 'inherit' ? 'stop-opacity="0.4"' : '', " offset=\"0%\"></stop>\n            <stop stop-color=\"").concat(iconGradientStop, "\" offset=\"100%\"></stop>\n        </linearGradient>\n    </defs>\n    <g stroke=\"none\" stroke-width=\"1\" fill-rule=\"nonzero\">\n      <ellipse fill=\"url(#").concat(id, ")\" cx=\"16.0000005\" cy=\"19.5878182\" rx=\"5.4000001\" ry=\"5.39981818\"></ellipse>\n      <path d=\"M3.15511518,12.9260684 L6.43896953,16.7678667 C6.68897511,17.0467148 7.11846411,17.078724 7.40809003,16.8400939 C12.7068784,12.1590845 19.2850452,12.1590845 24.5838335,16.8400939 C24.8734595,17.078724 25.3029485,17.0467148 25.552954,16.7678667 L28.8402944,12.9260684 C29.0719048,12.6494664 29.04914,12.2436871 28.7880038,11.9939938 C21.0838444,5.3353354 10.9080792,5.3353354 3.21786399,11.9939938 C2.9535556,12.2408944 2.92622614,12.6468478 3.15511518,12.9260684 Z\" fill=\"currentColor\"></path>\n    </g>\n  </svg>");
};

var StatuspageIcon =
/*#__PURE__*/
function (_Component) {
  _inherits(StatuspageIcon, _Component);

  function StatuspageIcon() {
    _classCallCheck(this, StatuspageIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(StatuspageIcon).apply(this, arguments));
  }

  _createClass(StatuspageIcon, [{
    key: "render",
    value: function render() {
      return React.createElement(Wrapper, _extends({}, this.props, {
        svg: svg
      }));
    }
  }]);

  return StatuspageIcon;
}(Component);

_defineProperty(StatuspageIcon, "defaultProps", DefaultProps);

export { StatuspageIcon as default };