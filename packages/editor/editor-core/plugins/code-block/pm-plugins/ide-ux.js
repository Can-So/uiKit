import { Plugin, TextSelection } from 'prosemirror-state';
import { keydownHandler } from 'prosemirror-keymap';
import { setTextSelection } from 'prosemirror-utils';
import { getCursor } from '../../../utils';
import { filter } from '../../../utils/commands';
import { getAutoClosingBracketInfo, isCursorBeforeClosingBracket, isClosingBracket, } from '../ide-ux/bracket-handling';
import { getEndOfCurrentLine, getStartOfCurrentLine, isCursorInsideCodeBlock, isSelectionEntirelyInsideCodeBlock, getLineInfo, } from '../ide-ux/line-handling';
import { insertIndent, outdent, indent, insertNewlineWithIndent, } from '../ide-ux/commands';
export default new Plugin({
    props: {
        handleTextInput: function (view, from, to, text) {
            var state = view.state, dispatch = view.dispatch;
            if (isCursorInsideCodeBlock(state)) {
                var beforeText = getStartOfCurrentLine(state).text;
                var afterText = getEndOfCurrentLine(state).text;
                // If text is a closing bracket and we've already inserted it, move the selection after.
                if (isCursorBeforeClosingBracket(afterText) &&
                    isClosingBracket(text) &&
                    afterText.startsWith(text)) {
                    dispatch(setTextSelection(to + text.length)(state.tr));
                    return true;
                }
                // Automatically add right-hand side bracket when user types the left bracket
                var _a = getAutoClosingBracketInfo(beforeText + text, afterText), left = _a.left, right = _a.right;
                if (left && right) {
                    var bracketPair = state.schema.text(text + right);
                    var tr = state.tr.replaceWith(from, to, bracketPair);
                    dispatch(setTextSelection(from + text.length)(tr));
                    return true;
                }
            }
            return false;
        },
        handleKeyDown: keydownHandler({
            Backspace: function (state, dispatch) {
                if (isCursorInsideCodeBlock(state)) {
                    var $cursor = getCursor(state.selection);
                    var beforeText = getStartOfCurrentLine(state).text;
                    var afterText = getEndOfCurrentLine(state).text;
                    var _a = getAutoClosingBracketInfo(beforeText, afterText), left = _a.left, right = _a.right, hasTrailingMatchingBracket = _a.hasTrailingMatchingBracket;
                    if (left && right && hasTrailingMatchingBracket && dispatch) {
                        dispatch(state.tr.delete($cursor.pos - left.length, $cursor.pos + right.length));
                        return true;
                    }
                    var _b = getLineInfo(beforeText), _c = _b.indentToken, size = _c.size, token = _c.token, indentText = _b.indentText;
                    if (beforeText === indentText) {
                        if (indentText.endsWith(token.repeat(size)) && dispatch) {
                            dispatch(state.tr.delete($cursor.pos - (size - (indentText.length % size) || size), $cursor.pos));
                            return true;
                        }
                    }
                }
                return false;
            },
            Enter: filter(isSelectionEntirelyInsideCodeBlock, insertNewlineWithIndent),
            'Mod-]': filter(isSelectionEntirelyInsideCodeBlock, indent),
            'Mod-[': filter(isSelectionEntirelyInsideCodeBlock, outdent),
            Tab: filter(isSelectionEntirelyInsideCodeBlock, function (state, dispatch) {
                if (!dispatch) {
                    return false;
                }
                if (isCursorInsideCodeBlock(state)) {
                    return insertIndent(state, dispatch);
                }
                return indent(state, dispatch);
            }),
            'Shift-Tab': filter(isSelectionEntirelyInsideCodeBlock, outdent),
            'Mod-a': function (state, dispatch) {
                if (isSelectionEntirelyInsideCodeBlock(state)) {
                    var _a = state.selection, $from = _a.$from, $to = _a.$to;
                    var isFullCodeBlockSelection = $from.parentOffset === 0 &&
                        $to.parentOffset === $to.parent.nodeSize - 2;
                    if (!isFullCodeBlockSelection && dispatch) {
                        dispatch(state.tr.setSelection(TextSelection.create(state.doc, $from.start(), $to.end())));
                        return true;
                    }
                }
                return false;
            },
        }),
    },
});
//# sourceMappingURL=ide-ux.js.map