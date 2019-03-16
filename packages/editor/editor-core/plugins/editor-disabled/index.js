import { Plugin, PluginKey } from 'prosemirror-state';
export var pluginKey = new PluginKey('editorDisabledPlugin');
/*
Stores the state of the editor enabled/disabled for panel and floating
toolbar to subscribe to through <WithPluginState>. Otherwise the NodeViews
won't re-render when it changes.
*/
export function createPlugin(dispatch) {
    return new Plugin({
        key: pluginKey,
        state: {
            init: function () {
                return ({
                    editorDisabled: false,
                });
            },
            apply: function (tr, oldPluginState) {
                var newPluginState = tr.getMeta(pluginKey);
                if (newPluginState &&
                    oldPluginState.editorDisabled !== newPluginState.editorDisabled) {
                    dispatch(pluginKey, newPluginState);
                    return newPluginState;
                }
                return oldPluginState;
            },
        },
    });
}
var editorDisabledPlugin = {
    pmPlugins: function () { return [
        {
            name: 'editorDisabled',
            plugin: function (_a) {
                var dispatch = _a.dispatch;
                return createPlugin(dispatch);
            },
        },
    ]; },
};
export default editorDisabledPlugin;
//# sourceMappingURL=index.js.map