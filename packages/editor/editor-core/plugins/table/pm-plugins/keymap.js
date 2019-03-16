import { keymap } from 'prosemirror-keymap';
import { Selection } from 'prosemirror-state';
import { addColumnBefore, addColumnAfter, addRowBefore, addRowAfter, } from 'prosemirror-tables';
import { emptyCell, findCellClosestToPos, isCellSelection, } from 'prosemirror-utils';
import { createTable, goToNextCell, moveCursorBackward, triggerUnlessTableHeader, } from '../actions';
import * as keymaps from '../../../keymaps';
import { analyticsService } from '../../../analytics';
import { withAnalytics, } from '../../analytics';
var createTableWithAnalytics = function () {
    return withAnalytics({
        action: "inserted" /* INSERTED */,
        actionSubject: "document" /* DOCUMENT */,
        actionSubjectId: "table" /* TABLE */,
        attributes: { inputMethod: "shortcut" /* SHORTCUT */ },
        eventType: "track" /* TRACK */,
    })(createTable);
};
export function keymapPlugin() {
    var list = {};
    keymaps.bindKeymapWithCommand(keymaps.nextCell.common, goToNextCell(1), list);
    keymaps.bindKeymapWithCommand(keymaps.previousCell.common, goToNextCell(-1), list);
    keymaps.bindKeymapWithCommand(keymaps.toggleTable.common, createTableWithAnalytics(), list);
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, function (state, dispatch) {
        if (!isCellSelection(state.selection)) {
            return false;
        }
        var tr = state.tr;
        var selection = tr.selection;
        selection.forEachCell(function (node, pos) {
            var $pos = tr.doc.resolve(tr.mapping.map(pos + 1));
            tr = emptyCell(findCellClosestToPos($pos), state.schema)(tr);
        });
        if (tr.docChanged) {
            var $pos = tr.doc.resolve(tr.mapping.map(selection.$headCell.pos));
            var textSelection = Selection.findFrom($pos, 1, true);
            if (textSelection) {
                tr.setSelection(textSelection);
            }
            if (dispatch) {
                dispatch(tr);
            }
            analyticsService.trackEvent('atlassian.editor.format.table.delete_content.keyboard');
            return true;
        }
        return false;
    }, list);
    keymaps.bindKeymapWithCommand(keymaps.backspace.common, moveCursorBackward, list);
    // Add row/column shortcuts
    keymaps.bindKeymapWithCommand(keymaps.addRowBefore.common, triggerUnlessTableHeader(addRowBefore), list);
    keymaps.bindKeymapWithCommand(keymaps.addRowAfter.common, addRowAfter, list);
    keymaps.bindKeymapWithCommand(keymaps.addColumnBefore.common, triggerUnlessTableHeader(addColumnBefore), list);
    keymaps.bindKeymapWithCommand(keymaps.addColumnAfter.common, addColumnAfter, list);
    return keymap(list);
}
export default keymapPlugin;
//# sourceMappingURL=keymap.js.map