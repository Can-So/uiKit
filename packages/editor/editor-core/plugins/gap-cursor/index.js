import plugin from './pm-plugins/main';
import keymapPlugin from './pm-plugins/keymap';
export { GapCursorSelection, Side } from './selection';
export { setCursorForTopLevelBlocks } from './actions';
export default {
    pmPlugins: function () {
        return [
            {
                name: 'gapCursorKeymap',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props;
                    return keymapPlugin();
                },
            },
            {
                name: 'gapCursor',
                plugin: function (_a) {
                    var schema = _a.schema, props = _a.props;
                    return plugin;
                },
            },
        ];
    },
};
//# sourceMappingURL=index.js.map