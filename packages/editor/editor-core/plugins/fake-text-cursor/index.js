import { Plugin } from 'prosemirror-state';
import { PluginKey } from 'prosemirror-state';
import { drawFakeTextCursor } from './cursor';
export var stateKey = new PluginKey('fakeTextCursorPlugin');
export var createPlugin = function () {
    return new Plugin({
        key: stateKey,
        props: {
            decorations: drawFakeTextCursor,
        },
    });
};
var fakeTextCursorPlugin = {
    pmPlugins: function () {
        return [{ name: 'fakeTextCursor', plugin: function () { return createPlugin(); } }];
    },
};
export default fakeTextCursorPlugin;
//# sourceMappingURL=index.js.map