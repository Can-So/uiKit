import * as tslib_1 from "tslib";
import * as React from 'react';
import { calcTableWidth, WidthConsumer, TableSharedCssClassName, akEditorTableNumberColumnWidth, akEditorWideLayoutWidth, akEditorDefaultLayoutWidth, akEditorFullWidthLayoutWidth, akEditorTableLegacyCellMinWidth, tableCellBorderWidth, tableCellMinWidth, } from '@atlaskit/editor-common';
import overflowShadow from '../../ui/overflow-shadow';
import TableHeader from './tableHeader';
import { FullPagePadding } from '../../ui/Renderer/style';
// we allow scaling down column widths by no more than 15%
var MAX_SCALING_PERCENT = 0.15;
var isHeaderRowEnabled = function (rows) {
    if (!rows.length) {
        return false;
    }
    var children = rows[0].props.children;
    if (!children.length) {
        return false;
    }
    return children[0].type === TableHeader;
};
var addNumberColumnIndexes = function (rows) {
    var headerRowEnabled = isHeaderRowEnabled(rows);
    return React.Children.map(rows, function (row, index) {
        return React.cloneElement(React.Children.only(row), {
            isNumberColumnEnabled: true,
            index: headerRowEnabled ? (index === 0 ? '' : index) : index + 1,
        });
    });
};
var getTableLayoutWidth = function (layout) {
    switch (layout) {
        case 'full-width':
            return akEditorFullWidthLayoutWidth;
        case 'wide':
            return akEditorWideLayoutWidth;
        default:
            return akEditorDefaultLayoutWidth;
    }
};
var fixColumnWidth = function (columnWidth, tableWidth, layoutWidth, zeroWidthColumnsCount, scaleDownPercent) {
    if (columnWidth === 0) {
        return columnWidth;
    }
    // If the tables total width (including no zero widths col or cols without width) is less than the current layout
    // We scale up the columns to meet the minimum of the table layout.
    if (zeroWidthColumnsCount === 0 && scaleDownPercent) {
        return Math.floor((1 - scaleDownPercent) * columnWidth);
    }
    return Math.max(
    // We need to take tableCellBorderWidth, to avoid unneccesary overflow.
    columnWidth - tableCellBorderWidth, zeroWidthColumnsCount ? akEditorTableLegacyCellMinWidth : tableCellMinWidth);
};
var Table = /** @class */ (function (_super) {
    tslib_1.__extends(Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderColgroup = function () {
            var _a = _this.props, columnWidths = _a.columnWidths, layout = _a.layout, isNumberColumnEnabled = _a.isNumberColumnEnabled, renderWidth = _a.renderWidth;
            if (!columnWidths) {
                return null;
            }
            // @see ED-6056
            var layoutWidth = getTableLayoutWidth(layout);
            var maxTableWidth = renderWidth < layoutWidth ? renderWidth : layoutWidth;
            var tableWidth = isNumberColumnEnabled ? akEditorTableNumberColumnWidth : 0;
            var minTableWidth = tableWidth;
            var zeroWidthColumnsCount = 0;
            columnWidths.forEach(function (width) {
                if (width) {
                    tableWidth += Math.ceil(width);
                }
                else {
                    zeroWidthColumnsCount += 1;
                }
                minTableWidth += Math.ceil(width) || akEditorTableLegacyCellMinWidth;
            });
            var cellMinWidth = 0;
            var scaleDownPercent = 0;
            // fixes migration tables with zero-width columns
            if (zeroWidthColumnsCount > 0) {
                if (minTableWidth > maxTableWidth) {
                    var minWidth = Math.ceil((maxTableWidth - tableWidth) / zeroWidthColumnsCount);
                    cellMinWidth =
                        minWidth < akEditorTableLegacyCellMinWidth
                            ? akEditorTableLegacyCellMinWidth
                            : minWidth;
                }
            }
            // scaling down
            else if (renderWidth < tableWidth) {
                var diffPercent = 1 - renderWidth / tableWidth;
                scaleDownPercent =
                    diffPercent < MAX_SCALING_PERCENT ? diffPercent : MAX_SCALING_PERCENT;
            }
            return (React.createElement("colgroup", null,
                isNumberColumnEnabled && (React.createElement("col", { style: { width: akEditorTableNumberColumnWidth } })),
                columnWidths.map(function (colWidth, idx) {
                    var width = fixColumnWidth(colWidth, minTableWidth, maxTableWidth, zeroWidthColumnsCount, scaleDownPercent) || cellMinWidth;
                    var style = width ? { width: width + "px" } : {};
                    return React.createElement("col", { key: idx, style: style });
                })));
        };
        return _this;
    }
    Table.prototype.render = function () {
        var _a = this.props, isNumberColumnEnabled = _a.isNumberColumnEnabled, layout = _a.layout, children = _a.children, renderWidth = _a.renderWidth;
        return (React.createElement("div", { className: TableSharedCssClassName.TABLE_CONTAINER + " " + this.props.shadowClassNames, "data-layout": layout, ref: this.props.handleRef, style: { width: calcTableWidth(layout, renderWidth, false) } },
            React.createElement("div", { className: TableSharedCssClassName.TABLE_NODE_WRAPPER },
                React.createElement("table", { "data-number-column": isNumberColumnEnabled },
                    this.renderColgroup(),
                    React.createElement("tbody", null, isNumberColumnEnabled
                        ? addNumberColumnIndexes(React.Children.toArray(children))
                        : children)))));
    };
    return Table;
}(React.Component));
var TableWithShadows = overflowShadow(Table, {
    overflowSelector: "." + TableSharedCssClassName.TABLE_NODE_WRAPPER,
    scrollableSelector: 'table',
});
var TableWithWidth = function (props) { return (React.createElement(WidthConsumer, null, function (_a) {
    var width = _a.width;
    var renderWidth = props.rendererAppearance === 'full-page'
        ? width - FullPagePadding * 2
        : width;
    return React.createElement(TableWithShadows, tslib_1.__assign({ renderWidth: renderWidth }, props));
})); };
export default TableWithWidth;
//# sourceMappingURL=table.js.map