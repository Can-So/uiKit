import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { RankableTableBodyCell } from '../../styled/rankable/TableCell';
import withDimensions from '../../hoc/withDimensions';
import { inlineStylesIfRanking } from '../../internal/helpers';

var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};

export var RankableTableCell =
/*#__PURE__*/
function (_Component) {
  _inherits(RankableTableCell, _Component);

  function RankableTableCell() {
    _classCallCheck(this, RankableTableCell);

    return _possibleConstructorReturn(this, _getPrototypeOf(RankableTableCell).apply(this, arguments));
  }

  _createClass(RankableTableCell, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          cell = _this$props.cell,
          head = _this$props.head,
          isFixedSize = _this$props.isFixedSize,
          isRanking = _this$props.isRanking,
          innerRef = _this$props.innerRef,
          refWidth = _this$props.refWidth;

      var content = cell.content,
          restCellProps = _objectWithoutProperties(cell, ["content"]);

      var _ref = head || {},
          shouldTruncate = _ref.shouldTruncate,
          width = _ref.width;

      var inlineStyles = inlineStylesIfRanking(isRanking, refWidth);
      return React.createElement(RankableTableBodyCell, _extends({}, restCellProps, {
        isFixedSize: isFixedSize,
        shouldTruncate: shouldTruncate,
        width: width,
        isRanking: isRanking,
        style: inlineStyles,
        innerRef: innerRef,
        onKeyDown: stopPropagation
      }), content);
    }
  }]);

  return RankableTableCell;
}(Component);
export default withDimensions(RankableTableCell);