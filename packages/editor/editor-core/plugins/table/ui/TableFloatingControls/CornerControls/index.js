import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import * as classnames from 'classnames';
import { isTableSelected, selectTable, findTable } from 'prosemirror-utils';
import { TableMap } from 'prosemirror-tables';
import InsertButton from '../InsertButton';
import { clearHoverSelection, hoverTable, insertColumn, insertRow, } from '../../../actions';
import { TableCssClassName as ClassName } from '../../../types';
var CornerControls = /** @class */ (function (_super) {
    tslib_1.__extends(CornerControls, _super);
    function CornerControls() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isActive = function () {
            var _a = _this.props, editorView = _a.editorView, hoveredRows = _a.hoveredRows, isResizing = _a.isResizing;
            var selection = editorView.state.selection;
            var table = findTable(selection);
            if (!table) {
                return false;
            }
            return (isTableSelected(selection) ||
                (hoveredRows &&
                    hoveredRows.length === TableMap.get(table.node).height &&
                    !isResizing));
        };
        _this.clearHoverSelection = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            clearHoverSelection(state, dispatch);
        };
        _this.selectTable = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            dispatch(selectTable(state.tr).setMeta('addToHistory', false));
        };
        _this.hoverTable = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            hoverTable()(state, dispatch);
        };
        _this.insertColumn = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            insertColumn(0)(state, dispatch);
        };
        _this.insertRow = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            insertRow(0)(state, dispatch);
        };
        return _this;
    }
    CornerControls.prototype.render = function () {
        var _a = this.props, isInDanger = _a.isInDanger, isResizing = _a.isResizing, isHeaderRowEnabled = _a.isHeaderRowEnabled, isHeaderColumnEnabled = _a.isHeaderColumnEnabled, insertColumnButtonIndex = _a.insertColumnButtonIndex, insertRowButtonIndex = _a.insertRowButtonIndex, tableRef = _a.tableRef;
        if (!tableRef) {
            return null;
        }
        var isActive = this.isActive();
        return (React.createElement("div", { className: classnames(ClassName.CORNER_CONTROLS, {
                active: isActive,
            }) },
            React.createElement("button", { type: "button", className: classnames(ClassName.CONTROLS_CORNER_BUTTON, {
                    danger: isActive && isInDanger,
                }), onClick: this.selectTable, onMouseOver: this.hoverTable, onMouseOut: this.clearHoverSelection }),
            !isHeaderColumnEnabled && (React.createElement(InsertButton, { type: "column", tableRef: tableRef, index: 0, showInsertButton: !isResizing && insertColumnButtonIndex === 0, onMouseDown: this.insertColumn })),
            !isHeaderRowEnabled && (React.createElement(InsertButton, { type: "row", tableRef: tableRef, index: 0, showInsertButton: !isResizing && insertRowButtonIndex === 0, onMouseDown: this.insertRow }))));
    };
    return CornerControls;
}(Component));
export default CornerControls;
//# sourceMappingURL=index.js.map