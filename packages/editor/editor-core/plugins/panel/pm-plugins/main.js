import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import { findParentDomRefOfType, findParentNodeOfType, } from 'prosemirror-utils';
import { panelNodeView } from '../nodeviews/panel';
export var availablePanelType = [
    'info',
    'note',
    'success',
    'warning',
    'error',
];
export var getPluginState = function (state) {
    return pluginKey.getState(state);
};
export var setPluginState = function (stateProps) { return function (state, dispatch) {
    var pluginState = getPluginState(state);
    if (dispatch) {
        dispatch(state.tr.setMeta(pluginKey, tslib_1.__assign({}, pluginState, stateProps)));
    }
    return true;
}; };
export var pluginKey = new PluginKey('panelPlugin');
export var createPlugin = function (_a) {
    var portalProviderAPI = _a.portalProviderAPI, dispatch = _a.dispatch;
    return new Plugin({
        state: {
            init: function () {
                return {
                    element: null,
                    activePanelType: undefined,
                    toolbarVisible: false,
                };
            },
            apply: function (tr, pluginState) {
                var nextPluginState = tr.getMeta(pluginKey);
                if (nextPluginState) {
                    dispatch(pluginKey, nextPluginState);
                    return nextPluginState;
                }
                return pluginState;
            },
        },
        key: pluginKey,
        view: function () {
            return {
                update: function (view) {
                    var _a = view.state, selection = _a.selection, panel = _a.schema.nodes.panel;
                    var pluginState = getPluginState(view.state);
                    var parent = findParentNodeOfType(panel)(selection);
                    var parentDOM = findParentDomRefOfType(panel, view.domAtPos.bind(view))(selection);
                    if (parentDOM !== pluginState.element) {
                        setPluginState({
                            element: parentDOM,
                            activePanelType: parent && parent.node.attrs['panelType'],
                            toolbarVisible: !!parent,
                        })(view.state, view.dispatch);
                        return true;
                    }
                    /** Plugin dispatch needed to reposition the toolbar */
                    dispatch(pluginKey, tslib_1.__assign({}, pluginState));
                },
            };
        },
        props: {
            nodeViews: {
                panel: panelNodeView(portalProviderAPI),
            },
            handleDOMEvents: {
                blur: function (view) {
                    var pluginState = getPluginState(view.state);
                    if (pluginState.toolbarVisible) {
                        setPluginState({
                            toolbarVisible: false,
                            element: null,
                            activePanelType: undefined,
                        })(view.state, view.dispatch);
                        return true;
                    }
                    return false;
                },
            },
        },
    });
};
//# sourceMappingURL=main.js.map