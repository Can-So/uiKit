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
  return "<canvas height=\"32\" width=\"32\" aria-hidden=\"true\"></canvas>\n  <svg viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\">\n    <defs>\n        <linearGradient x1=\"62.272%\" x2=\"15.737%\" y1=\"26.041%\" y2=\"68.741%\" id=\"".concat(id, "\">\n            <stop stop-color=\"").concat(iconGradientStart, "\" ").concat(iconGradientStart === 'inherit' ? 'stop-opacity="0.4"' : '', " offset=\"18%\"></stop>\n            <stop stop-color=\"").concat(iconGradientStop, "\" offset=\"100%\"></stop>\n        </linearGradient>\n    </defs>\n    <g stroke=\"none\" stroke-width=\"1\" fill-rule=\"nonzero\">\n      <path fill-rule=\"nonzero\" d=\"M10.6584152,4 L10.6584152,8.39679183 C10.6584152,14.48435 7.60464338,16.8346351 3.71947823,17.1903755 C3.30945638,17.231579 2.99793812,17.5777104 3.00000321,17.9897922 C3.00000321,19.6285964 3.00000321,23.5017703 3.00000321,25.1845425 C2.9996704,25.4044035 3.08990281,25.6146964 3.24947191,25.7659467 C3.40904102,25.9171971 3.62385939,25.9960518 3.84338782,25.9839592 C13.572289,25.4883208 19.4320134,18.3895005 19.4320134,9.57593146 L19.459993,9.57593146 L19.459993,4 L10.6584152,4 Z\" fill=\"url(#").concat(id, ")\"></path>\n      <path fill-rule=\"nonzero\" d=\"M30.1816696,24.829953 L19.8806163,4 L10.6588351,4 L21.5394976,25.3336133 C21.7449071,25.7337742 22.1569759,25.9853368 22.6067778,25.9851739 L29.4741467,25.9851739 C29.7493704,25.982283 30.0037535,25.8380195 30.1475068,25.6033038 C30.29126,25.3685881 30.304166,25.0764302 30.1816696,24.829953 Z\" fill=\"currentColor\"></path>\n    </g>\n  </svg>");
};

var StrideIcon =
/*#__PURE__*/
function (_Component) {
  _inherits(StrideIcon, _Component);

  function StrideIcon() {
    _classCallCheck(this, StrideIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(StrideIcon).apply(this, arguments));
  }

  _createClass(StrideIcon, [{
    key: "render",
    value: function render() {
      return React.createElement(Wrapper, _extends({}, this.props, {
        svg: svg
      }));
    }
  }]);

  return StrideIcon;
}(Component);

_defineProperty(StrideIcon, "defaultProps", DefaultProps);

export { StrideIcon as default };