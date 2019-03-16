import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { isCellSelection } from 'prosemirror-utils';
import { browser } from '@findable/editor-common';
import InsertButton from '../InsertButton';
import DeleteButton from '../DeleteButton';
import { isSelectionUpdated, getColumnsWidths, isColumnDeleteButtonVisible, getColumnDeleteButtonParams, isColumnInsertButtonVisible, getColumnsParams, getColumnClassNames, } from '../../../utils';
import { clearHoverSelection, hoverColumns, insertColumn, selectColumn, } from '../../../actions';
import { TableCssClassName as ClassName } from '../../../types';
import tableMessages from '../../messages';
import { deleteColumns } from '../../../transforms';
import { analyticsService } from '../../../../../analytics';
var ColumnControls = /** @class */ (function (_super) {
    tslib_1.__extends(ColumnControls, _super);
    function ColumnControls() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.deleteColumns = function (event) {
            event.preventDefault();
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            analyticsService.trackEvent('atlassian.editor.format.table.delete_column.button');
            dispatch(deleteColumns()(state.tr));
            _this.clearHoverSelection();
        };
        _this.selectColumn = function (column) {
            var editorView = _this.props.editorView;
            var state = editorView.state, dispatch = editorView.dispatch;
            // fix for issue ED-4665
            if (browser.ie_version === 11) {
                editorView.dom.blur();
            }
            selectColumn(column)(state, dispatch);
        };
        _this.hoverColumns = function (columns, danger) {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            hoverColumns(columns, danger)(state, dispatch);
        };
        _this.clearHoverSelection = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            clearHoverSelection(state, dispatch);
        };
        _this.insertColumn = function (column) {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            insertColumn(column)(state, dispatch);
        };
        return _this;
    }
    ColumnControls.prototype.shouldComponentUpdate = function (nextProps) {
        var _a = this.props, tableRef = _a.tableRef, selection = _a.selection, numberOfColumns = _a.numberOfColumns, hoveredColumns = _a.hoveredColumns, insertColumnButtonIndex = _a.insertColumnButtonIndex, isInDanger = _a.isInDanger, isResizing = _a.isResizing;
        if (nextProps.tableRef) {
            var controls = nextProps.tableRef.parentNode.firstChild;
            // checks if controls width is different from table width
            // 1px difference is acceptable and occurs in some situations due to the browser rendering specifics
            var shouldUpdate = Math.abs(controls.offsetWidth - nextProps.tableRef.offsetWidth) > 1;
            if (shouldUpdate) {
                return true;
            }
        }
        return (tableRef !== nextProps.tableRef ||
            insertColumnButtonIndex !== nextProps.insertColumnButtonIndex ||
            isInDanger !== nextProps.isInDanger ||
            isResizing !== nextProps.isResizing ||
            numberOfColumns !== nextProps.numberOfColumns ||
            hoveredColumns !== nextProps.hoveredColumns ||
            isSelectionUpdated(selection, nextProps.selection));
    };
    ColumnControls.prototype.render = function () {
        var _this = this;
        var _a = this.props, editorView = _a.editorView, tableRef = _a.tableRef, insertColumnButtonIndex = _a.insertColumnButtonIndex, hoveredColumns = _a.hoveredColumns, isInDanger = _a.isInDanger, isResizing = _a.isResizing;
        if (!tableRef || !tableRef.querySelector('tr')) {
            return null;
        }
        var selection = editorView.state.selection;
        var columnsWidths = getColumnsWidths(editorView);
        var columnsParams = getColumnsParams(columnsWidths);
        var deleteBtnParams = getColumnDeleteButtonParams(columnsWidths, selection);
        return (React.createElement("div", { className: ClassName.COLUMN_CONTROLS },
            React.createElement("div", { className: ClassName.COLUMN_CONTROLS_INNER },
                React.createElement(React.Fragment, null,
                    columnsParams.map(function (_a) {
                        var startIndex = _a.startIndex, endIndex = _a.endIndex, width = _a.width;
                        return (React.createElement("div", { className: ClassName.COLUMN_CONTROLS_BUTTON_WRAP + " " + getColumnClassNames(startIndex, selection, hoveredColumns, isInDanger, isResizing), key: startIndex, style: { width: width }, onMouseDown: function (e) { return e.preventDefault(); } },
                            React.createElement("button", { type: "button", className: ClassName.CONTROLS_BUTTON, onMouseDown: function () { return _this.selectColumn(startIndex); }, onMouseOver: function () { return _this.hoverColumns([startIndex]); }, onMouseOut: _this.clearHoverSelection }, !isCellSelection(selection) && (React.createElement(React.Fragment, null,
                                React.createElement("div", { className: ClassName.CONTROLS_BUTTON_OVERLAY, "data-index": startIndex }),
                                React.createElement("div", { className: ClassName.CONTROLS_BUTTON_OVERLAY, "data-index": endIndex })))),
                            isColumnInsertButtonVisible(endIndex, selection) && (React.createElement(InsertButton, { type: "column", tableRef: tableRef, index: endIndex, showInsertButton: !isResizing && insertColumnButtonIndex === endIndex, onMouseDown: function () { return _this.insertColumn(endIndex); } }))));
                    }),
                    isColumnDeleteButtonVisible(selection) && deleteBtnParams && (React.createElement(DeleteButton, { key: "delete", removeLabel: tableMessages.removeColumns, style: { left: deleteBtnParams.left }, onClick: this.deleteColumns, onMouseEnter: function () {
                            return _this.hoverColumns(deleteBtnParams.indexes, true);
                        }, onMouseLeave: this.clearHoverSelection }))))));
    };
    return ColumnControls;
}(Component));
export default ColumnControls;
//# sourceMappingURL=index.js.map