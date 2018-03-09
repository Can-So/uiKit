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

var DecisionIcon = function DecisionIcon(props) {
  return _react2.default.createElement(_index2.default, _extends({ dangerouslySetGlyph: '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><g fill="currentColor"><path d="M19.293 3.293l-5 5a1 1 0 1 0 1.414 1.414l5-5a1 1 0 1 0-1.414-1.414zM8.038 4.929a.957.957 0 1 0 .008-1.912L4.058 3A1.053 1.053 0 0 0 3 4.044l.017 4.004a.957.957 0 0 0 1.916-.008L4.92 4.916l3.118.013z"/><path d="M11 19.998A.998.998 0 0 0 12 21c.552 0 1-.454 1-1.007v-7.4c0-.556-.315-1.322-.705-1.713L5.207 3.793 3.793 5.207 11 12.414v7.584z"/></g></svg>' }, props));
};
exports.default = DecisionIcon;