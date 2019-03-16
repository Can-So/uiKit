import { TextSelection } from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { taskDecisionSliceFilter } from '../../utils/filter';
import { linkifyContent } from '../hyperlink/utils';
import { analyticsService } from '../../analytics';
import { runMacroAutoConvert } from '../macro';
import { closeHistory } from 'prosemirror-history';
import { applyTextMarksToSlice, getPasteSource, hasOnlyNodesOfType, } from './util';
import { queueCardsFromChangedTr } from '../card/pm-plugins/doc';
import { pluginKey as textFormattingPluginKey, } from '../text-formatting/pm-plugins/main';
import { compose } from '../../utils';
export function handlePasteIntoTaskAndDecision(slice) {
    return function (state, dispatch) {
        var schema = state.schema, selection = state.tr.selection;
        var codeMark = schema.marks.code, _a = schema.nodes, decisionItem = _a.decisionItem, decisionList = _a.decisionList, emoji = _a.emoji, hardBreak = _a.hardBreak, mention = _a.mention, paragraph = _a.paragraph, taskList = _a.taskList, taskItem = _a.taskItem, text = _a.text;
        if (!decisionItem ||
            !decisionList ||
            !taskList ||
            !taskItem ||
            !hasParentNodeOfType([decisionItem, taskItem])(state.selection)) {
            return false;
        }
        var filters = [
            linkifyContent(schema),
            taskDecisionSliceFilter(schema),
        ];
        var selectionMarks = selection.$head.marks();
        var textFormattingState = textFormattingPluginKey.getState(state);
        if (selection instanceof TextSelection &&
            Array.isArray(selectionMarks) &&
            selectionMarks.length > 0 &&
            hasOnlyNodesOfType(paragraph, text, emoji, mention, hardBreak)(slice) &&
            (!codeMark.isInSet(selectionMarks) || textFormattingState.codeActive) // for codeMarks let's make sure mark is active
        ) {
            filters.push(applyTextMarksToSlice(schema, selection.$head.marks()));
        }
        var transformedSlice = compose.apply(null, filters)(slice);
        var tr = closeHistory(state.tr)
            .replaceSelection(transformedSlice)
            .scrollIntoView();
        queueCardsFromChangedTr(state, tr);
        dispatch(tr);
        return true;
    };
}
export function handlePasteAsPlainText(slice, event) {
    return function (state, dispatch, view) {
        // In case of SHIFT+CMD+V ("Paste and Match Style") we don't want to run the usual
        // fuzzy matching of content. ProseMirror already handles this scenario and will
        // provide us with slice containing paragraphs with plain text, which we decorate
        // with "stored marks".
        // @see prosemirror-view/src/clipboard.js:parseFromClipboard()).
        // @see prosemirror-view/src/input.js:doPaste().
        if (view.shiftKey) {
            var tr_1 = closeHistory(state.tr);
            // <- using the same internal flag that prosemirror-view is using
            analyticsService.trackEvent('atlassian.editor.paste.alt', {
                source: getPasteSource(event),
            });
            tr_1.replaceSelection(slice);
            (state.storedMarks || []).forEach(function (mark) {
                tr_1.addMark(tr_1.selection.from, tr_1.selection.from + slice.size, mark);
            });
            tr_1.scrollIntoView();
            dispatch(tr_1);
            return true;
        }
        return false;
    };
}
export function handlePastePreservingMarks(slice) {
    return function (state, dispatch) {
        var schema = state.schema, selection = state.tr.selection;
        var _a = schema.marks, codeMark = _a.code, linkMark = _a.link, _b = schema.nodes, bulletList = _b.bulletList, emoji = _b.emoji, hardBreak = _b.hardBreak, heading = _b.heading, listItem = _b.listItem, mention = _b.mention, orderedList = _b.orderedList, paragraph = _b.paragraph, text = _b.text;
        if (!(selection instanceof TextSelection)) {
            return false;
        }
        var selectionMarks = selection.$head.marks();
        if (selectionMarks.length === 0) {
            return false;
        }
        var textFormattingState = textFormattingPluginKey.getState(state);
        // special case for codeMark: will preserve mark only if codeMark is currently active
        // won't preserve mark if cursor is on the edge on the mark (namely inactive)
        if (codeMark.isInSet(selectionMarks) && !textFormattingState.codeActive) {
            return false;
        }
        var isPlainTextSlice = slice.content.childCount === 1 &&
            slice.content.firstChild.type === paragraph &&
            slice.content.firstChild.content.childCount === 1 &&
            slice.content.firstChild.firstChild.type === text;
        // special case for plainTextSlice & linkMark: merge into existing link
        if (isPlainTextSlice &&
            linkMark.isInSet(selectionMarks) &&
            selectionMarks.length === 1) {
            var tr = closeHistory(state.tr)
                .replaceSelectionWith(slice.content.firstChild.firstChild, true)
                .setStoredMarks(selectionMarks)
                .scrollIntoView();
            queueCardsFromChangedTr(state, tr);
            dispatch(tr);
            return true;
        }
        if (hasOnlyNodesOfType(bulletList, hardBreak, heading, listItem, paragraph, text, emoji, mention, orderedList)(slice)) {
            var transformedSlice = applyTextMarksToSlice(schema, selectionMarks)(slice);
            var tr = closeHistory(state.tr)
                .replaceSelection(transformedSlice)
                .setStoredMarks(selectionMarks)
                .scrollIntoView();
            queueCardsFromChangedTr(state, tr);
            dispatch(tr);
            return true;
        }
        return false;
    };
}
export function handleMacroAutoConvert(text, slice) {
    return function (state, dispatch, view) {
        var macro = runMacroAutoConvert(state, text);
        if (macro) {
            var selection = state.tr.selection;
            var tr = state.tr.replaceSelection(slice);
            var before = tr.mapping.map(selection.from, -1);
            if (dispatch && view) {
                // insert the text or linkified/md-converted clipboard data
                dispatch(tr);
                // replace the text with the macro as a separate transaction
                // so the autoconversion generates 2 undo steps
                dispatch(closeHistory(view.state.tr)
                    .replaceRangeWith(before, before + slice.size, macro)
                    .scrollIntoView());
            }
        }
        return !!macro;
    };
}
//# sourceMappingURL=handlers.js.map