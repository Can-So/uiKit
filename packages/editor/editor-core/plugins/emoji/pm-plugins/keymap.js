import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { emojiPluginKey } from './main';
export function keymapPlugin() {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.moveUp.common, function (state, _dispatch) {
        var emojisPlugin = emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        return emojisPlugin.onSelectPrevious();
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.moveDown.common, function (state, _dispatch) {
        var emojisPlugin = emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        return emojisPlugin.onSelectNext();
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.enter.common, function (state, _dispatch) {
        var emojisPlugin = emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        return emojisPlugin.onSelectCurrent(keymaps.enter.common);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common, function (state, _dispatch) {
        var emojisPlugin = emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        emojisPlugin.onSelectCurrent(keymaps.insertNewLine.common);
        return false;
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.tab.common, function (state, _dispatch) {
        var emojisPlugin = emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        return emojisPlugin.onSelectCurrent(keymaps.tab.common);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.escape.common, function (state, _dispatch) {
        var emojisPlugin = emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        /**
         * Jira uses escape to toggle the collapsed editor
         * stop the event propagation when the picker is open
         */
        if (window.event) {
            window.event.stopPropagation();
        }
        return emojisPlugin.dismiss();
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.space.common, function (state, _dispatch) {
        var emojisPlugin = emojiPluginKey.getState(state);
        if (!emojisPlugin.queryActive) {
            return false;
        }
        return emojisPlugin.trySelectCurrentWithSpace(keymaps.space.common);
    }, list);
    return keymap(list);
}
export default keymapPlugin;
//# sourceMappingURL=keymap.js.map