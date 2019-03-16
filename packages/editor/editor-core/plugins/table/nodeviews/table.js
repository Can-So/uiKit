import * as tslib_1 from "tslib";
import * as React from 'react';
import { DOMSerializer, } from 'prosemirror-model';
import ReactNodeView from '../../../nodeviews/ReactNodeView';
import { generateColgroup } from '../utils';
import TableComponent from './TableComponent';
import WithPluginState from '../../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../../width';
import { pluginKey, getPluginState } from '../pm-plugins/main';
import { pluginKey as tableResizingPluginKey } from '../pm-plugins/table-resizing/index';
import { contentWidth } from '../pm-plugins/table-resizing/resizer/contentWidth';
import { handleBreakoutContent } from '../pm-plugins/table-resizing/actions';
import { pluginConfig as getPluginConfig } from '../index';
import { TableCssClassName as ClassName } from '../types';
import { closestElement } from '../../../utils';
var tableAttributes = function (node) {
    return {
        'data-number-column': node.attrs.isNumberColumnEnabled,
        'data-layout': node.attrs.layout,
        'data-autosize': node.attrs.__autoSize,
    };
};
var toDOM = function (node, props) {
    var colgroup = '';
    if (props.allowColumnResizing) {
        // @ts-ignore
        colgroup = ['colgroup', {}].concat(generateColgroup(node));
    }
    return [
        'table',
        tableAttributes(node),
        colgroup,
        ['tbody', 0],
    ];
};
var TableView = /** @class */ (function (_super) {
    tslib_1.__extends(TableView, _super);
    function TableView(props) {
        var _this = _super.call(this, props.node, props.view, props.getPos, props.portalProviderAPI, props) || this;
        _this.resizeForBreakoutContent = function (target) {
            var elemOrWrapper = closestElement(target, "." + ClassName.TABLE_HEADER_NODE_WRAPPER + ", ." + ClassName.TABLE_CELL_NODE_WRAPPER) || target;
            var minWidth = contentWidth(target, target).minWidth;
            if (_this.node &&
                elemOrWrapper &&
                elemOrWrapper.getAttribute('data-colwidth') !== null &&
                elemOrWrapper.offsetWidth < minWidth) {
                var cellPos = _this.view.posAtDOM(elemOrWrapper, 0);
                handleBreakoutContent(_this.view, elemOrWrapper, cellPos - 1, _this.getPos() + 1, minWidth, _this.node);
            }
        };
        _this.handleBreakoutContent = function (records) {
            if (!records.length || !_this.contentDOM) {
                return;
            }
            var uniqueTargets = new Set();
            records.forEach(function (record) {
                var target = record.target;
                // If we've seen this target already in this set of targets
                // We dont need to reprocess.
                if (!uniqueTargets.has(target)) {
                    _this.resizeForBreakoutContent(target);
                    uniqueTargets.add(target);
                }
            });
        };
        var MutObserver = window.MutationObserver;
        _this.observer = MutObserver && new MutObserver(_this.handleBreakoutContent);
        return _this;
    }
    TableView.prototype.getContentDOM = function () {
        var rendered = DOMSerializer.renderSpec(document, toDOM(this.node, this.reactComponentProps));
        if (rendered.dom) {
            this.table = rendered.dom;
            // Ignore mutation doesn't pick up children updates
            // E.g. inserting a bodiless extension that renders
            // arbitary nodes (aka macros).
            if (this.observer) {
                this.observer.observe(rendered.dom, {
                    subtree: true,
                    childList: true,
                    attributes: true,
                });
            }
        }
        return rendered;
    };
    TableView.prototype.setDomAttrs = function (node) {
        var _this = this;
        if (!this.table) {
            return;
        }
        var attrs = tableAttributes(node);
        Object.keys(attrs).forEach(function (attr) {
            _this.table.setAttribute(attr, attrs[attr]);
        });
    };
    TableView.prototype.render = function (props, forwardRef) {
        var _this = this;
        return (React.createElement(WithPluginState, { plugins: {
                containerWidth: widthPluginKey,
                pluginState: pluginKey,
                tableResizingPluginState: tableResizingPluginKey,
            }, editorView: props.view, render: function (pluginStates) { return (React.createElement(TableComponent, tslib_1.__assign({}, props, pluginStates, { node: _this.node, width: pluginStates.containerWidth.width, contentDOM: forwardRef }))); } }));
    };
    TableView.prototype.ignoreMutation = function (record) {
        return true;
    };
    TableView.prototype.destroy = function () {
        if (this.observer) {
            this.observer.disconnect();
        }
        _super.prototype.destroy.call(this);
    };
    return TableView;
}(ReactNodeView));
export default TableView;
export var createTableView = function (portalProviderAPI, dynamicTextSizing) { return function (node, view, getPos) {
    var pluginConfig = getPluginState(view.state).pluginConfig;
    var allowColumnResizing = getPluginConfig(pluginConfig).allowColumnResizing;
    return new TableView({
        node: node,
        view: view,
        allowColumnResizing: allowColumnResizing,
        portalProviderAPI: portalProviderAPI,
        getPos: getPos,
        dynamicTextSizing: dynamicTextSizing,
    }).init();
}; };
//# sourceMappingURL=table.js.map