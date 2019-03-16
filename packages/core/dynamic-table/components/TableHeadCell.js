import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { HeadCell } from '../styled/TableHead';

var TableHeadCell =
/*#__PURE__*/
function (_Component) {
  _inherits(TableHeadCell, _Component);

  function TableHeadCell() {
    _classCallCheck(this, TableHeadCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(TableHeadCell).apply(this, arguments));
  }

  _createClass(TableHeadCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          content = _this$props.content,
          inlineStyles = _this$props.inlineStyles,
          restCellProps = _objectWithoutProperties(_this$props, ["content", "inlineStyles"]);

      return React.createElement(HeadCell, _extends({}, restCellProps, {
        style: inlineStyles
      }), React.createElement("span", null, content));
    }
  }]);

  return TableHeadCell;
}(Component);

_defineProperty(TableHeadCell, "defaultProps", {
  innerRef: function innerRef() {},
  inlineStyles: {}
});

export default TableHeadCell;