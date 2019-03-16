import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { isRowSelected } from 'prosemirror-utils';
import { clearHoverSelection } from '../../../actions';
import { TableCssClassName as ClassName } from '../../../types';
var NumberColumn = /** @class */ (function (_super) {
    tslib_1.__extends(NumberColumn, _super);
    function NumberColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hoverRows = function (index) {
            return _this.props.tableActive ? _this.props.hoverRows([index]) : null;
        };
        _this.selectRow = function (index) {
            return _this.props.tableActive ? _this.props.selectRow(index) : null;
        };
        _this.clearHoverSelection = function () {
            var _a = _this.props, tableActive = _a.tableActive, editorView = _a.editorView;
            if (tableActive) {
                var state = editorView.state, dispatch = editorView.dispatch;
                clearHoverSelection(state, dispatch);
            }
        };
        _this.getClassNames = function (index) {
            var _a = _this.props, hoveredRows = _a.hoveredRows, editorView = _a.editorView, isInDanger = _a.isInDanger, isResizing = _a.isResizing;
            var isActive = isRowSelected(index)(editorView.state.selection) ||
                ((hoveredRows || []).indexOf(index) !== -1 && !isResizing);
            return [
                ClassName.NUMBERED_COLUMN_BUTTON,
                isActive ? 'active' : '',
                isActive && isInDanger ? 'danger' : '',
            ].join(' ');
        };
        return _this;
    }
    NumberColumn.prototype.render = function () {
        var _this = this;
        var _a = this.props, tableRef = _a.tableRef, hasHeaderRow = _a.hasHeaderRow;
        var tbody = tableRef.querySelector('tbody');
        if (!tbody) {
            return null;
        }
        var rows = tbody.querySelectorAll('tr');
        return (React.createElement("div", { className: ClassName.NUMBERED_COLUMN }, Array.from(Array(rows.length).keys()).map(function (index) { return (React.createElement("div", { key: "wrapper-" + index, className: _this.getClassNames(index), style: {
                height: rows[index].offsetHeight + 1,
            }, onClick: function () { return _this.selectRow(index); }, onMouseOver: function () { return _this.hoverRows(index); }, onMouseOut: _this.clearHoverSelection }, hasHeaderRow ? (index > 0 ? index : null) : index + 1)); })));
    };
    return NumberColumn;
}(Component));
export default NumberColumn;
//# sourceMappingURL=index.js.map