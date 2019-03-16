import { keymap } from 'prosemirror-keymap';
import * as keymaps from '../../../keymaps';
import { pluginKey, ACTIONS } from './main';
import { selectCurrentItem, selectSingleItemOrDismiss, } from '../commands/select-item';
import { dismissCommand } from '../commands/dismiss';
export function keymapPlugin() {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.enter.common, function (state, dispatch) {
        var pluginState = pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        return selectCurrentItem('enter')(state, dispatch);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.moveUp.common, function (state, dispatch) {
        var pluginState = pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        if (dispatch) {
            dispatch(state.tr.setMeta(pluginKey, { action: ACTIONS.SELECT_PREV }));
        }
        return true;
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.moveDown.common, function (state, dispatch) {
        var pluginState = pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        if (dispatch) {
            dispatch(state.tr.setMeta(pluginKey, { action: ACTIONS.SELECT_NEXT }));
        }
        return true;
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.insertNewLine.common, function (state, dispatch) {
        var pluginState = pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        return selectCurrentItem('shift-enter')(state, dispatch);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.tab.common, function (state, dispatch) {
        var pluginState = pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        return selectCurrentItem('tab')(state, dispatch);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.escape.common, function (state, dispatch) {
        var pluginState = pluginKey.getState(state);
        if (!pluginState || !pluginState.active) {
            return false;
        }
        /**
         * Jira uses escape to toggle the collapsed editor
         * stop the event propagation when the picker is open
         */
        if (window.event) {
            window.event.stopPropagation();
        }
        return dismissCommand()(state, dispatch);
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.space.common, function (state, dispatch) {
        var pluginState = pluginKey.getState(state);
        if (pluginState && pluginState.active) {
            return selectSingleItemOrDismiss('space')(state, dispatch);
        }
        return false;
    }, list);
    return keymap(list);
}
export default keymapPlugin;
//# sourceMappingURL=keymap.js.map