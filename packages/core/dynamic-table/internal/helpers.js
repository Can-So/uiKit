import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
// eslint-disable-next-line import/prefer-default-export
export var getPageRows = function getPageRows(pageNumber, allRows, rowsPerPage) {
  if (!pageNumber || !rowsPerPage || !allRows.length) {
    return [];
  }

  return allRows.slice((pageNumber - 1) * rowsPerPage, pageNumber * rowsPerPage);
};
export var assertIsSortable = function assertIsSortable(head) {
  if (!head || !head.cells) return null;
  head.cells.forEach(function (cell) {
    if (cell.isSortable && !cell.key) {
      try {
        throw Error("isSortable can't be set to true, if the 'key' prop is missing.");
      } catch (e) {
        // eslint-disable-next-line
        console.error(e);
      }
    }

    return null;
  });
  return null;
};
export var validateSortKey = function validateSortKey(sortKey, head) {
  if (!sortKey) return null;
  var headHasKey = head && head.cells.map(function (cell) {
    return cell.key;
  }).includes(sortKey);

  if (!headHasKey) {
    try {
      throw Error("Cell with ".concat(sortKey, " key not found in head."));
    } catch (e) {
      // eslint-disable-next-line
      console.error(e);
    }
  }

  return null;
}; // creates inline styles if flag ranking is true

export var inlineStylesIfRanking = function inlineStylesIfRanking(isRanking, width, height) {
  if (!isRanking) {
    return {};
  }

  if (height) {
    return {
      width: width,
      height: height
    };
  }

  return {
    width: width
  };
}; // computes index of dropped item after ranking

export var computeIndex = function computeIndex(index, page, rowsPerPage) {
  var itemOnPreviousPages = rowsPerPage && isFinite(rowsPerPage) ? (page - 1) * rowsPerPage : 0;
  return index + itemOnPreviousPages;
}; // reorder rows in table after ranking

export var reorderRows = function reorderRows(rankEnd, rows) {
  var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var rowsPerPage = arguments.length > 3 ? arguments[3] : undefined;
  var destination = rankEnd.destination,
      sourceIndex = rankEnd.sourceIndex;

  if (!destination) {
    return rows;
  }

  var fromIndex = computeIndex(sourceIndex, page, rowsPerPage);
  var toIndex = computeIndex(destination.index, page, rowsPerPage);
  var reordered = rows.slice();

  var _reordered$splice = reordered.splice(fromIndex, 1),
      _reordered$splice2 = _slicedToArray(_reordered$splice, 1),
      removed = _reordered$splice2[0];

  reordered.splice(toIndex, 0, removed);
  return reordered;
};