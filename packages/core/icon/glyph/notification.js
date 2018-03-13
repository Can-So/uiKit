'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../es5/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotificationIcon = function NotificationIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M6.485 17.669a2 2 0 0 0 2.829 0l-2.829-2.83a2 2 0 0 0 0 2.83zm4.897-12.191l-.725.725c-.782.782-2.21 1.813-3.206 2.311l-3.017 1.509c-.495.248-.584.774-.187 1.171l8.556 8.556c.398.396.922.313 1.171-.188l1.51-3.016c.494-.988 1.526-2.42 2.311-3.206l.725-.726a5.048 5.048 0 0 0 .64-6.356 1.01 1.01 0 1 0-1.354-1.494c-.023.025-.046.049-.066.075a5.043 5.043 0 0 0-2.788-.84 5.036 5.036 0 0 0-3.57 1.478z" fill="currentColor" fill-rule="evenodd"/></svg>' }, props));
};
exports.default = NotificationIcon;