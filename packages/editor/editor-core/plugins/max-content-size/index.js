import { Plugin, PluginKey } from 'prosemirror-state';
export var pluginKey = new PluginKey('maxContentSizePlugin');
export function createPlugin(dispatch, maxContentSize) {
    if (!maxContentSize) {
        return;
    }
    var maxContentSizeReached = false;
    return new Plugin({
        filterTransaction: function (tr) {
            var result = tr.doc && tr.doc.nodeSize > maxContentSize;
            if (result || result !== maxContentSizeReached) {
                dispatch(pluginKey, { maxContentSizeReached: result });
            }
            maxContentSizeReached = result;
            return !result;
        },
    });
}
var maxContentSizePlugin = {
    pmPlugins: function () {
        return [
            {
                name: 'maxContentSize',
                plugin: function (_a) {
                    var dispatch = _a.dispatch, props = _a.props;
                    return createPlugin(dispatch, props.maxContentSize);
                },
            },
        ];
    },
};
export default maxContentSizePlugin;
//# sourceMappingURL=index.js.map