'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('../../es5/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditorHintIcon = function EditorHintIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M14 16h-4s0-.5-1-2-2.5-3-2.5-5S7 4 12 4s5.5 3 5.5 5-1.5 3.5-2.5 5-1 2-1 2zm-4 1h4v1l-1.5 2h-1L10 18v-1z" fill="currentColor" fill-rule="evenodd"/></svg>' }, props));
};
exports.default = EditorHintIcon;