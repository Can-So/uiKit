import { PluginKey, Plugin } from 'prosemirror-state';
import { keydownHandler } from 'prosemirror-keymap';
import { filter } from '../../../utils/commands';
import { typeAheadPluginKey } from '../../../plugins/type-ahead';
import { emojiPluginKey } from '../../../plugins/emoji/pm-plugins/main';
export var newlinePreserveMarksKey = new PluginKey('newlinePreserveMarksPlugin');
var isSelectionEndOfParagraph = function (state) {
    return state.selection.$to.parent.type === state.schema.nodes.paragraph &&
        state.selection.$to.pos === state.doc.resolve(state.selection.$to.pos).end();
};
var isSelectionAligned = function (state) {
    return !!state.selection.$to.parent.marks.find(function (m) { return m.type === state.schema.marks.alignment; });
};
var isTypeaheadNotDisplaying = function (state) {
    return !typeAheadPluginKey.getState(state).active &&
        !emojiPluginKey.getState(state).queryActive;
};
var splitBlockPreservingMarks = function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.split(state.tr.mapping.map(state.selection.$from.pos), 1));
    }
    return true;
};
export default (function () {
    return new Plugin({
        key: newlinePreserveMarksKey,
        props: {
            handleKeyDown: keydownHandler({
                Enter: filter([
                    isSelectionEndOfParagraph,
                    isSelectionAligned,
                    isTypeaheadNotDisplaying,
                ], splitBlockPreservingMarks),
            }),
        },
    });
});
//# sourceMappingURL=newline-preserve-marks.js.map