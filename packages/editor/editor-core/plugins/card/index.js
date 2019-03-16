import { PluginKey } from 'prosemirror-state';
import { inlineCard, blockCard } from '@atlaskit/adf-schema';
import { createPlugin } from './pm-plugins/main';
import { floatingToolbar } from './toolbar';
export var stateKey = new PluginKey('cardPlugin');
var cardPlugin = {
    nodes: function () {
        return [
            { name: 'inlineCard', node: inlineCard },
            { name: 'blockCard', node: blockCard },
        ];
    },
    pmPlugins: function () {
        return [{ name: 'card', plugin: createPlugin }];
    },
    pluginsOptions: {
        floatingToolbar: floatingToolbar,
    },
};
export default cardPlugin;
//# sourceMappingURL=index.js.map