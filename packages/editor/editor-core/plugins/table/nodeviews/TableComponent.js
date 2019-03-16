import * as tslib_1 from "tslib";
import * as React from 'react';
import rafSchedule from 'raf-schd';
import { TableMap } from 'prosemirror-tables';
import { findParentNodeOfTypeClosestToPos } from 'prosemirror-utils';
import { browser, calcTableWidth, akEditorMobileBreakoutPoint, absoluteBreakoutWidth, } from '@atlaskit/editor-common';
import TableFloatingControls from '../ui/TableFloatingControls';
import ColumnControls from '../ui/TableFloatingControls/ColumnControls';
import { getPluginState } from '../pm-plugins/main';
import { scaleTable } from '../pm-plugins/table-resizing';
import { TableCssClassName as ClassName } from '../types';
import * as classnames from 'classnames';
var isIE11 = browser.ie_version === 11;
import { containsHeaderRow, checkIfHeaderColumnEnabled, checkIfHeaderRowEnabled, tablesHaveDifferentColumnWidths, insertColgroupFromNode as recreateResizeColsByNode, } from '../utils';
import { autoSizeTable } from '../actions';
var TableComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TableComponent, _super);
    function TableComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            scroll: 0,
            tableContainerWidth: 'inherit',
            parentWidth: undefined,
        };
        _this.handleScroll = function (event) {
            if (!_this.wrapper || event.target !== _this.wrapper) {
                return;
            }
            _this.setState({ scroll: _this.wrapper.scrollLeft });
        };
        _this.handleTableResizing = function (prevProps) {
            var _a = _this.props, view = _a.view, node = _a.node, getPos = _a.getPos, containerWidth = _a.containerWidth, dynamicTextSizing = _a.dynamicTextSizing;
            var prevAttrs = prevProps.node.attrs;
            var currentAttrs = node.attrs;
            var prevMap = TableMap.get(prevProps.node);
            var currentMap = TableMap.get(node);
            // We only consider a layout change valid if it's done outside of an autoSize.
            var layoutChanged = prevAttrs.layout !== currentAttrs.layout &&
                prevAttrs.__autoSize === currentAttrs.__autoSize;
            var parentWidth = _this.getParentNodeWidth(view.state, containerWidth.width);
            var parentWidthChanged = parentWidth && parentWidth !== _this.state.parentWidth;
            if (layoutChanged ||
                parentWidthChanged ||
                prevMap.width !== currentMap.width ||
                prevProps.containerWidth !== containerWidth ||
                prevAttrs.isNumberColumnEnabled !== currentAttrs.isNumberColumnEnabled) {
                scaleTable(view, _this.table, node, prevProps.node, getPos(), containerWidth.width, false, parentWidth, dynamicTextSizing);
                _this.updateParentWidth(parentWidth);
            }
            _this.updateTableContainerWidth();
        };
        _this.handleAutoSize = function () {
            if (_this.table) {
                var _a = _this.props, view = _a.view, node = _a.node, getPos = _a.getPos, _b = _a.dynamicTextSizing, dynamicTextSizing = _b === void 0 ? false : _b, containerWidth = _a.containerWidth;
                autoSizeTable(view, node, _this.table, getPos(), {
                    dynamicTextSizing: dynamicTextSizing,
                    containerWidth: containerWidth.width,
                });
            }
        };
        _this.updateTableContainerWidth = function () {
            var _a = _this.props, node = _a.node, containerWidth = _a.containerWidth;
            _this.setState(function (prevState) {
                var tableContainerWidth = calcTableWidth(node.attrs.layout, containerWidth.width);
                if (prevState.tableContainerWidth === tableContainerWidth) {
                    return null;
                }
                return {
                    tableContainerWidth: tableContainerWidth,
                };
            });
        };
        _this.getParentNode = function (state) {
            var pos = _this.props.getPos();
            if (!pos) {
                return;
            }
            var $pos = state.doc.resolve(pos);
            var parent = findParentNodeOfTypeClosestToPos($pos, [
                state.schema.nodes.bodiedExtension,
                state.schema.nodes.layoutSection,
            ]);
            return parent && parent.node;
        };
        _this.getParentNodeWidth = function (state, containerWidth) {
            var node = _this.getParentNode(state);
            if (!node) {
                return;
            }
            if (node.attrs.layout) {
                return absoluteBreakoutWidth(node.attrs.layout, containerWidth);
            }
            var parentWidth = absoluteBreakoutWidth('default', containerWidth);
            var schema = state.schema;
            var breakoutMark = schema.marks.breakout && schema.marks.breakout.isInSet(node.marks);
            if (breakoutMark && breakoutMark.attrs.mode) {
                parentWidth = absoluteBreakoutWidth(breakoutMark.attrs.mode, containerWidth);
            }
            if (node.type === schema.nodes.layoutSection) {
                parentWidth = parentWidth / node.childCount;
            }
            return parentWidth;
        };
        _this.updateParentWidth = function (width) {
            _this.setState({ parentWidth: width });
        };
        _this.scaleTableDebounced = rafSchedule(scaleTable);
        _this.handleTableResizingDebounced = rafSchedule(_this.handleTableResizing);
        _this.handleScrollDebounced = rafSchedule(_this.handleScroll);
        _this.handleAutoSizeDebounced = rafSchedule(_this.handleAutoSize);
        // Disable inline table editing and resizing controls in Firefox
        // https://github.com/ProseMirror/prosemirror/issues/432
        if ('execCommand' in document) {
            ['enableObjectResizing', 'enableInlineTableEditing'].forEach(function (cmd) {
                if (document.queryCommandSupported(cmd)) {
                    document.execCommand(cmd, false, 'false');
                }
            });
        }
        return _this;
    }
    TableComponent.prototype.componentDidMount = function () {
        var allowColumnResizing = this.props.allowColumnResizing;
        if (allowColumnResizing && this.wrapper && !isIE11) {
            this.wrapper.addEventListener('scroll', this.handleScrollDebounced);
        }
        if (allowColumnResizing) {
            var _a = this.props, view = _a.view, node = _a.node, containerWidth = _a.containerWidth, getPos = _a.getPos, dynamicTextSizing = _a.dynamicTextSizing;
            if (node.attrs.__autoSize === false) {
                var parentWidth = this.getParentNodeWidth(view.state, containerWidth.width);
                this.scaleTableDebounced(view, this.table, node, node, getPos(), containerWidth.width, true, parentWidth, dynamicTextSizing);
            }
            this.updateTableContainerWidth();
        }
    };
    TableComponent.prototype.componentWillUnmount = function () {
        if (this.wrapper && !isIE11) {
            this.wrapper.removeEventListener('scroll', this.handleScrollDebounced);
        }
        this.handleScrollDebounced.cancel();
    };
    TableComponent.prototype.componentDidUpdate = function (prevProps) {
        updateRightShadow(this.wrapper, this.table, this.rightShadow);
        if (this.props.node.attrs.__autoSize) {
            // Wait for next tick to handle auto sizing, gives the browser time to do layout calc etc.
            this.handleAutoSizeDebounced();
        }
        else if (this.props.allowColumnResizing && this.table) {
            // If col widths have changed (e.g. via collab), re-draw colgroup.
            if (tablesHaveDifferentColumnWidths(this.props.node, prevProps.node)) {
                recreateResizeColsByNode(this.table, this.props.node);
            }
            this.handleTableResizingDebounced(prevProps);
        }
    };
    TableComponent.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, view = _b.view, node = _b.node, pluginState = _b.pluginState, tableResizingPluginState = _b.tableResizingPluginState, width = _b.width;
        var _c = pluginState.pluginConfig.allowControls, allowControls = _c === void 0 ? true : _c;
        // doesn't work well with WithPluginState
        var _d = getPluginState(view.state), isInDanger = _d.isInDanger, hoveredColumns = _d.hoveredColumns, hoveredRows = _d.hoveredRows, insertColumnButtonIndex = _d.insertColumnButtonIndex, insertRowButtonIndex = _d.insertRowButtonIndex;
        var tableRef = this.table || undefined;
        var tableActive = this.table === pluginState.tableRef;
        var isResizing = !!tableResizingPluginState && !!tableResizingPluginState.dragging;
        var scroll = this.state.scroll;
        var rowControls = [
            React.createElement("div", { key: 0, className: ClassName.ROW_CONTROLS_WRAPPER + " " + (scroll > 0 ? ClassName.TABLE_LEFT_SHADOW : '') },
                React.createElement(TableFloatingControls, { editorView: view, tableRef: tableRef, tableActive: tableActive, hoveredRows: hoveredRows, isInDanger: isInDanger, isResizing: isResizing, isNumberColumnEnabled: node.attrs.isNumberColumnEnabled, isHeaderColumnEnabled: checkIfHeaderColumnEnabled(view.state), isHeaderRowEnabled: checkIfHeaderRowEnabled(view.state), hasHeaderRow: containsHeaderRow(view.state, node), 
                    // pass `selection` and `tableHeight` to control re-render
                    selection: view.state.selection, tableHeight: tableRef ? tableRef.offsetHeight : undefined, insertColumnButtonIndex: insertColumnButtonIndex, insertRowButtonIndex: insertRowButtonIndex })),
        ];
        var columnControls = [
            React.createElement("div", { key: 0, className: ClassName.COLUMN_CONTROLS_WRAPPER },
                React.createElement(ColumnControls, { editorView: view, tableRef: tableRef, hoveredColumns: hoveredColumns, isInDanger: isInDanger, isResizing: isResizing, 
                    // pass `selection` and `numberOfColumns` to control re-render
                    selection: view.state.selection, numberOfColumns: node.firstChild.childCount, insertColumnButtonIndex: insertColumnButtonIndex })),
        ];
        return (React.createElement("div", { style: {
                width: this.state.tableContainerWidth,
            }, className: classnames(ClassName.TABLE_CONTAINER, (_a = {},
                _a[ClassName.WITH_CONTROLS] = tableActive,
                _a['less-padding'] = width < akEditorMobileBreakoutPoint,
                _a)), "data-number-column": node.attrs.isNumberColumnEnabled, "data-layout": node.attrs.layout },
            allowControls && rowControls,
            React.createElement("div", { className: classnames(ClassName.TABLE_NODE_WRAPPER), ref: function (elem) {
                    _this.wrapper = elem;
                    _this.props.contentDOM(elem ? elem : undefined);
                    if (elem) {
                        _this.table = elem.querySelector('table');
                    }
                } }, allowControls && columnControls),
            React.createElement("div", { ref: function (elem) {
                    _this.rightShadow = elem;
                }, className: ClassName.TABLE_RIGHT_SHADOW })));
    };
    return TableComponent;
}(React.Component));
export var updateRightShadow = function (wrapper, table, rightShadow) {
    if (table && wrapper && rightShadow) {
        var diff = table.offsetWidth - wrapper.offsetWidth;
        rightShadow.style.display =
            diff > 0 && diff > wrapper.scrollLeft ? 'block' : 'none';
    }
    return;
};
export default TableComponent;
//# sourceMappingURL=TableComponent.js.map