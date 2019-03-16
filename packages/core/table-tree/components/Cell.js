import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { Cell as StyledCell, OverflowContainer } from '../styled';
import withColumnWidth from './withColumnWidth';

var Cell =
/*#__PURE__*/
function (_Component) {
  _inherits(Cell, _Component);

  function Cell() {
    _classCallCheck(this, Cell);

    return _possibleConstructorReturn(this, _getPrototypeOf(Cell).apply(this, arguments));
  }

  _createClass(Cell, [{
    key: "render",
    value: function render() {
      var props = this.props;
      return React.createElement(StyledCell, _extends({
        role: 'gridcell'
      }, props), React.createElement(OverflowContainer, {
        singleLine: props.singleLine
      }, props.children));
    }
  }]);

  return Cell;
}(Component);

export default withColumnWidth(Cell);