import * as tslib_1 from "tslib";
import * as React from 'react';
import styled from 'styled-components';
import { Plugin, PluginKey } from 'prosemirror-state';
import { findParentNode } from 'prosemirror-utils';
import { breakout } from '@atlaskit/adf-schema';
import { calcBreakoutWidth } from '@atlaskit/editor-common';
import { ReactNodeView } from '../../nodeviews';
import WithPluginState from '../../ui/WithPluginState';
import { pluginKey as widthPluginKey } from '../width';
import LayoutButton from './ui/LayoutButton';
import { isSupportedNodeForBreakout } from './utils/is-supported-node';
import { BreakoutCssClassName } from './constants';
export var Wrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='full-width'],\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='wide'] {\n    margin-left: 50%;\n    transform: translateX(-50%);\n  }\n"], ["\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='full-width'],\n  .ProseMirror > .breakoutView-content-wrap &[data-layout='wide'] {\n    margin-left: 50%;\n    transform: translateX(-50%);\n  }\n"])));
export var pluginKey = new PluginKey('breakoutPlugin');
export var getPluginState = function (state) { return pluginKey.getState(state); };
var BreakoutView = /** @class */ (function (_super) {
    tslib_1.__extends(BreakoutView, _super);
    function BreakoutView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BreakoutView.prototype.getContentDOM = function () {
        var dom = document.createElement('div');
        // MutationObserver bug with nodeviews @see ED-6062
        dom.className = BreakoutCssClassName.BREAKOUT_MARK_DOM;
        return { dom: dom };
    };
    BreakoutView.prototype.render = function (_props, forwardRef) {
        var mode = this.node.attrs.mode;
        return (React.createElement(WithPluginState, { editorView: this.view, plugins: { widthState: widthPluginKey }, render: function (_a) {
                var _b = _a.widthState, widthState = _b === void 0 ? { width: 0 } : _b;
                return (React.createElement(Wrapper, { className: "fabric-editor-breakout-mark", "data-layout": mode, style: { width: calcBreakoutWidth(mode, widthState.width) } },
                    React.createElement("div", { ref: forwardRef })));
            } }));
    };
    return BreakoutView;
}(ReactNodeView));
function createPlugin(_a) {
    var portalProviderAPI = _a.portalProviderAPI, providerFactory = _a.providerFactory, dispatch = _a.dispatch;
    return new Plugin({
        state: {
            init: function () {
                return {
                    breakoutNode: null,
                };
            },
            apply: function (tr, pluginState) {
                var breakoutNode = findParentNode(isSupportedNodeForBreakout)(tr.selection);
                if (!breakoutNode || breakoutNode.node !== pluginState.breakoutNode) {
                    var nextPluginState = tslib_1.__assign({}, pluginState, { breakoutNode: breakoutNode ? breakoutNode.node : null });
                    dispatch(pluginKey, nextPluginState);
                    return nextPluginState;
                }
                return pluginState;
            },
        },
        key: pluginKey,
        props: {
            nodeViews: {
                breakout: function (node, view, getPos) {
                    return new BreakoutView(node, view, getPos, portalProviderAPI, {
                        providerFactory: providerFactory,
                    }).init();
                },
            },
        },
    });
}
var breakoutPlugin = {
    pmPlugins: function () {
        return [{ name: 'breakout', plugin: createPlugin }];
    },
    marks: function () {
        return [{ name: 'breakout', mark: breakout }];
    },
    contentComponent: function (_a) {
        var editorView = _a.editorView, appearance = _a.appearance, popupsMountPoint = _a.popupsMountPoint, popupsBoundariesElement = _a.popupsBoundariesElement, popupsScrollableElement = _a.popupsScrollableElement;
        return (React.createElement(WithPluginState, { plugins: {
                pluginState: pluginKey,
            }, render: function (_a) {
                var pluginState = _a.pluginState;
                return (React.createElement(React.Fragment, null, appearance === 'full-page' && (React.createElement(LayoutButton, { editorView: editorView, mountPoint: popupsMountPoint, boundariesElement: popupsBoundariesElement, scrollableElement: popupsScrollableElement, node: pluginState.breakoutNode }))));
            } }));
    },
};
export default breakoutPlugin;
var templateObject_1;
//# sourceMappingURL=index.js.map