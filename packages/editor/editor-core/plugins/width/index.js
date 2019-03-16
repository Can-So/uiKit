import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
export var pluginKey = new PluginKey('widthPlugin');
export function createPlugin(dispatch) {
    return new Plugin({
        key: pluginKey,
        state: {
            init: function () { return ({
                width: document.body.offsetWidth,
            }); },
            apply: function (tr, pluginState) {
                var meta = tr.getMeta(pluginKey);
                if (!meta) {
                    return pluginState;
                }
                var newPluginState = tslib_1.__assign({}, pluginState, meta);
                if (newPluginState &&
                    (pluginState.width !== newPluginState.width ||
                        pluginState.lineLength !== newPluginState.lineLength)) {
                    dispatch(pluginKey, newPluginState);
                    return newPluginState;
                }
                return pluginState;
            },
        },
    });
}
var widthPlugin = {
    pmPlugins: function () { return [
        {
            name: 'width',
            plugin: function (_a) {
                var dispatch = _a.dispatch;
                return createPlugin(dispatch);
            },
        },
    ]; },
    // do this early here, otherwise we have to wait for WidthEmitter to debounce
    // which causes anything dependent on lineLength to jump around
    contentComponent: function (_a) {
        var editorView = _a.editorView, containerElement = _a.containerElement;
        var pmDom = containerElement
            ? containerElement.querySelector('.ProseMirror')
            : undefined;
        var tr = editorView.state.tr.setMeta(pluginKey, {
            lineLength: pmDom ? pmDom.clientWidth : undefined,
        });
        editorView.dispatch(tr);
        return null;
    },
};
export default widthPlugin;
//# sourceMappingURL=index.js.map