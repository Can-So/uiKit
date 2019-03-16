import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import TableRow from './TableRow';
import withSortedPageRows from '../hoc/withSortedPageRows';

var Body =
/*#__PURE__*/
function (_Component) {
  _inherits(Body, _Component);

  function Body() {
    _classCallCheck(this, Body);

    return _possibleConstructorReturn(this, _getPrototypeOf(Body).apply(this, arguments));
  }

  _createClass(Body, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          pageRows = _this$props.pageRows,
          head = _this$props.head,
          isFixedSize = _this$props.isFixedSize;
      return React.createElement("tbody", null, pageRows.map(function (row, rowIndex) {
        return React.createElement(TableRow, {
          head: head,
          isFixedSize: isFixedSize,
          key: rowIndex // eslint-disable-line react/no-array-index-key
          ,
          row: row
        });
      }));
    }
  }]);

  return Body;
}(Component);

export default withSortedPageRows(Body);