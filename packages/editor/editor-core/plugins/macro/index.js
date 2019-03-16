import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import { setMacroProvider } from './actions';
export * from './actions';
export var pluginKey = new PluginKey('macroPlugin');
export var createPlugin = function (dispatch, providerFactory) {
    return new Plugin({
        state: {
            init: function () { return ({ macroProvider: null }); },
            apply: function (tr, state) {
                var meta = tr.getMeta(pluginKey);
                if (meta) {
                    var newState = tslib_1.__assign({}, state, meta);
                    dispatch(pluginKey, newState);
                    return newState;
                }
                return state;
            },
        },
        key: pluginKey,
        view: function (view) {
            // make sure editable DOM node is mounted
            if (view.dom.parentNode) {
                providerFactory.subscribe('macroProvider', function (name, provider) {
                    return provider && setMacroProvider(provider)(view);
                });
            }
            return {};
        },
    });
};
export default {
    pmPlugins: function () {
        return [
            {
                name: 'macro',
                plugin: function (_a) {
                    var dispatch = _a.dispatch, providerFactory = _a.providerFactory;
                    return createPlugin(dispatch, providerFactory);
                },
            },
        ];
    },
};
//# sourceMappingURL=index.js.map