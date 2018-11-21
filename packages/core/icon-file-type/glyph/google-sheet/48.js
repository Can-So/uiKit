"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = _interopRequireDefault(require("../../cjs/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var GoogleSheet48Icon = function GoogleSheet48Icon(props) {
  return _react.default.createElement(_index.default, _extends({
    dangerouslySetGlyph: "<svg width=\"48\" height=\"64\" viewBox=\"0 0 48 64\" focusable=\"false\" role=\"presentation\"><g fill-rule=\"evenodd\"><path fill=\"#FFF\" stroke=\"#091E42\" stroke-opacity=\".08\" d=\"M4 .5h28.007a3.5 3.5 0 0 1 2.52 1.072l11.994 12.45a3.5 3.5 0 0 1 .979 2.429V60a3.5 3.5 0 0 1-3.5 3.5H4A3.5 3.5 0 0 1 .5 60V4A3.5 3.5 0 0 1 4 .5z\"/><path fill=\"#0A9D58\" d=\"M27.557 23.833l5.456 9.509-6.325.064-5.456-9.509 6.325-.064zM14.667 34.46l3.217 5.48 5.456-9.51-3.217-5.48-5.456 9.51zm7.753.164l-3.107 5.543h10.913l3.107-5.543H22.42z\"/></g></svg>"
  }, props, {
    size: "xlarge"
  }));
};

GoogleSheet48Icon.displayName = 'GoogleSheet48Icon';
var _default = GoogleSheet48Icon;
exports.default = _default;