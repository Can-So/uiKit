import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _typeof from "@babel/runtime/helpers/typeof";
import React, { Component } from 'react';
import { ASC } from '../internal/constants';
import { getPageRows, validateSortKey } from '../internal/helpers';

// sort all rows based on sort key and order
var getSortedRows = function getSortedRows(head, rows, sortKey, sortOrder) {
  if (!sortKey || !head) return rows;
  if (!rows) return []; // return value which will be used for sorting

  var getSortingCellValue = function getSortingCellValue(cells) {
    return cells.reduce(function (result, cell, index) {
      return result || head && head.cells[index].key === sortKey && (cell.key !== undefined ? cell.key : cell.content);
    }, null);
  }; // Reorder rows in table based on sorting cell value
  // Algorithm will sort numerics or strings, but not both


  return rows.slice().sort(function (a, b) {
    var valA = getSortingCellValue(a.cells);
    var valB = getSortingCellValue(b.cells); // modifier used for sorting type (ascending or descending)

    var modifier = sortOrder === ASC ? 1 : -1;

    if (_typeof(valA) !== _typeof(valB)) {
      // numbers are always grouped higher in the sort
      if (typeof valA === 'number') return -1;
      if (typeof valB === 'number') return 1; // strings are grouped next

      if (typeof valA === 'string') return -1;
      if (typeof valB === 'string') return 1;
    } // Sort strings using localeCompare


    if (typeof valA === 'string' && typeof valB === 'string') {
      return modifier * valA.localeCompare(valB, undefined, {
        sensitivity: 'accent',
        numeric: true
      });
    }

    if (!valA && valA !== 0 || valA < valB) return -modifier;
    if (!valB && valB !== 0 || valA > valB) return modifier;
    if (valA === valB) return 0;
    return 1;
  });
};

// get one page of data in table, sorting all rows previously
export default function withSortedPageRows(WrappedComponent) {
  return (
    /*#__PURE__*/
    function (_Component) {
      _inherits(WithSortedPageRows, _Component);

      function WithSortedPageRows() {
        _classCallCheck(this, WithSortedPageRows);

        return _possibleConstructorReturn(this, _getPrototypeOf(WithSortedPageRows).apply(this, arguments));
      }

      _createClass(WithSortedPageRows, [{
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
              rows = _this$props.rows,
              head = _this$props.head,
              sortKey = _this$props.sortKey,
              sortOrder = _this$props.sortOrder,
              rowsPerPage = _this$props.rowsPerPage,
              page = _this$props.page,
              restProps = _objectWithoutProperties(_this$props, ["rows", "head", "sortKey", "sortOrder", "rowsPerPage", "page"]);

          var sortedRows = getSortedRows(head, rows, sortKey, sortOrder) || [];
          var pageRows = getPageRows(page, sortedRows, rowsPerPage);
          return React.createElement(WrappedComponent, _extends({
            pageRows: pageRows,
            head: head
          }, restProps));
        }
      }]);

      return WithSortedPageRows;
    }(Component)
  );
}