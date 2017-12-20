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

var EditorEditIcon = function EditorEditIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M15.148 6.852a.502.502 0 0 1 .708.004l2.288 2.288a.5.5 0 0 1 .004.708L11 17l-3-3 7.148-7.148zM7 15l3 3-3.51.877c-.27.068-.436-.092-.367-.367L7 15z" fill="currentColor" fill-rule="evenodd"/></svg>' }, props));
};
exports.default = EditorEditIcon;