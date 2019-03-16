import { Plugin, PluginKey } from 'prosemirror-state';
import { checkFormattingIsPresent } from '../utils';
export var pluginKey = new PluginKey('clearFormattingPlugin');
export var plugin = function (dispatch) {
    return new Plugin({
        state: {
            init: function (config, state) {
                return { formattingIsPresent: checkFormattingIsPresent(state) };
            },
            apply: function (tr, pluginState, oldState, newState) {
                var formattingIsPresent = checkFormattingIsPresent(newState);
                if (formattingIsPresent !== pluginState.formattingIsPresent) {
                    dispatch(pluginKey, { formattingIsPresent: formattingIsPresent });
                    return { formattingIsPresent: formattingIsPresent };
                }
                return pluginState;
            },
        },
        key: pluginKey,
    });
};
//# sourceMappingURL=clear-formatting.js.map