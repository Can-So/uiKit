import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React, { Component } from 'react';
import { Head } from '../styled/TableHead';
import { validateSortKey } from '../internal/helpers';
import HeadCell from './TableHeadCell';
import RankableHeadCell from './rankable/TableHeadCell';

var TableHead =
/*#__PURE__*/
function (_Component) {
  _inherits(TableHead, _Component);

  function TableHead() {
    _classCallCheck(this, TableHead);

    return _possibleConstructorReturn(this, _getPrototypeOf(TableHead).apply(this, arguments));
  }

  _createClass(TableHead, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      validateSortKey(this.props.sortKey, this.props.head);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.sortKey !== nextProps.sortKey || this.props.head !== nextProps.head) {
        validateSortKey(nextProps.sortKey, nextProps.head);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          head = _this$props.head,
          sortKey = _this$props.sortKey,
          sortOrder = _this$props.sortOrder,
          isFixedSize = _this$props.isFixedSize,
          onSort = _this$props.onSort,
          isRanking = _this$props.isRanking,
          isRankable = _this$props.isRankable;
      if (!head) return null;
      var HeadCellComponent = isRankable ? RankableHeadCell : HeadCell;

      var cells = head.cells,
          rest = _objectWithoutProperties(head, ["cells"]);

      return React.createElement(Head, _extends({}, rest, {
        isRanking: isRanking
      }), React.createElement("tr", null, cells.map(function (cell, index) {
        var isSortable = cell.isSortable,
            key = cell.key,
            restCellProps = _objectWithoutProperties(cell, ["isSortable", "key"]);

        return React.createElement(HeadCellComponent, _extends({
          isFixedSize: isFixedSize,
          isSortable: !!isSortable,
          isRanking: isRanking,
          key: key || index,
          onClick: isSortable ? onSort(cell) : undefined,
          sortOrder: key === sortKey ? sortOrder : undefined
        }, restCellProps));
      })));
    }
  }]);

  return TableHead;
}(Component);

export default TableHead;