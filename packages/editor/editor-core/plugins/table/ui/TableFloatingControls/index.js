import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { browser } from '@findable/editor-common';
import CornerControls from './CornerControls';
import RowControls from './RowControls';
import NumberColumn from './NumberColumn';
import { isSelectionUpdated } from '../../utils';
import { clearHoverSelection, hoverRows, selectRow } from '../../actions';
var TableFloatingControls = /** @class */ (function (_super) {
    tslib_1.__extends(TableFloatingControls, _super);
    function TableFloatingControls() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectRow = function (row) {
            var editorView = _this.props.editorView;
            var state = editorView.state, dispatch = editorView.dispatch;
            // fix for issue ED-4665
            if (browser.ie_version === 11) {
                editorView.dom.blur();
            }
            selectRow(row)(state, dispatch);
            clearHoverSelection(editorView.state, dispatch);
        };
        _this.hoverRows = function (rows, danger) {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            hoverRows(rows, danger)(state, dispatch);
        };
        return _this;
    }
    TableFloatingControls.prototype.shouldComponentUpdate = function (nextProps) {
        var _a = this.props, tableRef = _a.tableRef, isInDanger = _a.isInDanger, isResizing = _a.isResizing, isHeaderRowEnabled = _a.isHeaderRowEnabled, isHeaderColumnEnabled = _a.isHeaderColumnEnabled, isNumberColumnEnabled = _a.isNumberColumnEnabled, hoveredRows = _a.hoveredRows, selection = _a.selection, tableHeight = _a.tableHeight, tableActive = _a.tableActive, insertColumnButtonIndex = _a.insertColumnButtonIndex, insertRowButtonIndex = _a.insertRowButtonIndex;
        return (tableRef !== nextProps.tableRef ||
            insertColumnButtonIndex !== nextProps.insertColumnButtonIndex ||
            insertRowButtonIndex !== nextProps.insertRowButtonIndex ||
            tableHeight !== nextProps.tableHeight ||
            tableActive !== nextProps.tableActive ||
            isInDanger !== nextProps.isInDanger ||
            isResizing !== nextProps.isResizing ||
            hoveredRows !== nextProps.hoveredRows ||
            isHeaderRowEnabled !== nextProps.isHeaderRowEnabled ||
            isHeaderColumnEnabled !== nextProps.isHeaderColumnEnabled ||
            isNumberColumnEnabled !== nextProps.isNumberColumnEnabled ||
            isSelectionUpdated(selection, nextProps.selection));
    };
    TableFloatingControls.prototype.render = function () {
        var _a = this.props, editorView = _a.editorView, tableRef = _a.tableRef, isInDanger = _a.isInDanger, isResizing = _a.isResizing, isNumberColumnEnabled = _a.isNumberColumnEnabled, isHeaderColumnEnabled = _a.isHeaderColumnEnabled, isHeaderRowEnabled = _a.isHeaderRowEnabled, tableActive = _a.tableActive, hasHeaderRow = _a.hasHeaderRow, hoveredRows = _a.hoveredRows, insertColumnButtonIndex = _a.insertColumnButtonIndex, insertRowButtonIndex = _a.insertRowButtonIndex;
        if (!tableRef) {
            return null;
        }
        return (React.createElement("div", { onMouseDown: function (e) { return e.preventDefault(); } },
            isNumberColumnEnabled ? (React.createElement(NumberColumn, { editorView: editorView, hoverRows: this.hoverRows, tableRef: tableRef, tableActive: tableActive, hoveredRows: hoveredRows, hasHeaderRow: hasHeaderRow, isInDanger: isInDanger, isResizing: isResizing, selectRow: this.selectRow })) : null,
            React.createElement(CornerControls, { editorView: editorView, tableRef: tableRef, isInDanger: isInDanger, isResizing: isResizing, isHeaderColumnEnabled: isHeaderColumnEnabled, isHeaderRowEnabled: isHeaderRowEnabled, insertColumnButtonIndex: insertColumnButtonIndex, insertRowButtonIndex: insertRowButtonIndex, hoveredRows: hoveredRows }),
            React.createElement(RowControls, { editorView: editorView, tableRef: tableRef, hoverRows: this.hoverRows, hoveredRows: hoveredRows, isInDanger: isInDanger, isResizing: isResizing, selectRow: this.selectRow, insertRowButtonIndex: insertRowButtonIndex })));
    };
    return TableFloatingControls;
}(Component));
export default TableFloatingControls;
//# sourceMappingURL=index.js.map