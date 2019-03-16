import { PluginKey } from 'prosemirror-state';
import { action } from '@atlaskit/adf-schema';
export var stateKey = new PluginKey('inlineActionPlugin');
var inlineActionPlugin = {
    marks: function () { return [{ name: 'action', mark: action }]; },
};
export default inlineActionPlugin;
//# sourceMappingURL=index.js.map