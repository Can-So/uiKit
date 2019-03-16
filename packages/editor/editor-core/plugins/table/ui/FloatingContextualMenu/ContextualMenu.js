import * as tslib_1 from "tslib";
import * as React from 'react';
import { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { splitCell } from 'prosemirror-tables';
import { colors } from '@findable/theme';
import { tableBackgroundColorPalette, tableBackgroundBorderColors, } from '@findable/adf-schema';
import { mergeCells, canMergeCells, deleteColumns, deleteRows, } from '../../transforms';
import { getPluginState } from '../../pm-plugins/main';
import { hoverColumns, hoverRows, clearHoverSelection, insertColumn, insertRow, toggleContextualMenu, emptyMultipleCells, setMultipleCellAttrs, } from '../../actions';
import { TableCssClassName as ClassName } from '../../types';
import { contextualMenuDropdownWidth } from '../styles';
import { Shortcut } from '../../../../ui/styles';
import DropdownMenu from '../../../../ui/DropdownMenu';
import { analyticsService as analytics, withAnalytics, } from '../../../../analytics';
import ColorPalette from '../../../../ui/ColorPalette';
import tableMessages from '../messages';
export var messages = defineMessages({
    cellBackground: {
        id: 'fabric.editor.cellBackground',
        defaultMessage: 'Cell background',
        description: 'Change the background color of a table cell.',
    },
    mergeCells: {
        id: 'fabric.editor.mergeCells',
        defaultMessage: 'Merge cells',
        description: 'Merge tables cells together.',
    },
    splitCell: {
        id: 'fabric.editor.splitCell',
        defaultMessage: 'Split cell',
        description: 'Split a merged table cell.',
    },
    clearCells: {
        id: 'fabric.editor.clearCells',
        defaultMessage: 'Clear {0, plural, one {cell} other {cells}}',
        description: 'Clears the contents of the selected cells (this does not delete the cells themselves).',
    },
});
var ContextualMenu = /** @class */ (function (_super) {
    tslib_1.__extends(ContextualMenu, _super);
    function ContextualMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isSubmenuOpen: false,
        };
        _this.handleSubMenuRef = function (ref) {
            var boundariesElement = _this.props.boundariesElement;
            if (!(boundariesElement && ref)) {
                return;
            }
            var boundariesRect = boundariesElement.getBoundingClientRect();
            var rect = ref.getBoundingClientRect();
            if (rect.left + rect.width - boundariesRect.left > boundariesRect.width) {
                ref.style.left = "-" + rect.width + "px";
            }
        };
        _this.createItems = function () {
            var _a = _this.props, allowMergeCells = _a.allowMergeCells, allowBackgroundColor = _a.allowBackgroundColor, state = _a.editorView.state, targetCellPosition = _a.targetCellPosition, isOpen = _a.isOpen, selectionRect = _a.selectionRect, formatMessage = _a.intl.formatMessage;
            var items = [];
            var isSubmenuOpen = _this.state.isSubmenuOpen;
            if (allowBackgroundColor) {
                var node = isOpen && targetCellPosition
                    ? state.doc.nodeAt(targetCellPosition)
                    : null;
                var background = node && node.attrs.background ? node.attrs.background : '#ffffff';
                items.push({
                    content: formatMessage(messages.cellBackground),
                    value: { name: 'background' },
                    elemAfter: (React.createElement("div", null,
                        React.createElement("div", { className: ClassName.CONTEXTUAL_MENU_ICON, style: { background: background } }),
                        isSubmenuOpen && (React.createElement("div", { className: ClassName.CONTEXTUAL_SUBMENU, ref: _this.handleSubMenuRef },
                            React.createElement(ColorPalette, { palette: tableBackgroundColorPalette, borderColors: tableBackgroundBorderColors, onClick: _this.setColor, selectedColor: background, checkMarkColor: colors.N500 }))))),
                });
            }
            items.push({
                content: formatMessage(tableMessages.insertColumn),
                value: { name: 'insert_column' },
                elemAfter: React.createElement(Shortcut, null, "\u2303\u2325\u2192"),
            });
            items.push({
                content: formatMessage(tableMessages.insertRow),
                value: { name: 'insert_row' },
                elemAfter: React.createElement(Shortcut, null, "\u2303\u2325\u2193"),
            });
            var top = selectionRect.top, bottom = selectionRect.bottom, right = selectionRect.right, left = selectionRect.left;
            var noOfColumns = right - left;
            var noOfRows = bottom - top;
            items.push({
                content: formatMessage(tableMessages.removeColumns, {
                    0: noOfColumns,
                }),
                value: { name: 'delete_column' },
            });
            items.push({
                content: formatMessage(tableMessages.removeRows, {
                    0: noOfRows,
                }),
                value: { name: 'delete_row' },
            });
            if (allowMergeCells) {
                items.push({
                    content: formatMessage(messages.mergeCells),
                    value: { name: 'merge' },
                    isDisabled: !canMergeCells(state.tr),
                });
                items.push({
                    content: formatMessage(messages.splitCell),
                    value: { name: 'split' },
                    isDisabled: !splitCell(state),
                });
            }
            items.push({
                content: formatMessage(messages.clearCells, {
                    0: Math.max(noOfColumns, noOfRows),
                }),
                value: { name: 'clear' },
                elemAfter: React.createElement(Shortcut, null, "\u232B"),
            });
            return items.length ? [{ items: items }] : null;
        };
        _this.onMenuItemActivated = function (_a) {
            var item = _a.item;
            var _b = _this.props, editorView = _b.editorView, selectionRect = _b.selectionRect, targetCellPosition = _b.targetCellPosition;
            var state = editorView.state, dispatch = editorView.dispatch;
            switch (item.value.name) {
                case 'merge':
                    analytics.trackEvent('atlassian.editor.format.table.merge.button');
                    dispatch(mergeCells(state.tr));
                    _this.toggleOpen();
                    break;
                case 'split':
                    analytics.trackEvent('atlassian.editor.format.table.split.button');
                    splitCell(state, dispatch);
                    _this.toggleOpen();
                    break;
                case 'clear':
                    analytics.trackEvent('atlassian.editor.format.table.split.button');
                    emptyMultipleCells(targetCellPosition)(state, dispatch);
                    _this.toggleOpen();
                    break;
                case 'insert_column':
                    insertColumn(selectionRect.right)(state, dispatch);
                    _this.toggleOpen();
                    break;
                case 'insert_row':
                    insertRow(selectionRect.bottom)(state, dispatch);
                    _this.toggleOpen();
                    break;
                case 'delete_column':
                    analytics.trackEvent('atlassian.editor.format.table.delete_column.button');
                    dispatch(deleteColumns(getSelectedColumnIndexes(selectionRect))(state.tr));
                    _this.toggleOpen();
                    break;
                case 'delete_row':
                    analytics.trackEvent('atlassian.editor.format.table.delete_row.button');
                    var isHeaderRowRequired = getPluginState(state).pluginConfig.isHeaderRowRequired;
                    dispatch(deleteRows(getSelectedRowIndexes(selectionRect), isHeaderRowRequired)(state.tr));
                    _this.toggleOpen();
                    break;
            }
        };
        _this.toggleOpen = function () {
            var _a = _this.props, isOpen = _a.isOpen, _b = _a.editorView, state = _b.state, dispatch = _b.dispatch;
            toggleContextualMenu(state, dispatch);
            if (!isOpen) {
                _this.setState({
                    isSubmenuOpen: false,
                });
            }
        };
        _this.handleOpenChange = function () {
            var _a = _this.props.editorView, state = _a.state, dispatch = _a.dispatch;
            toggleContextualMenu(state, dispatch);
            _this.setState({ isSubmenuOpen: false });
        };
        _this.handleItemMouseEnter = function (_a) {
            var item = _a.item;
            var _b = _this.props, _c = _b.editorView, state = _c.state, dispatch = _c.dispatch, selectionRect = _b.selectionRect;
            if (item.value.name === 'background') {
                if (!_this.state.isSubmenuOpen) {
                    _this.setState({ isSubmenuOpen: true });
                }
            }
            if (item.value.name === 'delete_column') {
                hoverColumns(getSelectedColumnIndexes(selectionRect), true)(state, dispatch);
            }
            if (item.value.name === 'delete_row') {
                hoverRows(getSelectedRowIndexes(selectionRect), true)(state, dispatch);
            }
        };
        _this.handleItemMouseLeave = function (_a) {
            var item = _a.item;
            var _b = _this.props.editorView, state = _b.state, dispatch = _b.dispatch;
            if (item.value.name === 'background') {
                _this.closeSubmenu();
            }
            if (item.value.name === 'delete_column' ||
                item.value.name === 'delete_row') {
                clearHoverSelection(state, dispatch);
            }
        };
        _this.closeSubmenu = function () {
            if (_this.state.isSubmenuOpen) {
                _this.setState({ isSubmenuOpen: false });
            }
        };
        _this.setColor = withAnalytics('atlassian.editor.format.table.backgroundColor.button', function (color) {
            var _a = _this.props, targetCellPosition = _a.targetCellPosition, editorView = _a.editorView;
            var state = editorView.state, dispatch = editorView.dispatch;
            setMultipleCellAttrs({ background: color }, targetCellPosition)(state, dispatch);
            _this.toggleOpen();
        });
        return _this;
    }
    ContextualMenu.prototype.render = function () {
        var _a = this.props, isOpen = _a.isOpen, mountPoint = _a.mountPoint, offset = _a.offset, boundariesElement = _a.boundariesElement;
        var items = this.createItems();
        if (!items) {
            return null;
        }
        return (React.createElement("div", { onMouseLeave: this.closeSubmenu },
            React.createElement(DropdownMenu, { mountTo: mountPoint, items: items, isOpen: isOpen, onOpenChange: this.handleOpenChange, onItemActivated: this.onMenuItemActivated, onMouseEnter: this.handleItemMouseEnter, onMouseLeave: this.handleItemMouseLeave, fitHeight: 188, fitWidth: contextualMenuDropdownWidth, boundariesElement: boundariesElement, offset: offset })));
    };
    ContextualMenu.defaultProps = {
        boundariesElement: document.body,
    };
    return ContextualMenu;
}(Component));
export var getSelectedColumnIndexes = function (selectionRect) {
    var columnIndexes = [];
    for (var i = selectionRect.left; i < selectionRect.right; i++) {
        columnIndexes.push(i);
    }
    return columnIndexes;
};
export var getSelectedRowIndexes = function (selectionRect) {
    var rowIndexes = [];
    for (var i = selectionRect.top; i < selectionRect.bottom; i++) {
        rowIndexes.push(i);
    }
    return rowIndexes;
};
export default injectIntl(ContextualMenu);
//# sourceMappingURL=ContextualMenu.js.map