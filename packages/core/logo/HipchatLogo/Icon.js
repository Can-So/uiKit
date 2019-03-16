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
  return "<canvas height=\"32\" width=\"32\" aria-hidden=\"true\"></canvas>\n  <svg viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\" focusable=\"false\" aria-hidden=\"true\">\n    <defs>\n      <linearGradient x1=\"50%\" x2=\"50%\" y1=\"109.344%\" y2=\"50%\" id=\"".concat(id, "\">\n        <stop stop-color=\"").concat(iconGradientStart, "\" ").concat(iconGradientStart === 'inherit' ? 'stop-opacity="0.4"' : '', " offset=\"0%\"></stop>\n        <stop stop-color=\"").concat(iconGradientStop, "\" offset=\"100%\"></stop>\n      </linearGradient>\n    </defs>\n    <g stroke=\"none\" stroke-width=\"1\" fill-rule=\"nonzero\">\n      <path d=\"M23.7345538,23.2663616 C23.7345538,23.2663616 23.8370709,23.1967963 24.005492,23.0649886 C26.4585812,21.1684211 28,18.415103 28,15.3505721 C28,9.63524027 22.6251716,5 15.9981693,5 C9.37116705,5 4,9.63524027 4,15.3505721 C4,21.0659039 9.37116705,25.7084668 15.9981693,25.7084668 C16.8443253,25.7085918 17.6887221,25.6313828 18.5208238,25.4778032 L18.780778,25.4302059 C20.4686499,26.5286041 22.9217391,27.421968 25.0672769,27.421968 C25.7372998,27.421968 26.0485126,26.8764302 25.6237986,26.3235698 C24.9757437,25.5034325 24.0823799,24.2475973 23.7345538,23.2663616 Z M22.2700229,18.7409611 C21.5560641,19.8100686 19.3409611,21.6297483 16.016476,21.6297483 L15.97254,21.6297483 C12.6443936,21.6297483 10.4292906,19.7990847 9.71899314,18.7409611 C9.57610016,18.5841129 9.48084942,18.3898014 9.44439359,18.180778 C9.43329033,18.0479311 9.4771359,17.9163408 9.56570231,17.8167036 C9.65426872,17.7170664 9.77981099,17.6580954 9.91304348,17.6535469 C10.030087,17.6573963 10.1434115,17.6955956 10.2389016,17.7633867 C11.8654801,19.0871958 13.8973189,19.8122986 15.994508,19.8173913 C18.1018351,19.8400381 20.1471166,19.1045684 21.7574371,17.7450801 C21.8437646,17.6671264 21.9559962,17.6240608 22.0723112,17.6242563 C22.3357824,17.6242486 22.5499338,17.8367653 22.5519451,18.1002288 C22.521169,18.3343594 22.4275401,18.5557793 22.2810069,18.7409611 L22.2700229,18.7409611 Z\" fill=\"url(#").concat(id, ")\"></path>\n    </g>\n  </svg>");
};

var HipchatIcon =
/*#__PURE__*/
function (_Component) {
  _inherits(HipchatIcon, _Component);

  function HipchatIcon() {
    _classCallCheck(this, HipchatIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(HipchatIcon).apply(this, arguments));
  }

  _createClass(HipchatIcon, [{
    key: "render",
    value: function render() {
      return React.createElement(Wrapper, _extends({}, this.props, {
        svg: svg
      }));
    }
  }]);

  return HipchatIcon;
}(Component);

_defineProperty(HipchatIcon, "defaultProps", DefaultProps);

export { HipchatIcon as default };