import * as tslib_1 from "tslib";
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { setCellAttrs } from '@atlaskit/adf-schema';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import ToolbarButton from '../../../ui/ToolbarButton';
import WithPluginState from '../../../ui/WithPluginState';
import messages from '../ui/messages';
import { pluginKey } from '../pm-plugins/main';
import { pluginKey as tableResizingPluginKey, } from '../pm-plugins/table-resizing';
import { toggleContextualMenu } from '../actions';
import { TableCssClassName as ClassName } from '../types';
import { closestElement } from '../../../utils';
import { pluginKey as editorDisabledPluginKey, } from '../../editor-disabled';
var Cell = /** @class */ (function (_super) {
    tslib_1.__extends(Cell, _super);
    function Cell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            var _a = _this.props.view, state = _a.state, dispatch = _a.dispatch;
            toggleContextualMenu(state, dispatch);
        };
        return _this;
    }
    Cell.prototype.shouldComponentUpdate = function (nextProps) {
        return (this.props.withCursor !== nextProps.withCursor ||
            this.props.isResizing !== nextProps.isResizing ||
            this.props.isContextualMenuOpen !== nextProps.isContextualMenuOpen);
    };
    Cell.prototype.render = function () {
        var _a = this.props, withCursor = _a.withCursor, isResizing = _a.isResizing, isContextualMenuOpen = _a.isContextualMenuOpen, forwardRef = _a.forwardRef, formatMessage = _a.intl.formatMessage, disabled = _a.disabled, appearance = _a.appearance;
        var labelCellOptions = formatMessage(messages.cellOptions);
        return (React.createElement("div", { className: ClassName.CELL_NODEVIEW_WRAPPER, ref: forwardRef }, withCursor && !disabled && appearance !== 'mobile' && (React.createElement("div", { className: ClassName.CONTEXTUAL_MENU_BUTTON_WRAP },
            React.createElement(ToolbarButton, { className: ClassName.CONTEXTUAL_MENU_BUTTON, disabled: isResizing, selected: isContextualMenuOpen, title: labelCellOptions, onClick: this.handleClick, iconBefore: React.createElement(ExpandIcon, { label: labelCellOptions }) })))));
    };
    return Cell;
}(React.Component));
var CellComponent = injectIntl(Cell);
var CellView = /** @class */ (function (_super) {
    tslib_1.__extends(CellView, _super);
    function CellView(props) {
        return _super.call(this, props.node, props.view, props.getPos, props.portalProviderAPI, props) || this;
    }
    CellView.prototype.createDomRef = function () {
        var tableCell = this.view.state.schema.nodes.tableCell;
        this.cell = document.createElement("t" + (this.node.type === tableCell ? 'd' : 'h'));
        return this.cell;
    };
    CellView.prototype.getContentDOM = function () {
        var dom = document.createElement('div');
        dom.className = ClassName.TABLE_CELL_NODEVIEW_CONTENT_DOM;
        return { dom: dom };
    };
    CellView.prototype.setDomAttrs = function (node) {
        var cell = this.cell;
        if (cell) {
            var attrs_1 = setCellAttrs(node, cell);
            Object.keys(attrs_1).forEach(function (attr) {
                var attrValue = attrs_1[attr];
                cell.setAttribute(attr, attrValue);
            });
        }
    };
    CellView.prototype.render = function (props, forwardRef) {
        var _this = this;
        // nodeview does not re-render on selection changes
        // so we trigger render manually to hide/show contextual menu button when `targetCellPosition` is updated
        return (React.createElement(WithPluginState, { plugins: {
                pluginState: pluginKey,
                tableResizingPluginState: tableResizingPluginKey,
                editorDisabledPlugin: editorDisabledPluginKey,
            }, editorView: props.view, render: function (_a) {
                var pluginState = _a.pluginState, tableResizingPluginState = _a.tableResizingPluginState, editorDisabledPlugin = _a.editorDisabledPlugin;
                return (React.createElement(CellComponent, { forwardRef: forwardRef, withCursor: _this.getPos() === pluginState.targetCellPosition, isResizing: !!tableResizingPluginState && !!tableResizingPluginState.dragging, isContextualMenuOpen: !!pluginState.isContextualMenuOpen, view: props.view, appearance: props.appearance, disabled: (editorDisabledPlugin || {}).editorDisabled }));
            } }));
    };
    CellView.prototype.ignoreMutation = function (record) {
        // @see https://github.com/ProseMirror/prosemirror/issues/862
        var target = record.target;
        if (record.attributeName === 'class' ||
            (target && closestElement(target, "." + ClassName.CELL_NODEVIEW_WRAPPER))) {
            return true;
        }
        return false;
    };
    return CellView;
}(ReactNodeView));
export var createCellView = function (portalProviderAPI, appearance) { return function (node, view, getPos) {
    return new CellView({
        node: node,
        view: view,
        getPos: getPos,
        portalProviderAPI: portalProviderAPI,
        appearance: appearance,
    }).init();
}; };
//# sourceMappingURL=cell.js.map