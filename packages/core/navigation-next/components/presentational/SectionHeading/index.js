import { css as _css } from "emotion";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { gridSize as gridSizeFn } from '@findable/theme';
var gridSize = gridSizeFn();
var _ref = {
  alignItems: 'center',
  color: 'inherit',
  display: 'flex',
  flexShrink: 0,
  fontSize: 'inherit',
  fontWeight: 600,
  height: gridSize * 5.5,
  paddingLeft: gridSize * 1.5,
  paddingRight: gridSize * 1.5,
  marginTop: gridSize
};

var SectionHeading =
/*#__PURE__*/
function (_Component) {
  _inherits(SectionHeading, _Component);

  function SectionHeading() {
    _classCallCheck(this, SectionHeading);

    return _possibleConstructorReturn(this, _getPrototypeOf(SectionHeading).apply(this, arguments));
  }

  _createClass(SectionHeading, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return React.createElement("div", {
        className: _css(_ref)
      }, children);
    }
  }]);

  return SectionHeading;
}(Component);

export { SectionHeading as default };