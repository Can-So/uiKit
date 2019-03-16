import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import ExtensionNodeView from './nodeviews/extension';
import { findDomRefAtPos, findSelectedNodeOfType } from 'prosemirror-utils';
import { closestElement } from '../../utils';
import { getExtensionNode } from './utils';
export var pluginKey = new PluginKey('extensionPlugin');
export default (function (dispatch, providerFactory, extensionHandlers, portalProviderAPI, allowExtension) {
    return new Plugin({
        state: {
            init: function () {
                var stickToolbarToBottom = true;
                var allowBreakout = false;
                if (typeof allowExtension === 'object') {
                    stickToolbarToBottom = !!allowExtension.stickToolbarToBottom;
                    allowBreakout = !!allowExtension.allowBreakout;
                }
                return {
                    element: null,
                    layout: 'default',
                    showLayoutOptions: true,
                    stickToolbarToBottom: stickToolbarToBottom,
                    node: null,
                    allowBreakout: allowBreakout,
                };
            },
            apply: function (tr, state, prevState, nextState) {
                var nextPluginState = tr.getMeta(pluginKey);
                if (nextPluginState) {
                    dispatch(pluginKey, nextPluginState);
                    return nextPluginState;
                }
                return state;
            },
        },
        view: function (editorView) {
            var domAtPos = editorView.domAtPos.bind(editorView);
            return {
                update: function (view) {
                    var editorDispatch = view.dispatch, state = view.state, schema = view.state.schema;
                    /** this fetches the selected extn node, either by keyboard selection or click for all types of extns */
                    var selectedExtNode = getExtensionNode(state);
                    var selectedExtDomNode = selectedExtNode &&
                        findDomRefAtPos(selectedExtNode.pos, domAtPos);
                    var pluginState = pluginKey.getState(state);
                    if (!selectedExtNode && !pluginState.element) {
                        return;
                    }
                    var _a = schema.nodes, extension = _a.extension, inlineExtension = _a.inlineExtension;
                    var isNonContentExt = findSelectedNodeOfType([
                        inlineExtension,
                        extension,
                    ])(state.selection);
                    /** Non-content extension can be nested in bodied-extension, the following check is necessary for that case */
                    var newElement = selectedExtNode && selectedExtDomNode.querySelector
                        ? isNonContentExt
                            ? selectedExtDomNode.querySelector('.extension-container') ||
                                selectedExtDomNode
                            : closestElement(selectedExtDomNode, '.extension-container') ||
                                selectedExtDomNode.querySelector('.extension-container') ||
                                selectedExtDomNode
                        : undefined;
                    if (pluginState.element !== newElement) {
                        editorDispatch(state.tr.setMeta(pluginKey, tslib_1.__assign({}, pluginState, { element: newElement, layout: selectedExtNode && selectedExtNode.node.attrs.layout, node: selectedExtNode })));
                        return true;
                    }
                    /** Required toolbar re-positioning */
                    dispatch(pluginKey, tslib_1.__assign({}, pluginState));
                    return true;
                },
            };
        },
        key: pluginKey,
        props: {
            nodeViews: {
                extension: ExtensionNodeView(portalProviderAPI, providerFactory, extensionHandlers),
                bodiedExtension: ExtensionNodeView(portalProviderAPI, providerFactory, extensionHandlers),
                inlineExtension: ExtensionNodeView(portalProviderAPI, providerFactory, extensionHandlers),
            },
        },
    });
});
//# sourceMappingURL=plugin.js.map