import { keymap } from 'prosemirror-keymap';
import { NodeSelection } from 'prosemirror-state';
import { closeDatePicker, openDatePicker } from './actions';
import * as keymaps from '../../keymaps';
import { pluginKey } from './plugin';
export function keymapPlugin() {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.enter.common, function (state, dispatch) {
        var datePlugin = pluginKey.getState(state);
        var isDateNode = state.selection instanceof NodeSelection
            ? state.selection.node.type === state.schema.nodes.date
            : false;
        if (!isDateNode) {
            return false;
        }
        if (!datePlugin.showDatePickerAt) {
            openDatePicker()(state, dispatch);
            return true;
        }
        closeDatePicker()(state, dispatch);
        return true;
    }, list);
    return keymap(list);
}
export default keymapPlugin;
//# sourceMappingURL=keymap.js.map