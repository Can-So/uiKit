import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import { TableBodyRow } from '../styled/TableRow';
import { TableBodyCell } from '../styled/TableCell';

var Row = function Row(_ref) {
  var row = _ref.row,
      head = _ref.head,
      isFixedSize = _ref.isFixedSize;

  var cells = row.cells,
      restRowProps = _objectWithoutProperties(row, ["cells"]);

  return React.createElement(TableBodyRow, restRowProps, cells.map(function (cell, cellIndex) {
    var content = cell.content,
        restCellProps = _objectWithoutProperties(cell, ["content"]);

    var _ref2 = (head || {
      cells: []
    }).cells[cellIndex] || {},
        shouldTruncate = _ref2.shouldTruncate,
        width = _ref2.width;

    return React.createElement(TableBodyCell, _extends({}, restCellProps, {
      isFixedSize: isFixedSize,
      key: cellIndex // eslint-disable-line react/no-array-index-key
      ,
      shouldTruncate: shouldTruncate,
      width: width
    }), content);
  }));
};

export default Row;