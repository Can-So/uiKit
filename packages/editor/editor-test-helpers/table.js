import { getCellsInColumn, getCellsInRow } from 'prosemirror-utils';
import { CellSelection } from 'prosemirror-tables';
export var selectColumns = function (columnIndexes) { return function (state, dispatch) {
    var tr = state.tr;
    var cells = columnIndexes.reduce(function (acc, index) {
        var cells = getCellsInColumn(index)(tr.selection);
        return cells ? acc.concat(cells) : acc;
    }, []);
    var $anchor = tr.doc.resolve(cells[0].pos);
    var $head = tr.doc.resolve(cells[cells.length - 1].pos);
    dispatch(tr.setSelection(new CellSelection($anchor, $head)));
    return true;
}; };
export var selectRows = function (rowIndexes) { return function (state, dispatch) {
    var tr = state.tr;
    var cells = rowIndexes.reduce(function (acc, index) {
        var cells = getCellsInRow(index)(tr.selection);
        return cells ? acc.concat(cells) : acc;
    }, []);
    var $anchor = tr.doc.resolve(cells[0].pos);
    var $head = tr.doc.resolve(cells[cells.length - 1].pos);
    dispatch(tr.setSelection(new CellSelection($anchor, $head)));
    return true;
}; };
//# sourceMappingURL=table.js.map