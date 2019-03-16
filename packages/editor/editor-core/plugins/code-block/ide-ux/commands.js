import { TextSelection } from 'prosemirror-state';
import { getLinesFromSelection, getLineInfo, forEachLine, getStartOfCurrentLine, } from './line-handling';
import { analyticsService } from '../../../analytics';
import { addAnalytics, } from '../../analytics';
/**
 * Return the current indentation level
 * @param indentText - Text in the code block that represent an indentation
 * @param indentSize - Size of the indentation token in a string
 */
function getIndentLevel(indentText, indentSize) {
    if (indentSize === 0 || indentText.length === 0) {
        return 0;
    }
    return indentText.length / indentSize;
}
export function indent(state, dispatch) {
    var _a = getLinesFromSelection(state), text = _a.text, start = _a.start;
    var tr = state.tr, selection = state.selection;
    forEachLine(text, function (line, offset) {
        var _a = getLineInfo(line), indentText = _a.indentText, indentToken = _a.indentToken;
        var indentLevel = getIndentLevel(indentText, indentToken.size);
        var indentToAdd = indentToken.token.repeat(indentToken.size - (indentText.length % indentToken.size) ||
            indentToken.size);
        tr.insertText(indentToAdd, tr.mapping.map(start + offset, -1));
        addAnalytics(tr, {
            action: "formatted" /* FORMATTED */,
            actionSubject: "text" /* TEXT */,
            actionSubjectId: "indentation" /* FORMAT_INDENT */,
            eventType: "track" /* TRACK */,
            attributes: {
                inputMethod: "keyboard" /* KEYBOARD */,
                previousIndentationLevel: indentLevel,
                newIndentLevel: indentLevel + 1,
                direction: "indent" /* INDENT */,
                indentType: "codeBlock" /* CODE_BLOCK */,
            },
        });
        if (!selection.empty) {
            tr.setSelection(TextSelection.create(tr.doc, tr.mapping.map(selection.from, -1), tr.selection.to));
        }
    });
    if (dispatch) {
        dispatch(tr);
        analyticsService.trackEvent("atlassian.editor.codeblock.indent");
    }
    return true;
}
export function outdent(state, dispatch) {
    var _a = getLinesFromSelection(state), text = _a.text, start = _a.start;
    var tr = state.tr;
    forEachLine(text, function (line, offset) {
        var _a = getLineInfo(line), indentText = _a.indentText, indentToken = _a.indentToken;
        if (indentText) {
            var indentLevel = getIndentLevel(indentText, indentToken.size);
            var unindentLength = indentText.length % indentToken.size || indentToken.size;
            tr.delete(tr.mapping.map(start + offset), tr.mapping.map(start + offset + unindentLength));
            addAnalytics(tr, {
                action: "formatted" /* FORMATTED */,
                actionSubject: "text" /* TEXT */,
                actionSubjectId: "indentation" /* FORMAT_INDENT */,
                eventType: "track" /* TRACK */,
                attributes: {
                    inputMethod: "keyboard" /* KEYBOARD */,
                    previousIndentationLevel: indentLevel,
                    newIndentLevel: indentLevel - 1,
                    direction: "outdent" /* OUTDENT */,
                    indentType: "codeBlock" /* CODE_BLOCK */,
                },
            });
        }
    });
    if (dispatch) {
        dispatch(tr);
        analyticsService.trackEvent('atlassian.editor.codeblock.outdent');
    }
    return true;
}
export function insertIndent(state, dispatch) {
    var textAtStartOfLine = getStartOfCurrentLine(state).text;
    var indentToken = getLineInfo(textAtStartOfLine).indentToken;
    var indentToAdd = indentToken.token.repeat(indentToken.size - (textAtStartOfLine.length % indentToken.size) ||
        indentToken.size);
    dispatch(state.tr.insertText(indentToAdd));
    analyticsService.trackEvent('atlassian.editor.codeblock.indent.insert');
    return true;
}
export function insertNewlineWithIndent(state, dispatch) {
    var textAtStartOfLine = getStartOfCurrentLine(state).text;
    var indentText = getLineInfo(textAtStartOfLine).indentText;
    if (indentText && dispatch) {
        dispatch(state.tr.insertText('\n' + indentText));
        return true;
    }
    return false;
}
//# sourceMappingURL=commands.js.map