import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { RankableTableBodyRow } from '../../styled/rankable/TableRow';
import withDimensions from '../../hoc/withDimensions';
import TableCell from './TableCell';
import { inlineStylesIfRanking } from '../../internal/helpers';
export var RankableTableRow =
/*#__PURE__*/
function (_Component) {
  _inherits(RankableTableRow, _Component);

  function RankableTableRow() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RankableTableRow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RankableTableRow)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "innerRef", function (innerRefFn) {
      return function (ref) {
        innerRefFn(ref);

        _this.props.innerRef(ref);
      };
    });

    return _this;
  }

  _createClass(RankableTableRow, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          row = _this$props.row,
          head = _this$props.head,
          isFixedSize = _this$props.isFixedSize,
          isRanking = _this$props.isRanking,
          refWidth = _this$props.refWidth,
          rowIndex = _this$props.rowIndex,
          isRankingDisabled = _this$props.isRankingDisabled;

      var cells = row.cells,
          key = row.key,
          restRowProps = _objectWithoutProperties(row, ["cells", "key"]);

      var inlineStyles = inlineStylesIfRanking(isRanking, refWidth);

      if (typeof key !== 'string' && !isRankingDisabled) {
        throw new Error('dynamic-table: ranking is not possible because table row does not have a key. Add the key to the row or disable ranking.');
      }

      return React.createElement(Draggable, {
        draggableId: key || "".concat(rowIndex),
        index: rowIndex,
        isDragDisabled: isRankingDisabled
      }, function (provided, snapshot) {
        return React.createElement(RankableTableBodyRow, _extends({}, restRowProps, provided.dragHandleProps, provided.draggableProps, {
          innerRef: _this2.innerRef(provided.innerRef),
          style: _objectSpread({}, provided.draggableProps.style, inlineStyles),
          isRanking: isRanking,
          isRankingItem: snapshot.isDragging
        }), cells.map(function (cell, cellIndex) {
          var headCell = (head || {
            cells: []
          }).cells[cellIndex];
          return React.createElement(TableCell, {
            head: headCell,
            cell: cell,
            isRanking: isRanking,
            key: cellIndex // eslint-disable-line react/no-array-index-key
            ,
            isFixedSize: isFixedSize
          });
        }));
      });
    }
  }]);

  return RankableTableRow;
}(Component);
export default withDimensions(RankableTableRow);