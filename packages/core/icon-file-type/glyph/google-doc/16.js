"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../../es5/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var GoogleDoc16Icon = function GoogleDoc16Icon(props) {
  return _react.default.createElement(_index.default, _extends({
    dangerouslySetGlyph: "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" focusable=\"false\" role=\"presentation\"><path fill=\"#2196F3\" fill-rule=\"evenodd\" d=\"M2 0h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm8.287 2.5l-4.067.04 3.508 6.114 4.066-.041L10.287 2.5zM2 9.33l2.068 3.523L7.576 6.74 5.508 3.217 2 9.331zm4.984.106L4.987 13h7.015L14 9.437H6.984z\"/></svg>"
  }, props, {
    size: "small"
  }));
};

GoogleDoc16Icon.displayName = 'GoogleDoc16Icon';
var _default = GoogleDoc16Icon;
exports.default = _default;