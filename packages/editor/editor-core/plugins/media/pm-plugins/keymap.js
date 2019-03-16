import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { stateKey } from '../pm-plugins/main';
export function keymapPlugin() {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.undo.common, ignoreLinksInSteps, list);
    keymaps.bindKeymapWithCommand(keymaps.enter.common, splitMediaGroup, list);
    keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common, splitMediaGroup, list);
    return keymap(list);
}
var ignoreLinksInSteps = function (state) {
    var mediaPluginState = stateKey.getState(state);
    mediaPluginState.ignoreLinks = true;
    return false;
};
var splitMediaGroup = function (state) {
    var mediaPluginState = stateKey.getState(state);
    return mediaPluginState.splitMediaGroup();
};
export default keymapPlugin;
//# sourceMappingURL=keymap.js.map