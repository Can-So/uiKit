import { TextSelection } from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { taskDecisionSliceFilter } from '../../utils/filter';
import { linkifyContent } from '../hyperlink/utils';
import { analyticsService } from '../../analytics';
import { Slice } from 'prosemirror-model';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { runMacroAutoConvert } from '../macro';
import { closeHistory } from 'prosemirror-history';
import {
  applyTextMarksToSlice,
  getPasteSource,
  hasOnlyNodesOfType,
} from './util';
import { queueCardsFromChangedTr } from '../card/pm-plugins/doc';
import {
  pluginKey as textFormattingPluginKey,
  TextFormattingState,
} from '../text-formatting/pm-plugins/main';
import { compose } from '../../utils';
import { CommandDispatch, Command } from '../../types';

export function handlePasteIntoTaskAndDecision(
  slice: Slice,
): (state: EditorState, dispatch: CommandDispatch) => boolean {
  return (state: EditorState, dispatch: CommandDispatch): boolean => {
    const {
      schema,
      tr: { selection },
    } = state;

    const {
      marks: { code: codeMark },
      nodes: {
        decisionItem,
        decisionList,
        emoji,
        hardBreak,
        mention,
        paragraph,
        taskList,
        taskItem,
        text,
      },
    } = schema;

    if (
      !decisionItem ||
      !decisionList ||
      !taskList ||
      !taskItem ||
      !hasParentNodeOfType([decisionItem, taskItem])(state.selection)
    ) {
      return false;
    }

    const filters: Array<(slice: Slice) => Slice> = [
      linkifyContent(schema),
      taskDecisionSliceFilter(schema),
    ];

    const selectionMarks = selection.$head.marks();

    const textFormattingState: TextFormattingState = textFormattingPluginKey.getState(
      state,
    );

    if (
      selection instanceof TextSelection &&
      Array.isArray(selectionMarks) &&
      selectionMarks.length > 0 &&
      hasOnlyNodesOfType(paragraph, text, emoji, mention, hardBreak)(slice) &&
      (!codeMark.isInSet(selectionMarks) || textFormattingState.codeActive) // for codeMarks let's make sure mark is active
    ) {
      filters.push(applyTextMarksToSlice(schema, selection.$head.marks()));
    }

    const transformedSlice = compose.apply(null, filters)(slice);

    const tr = closeHistory(state.tr)
      .replaceSelection(transformedSlice)
      .scrollIntoView();

    queueCardsFromChangedTr(state, tr);
    dispatch(tr);
    return true;
  };
}

export function handlePasteAsPlainText(
  slice: Slice,
  event: ClipboardEvent,
): (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
  view: EditorView,
) => boolean {
  return (state: EditorState, dispatch, view: EditorView): boolean => {
    // In case of SHIFT+CMD+V ("Paste and Match Style") we don't want to run the usual
    // fuzzy matching of content. ProseMirror already handles this scenario and will
    // provide us with slice containing paragraphs with plain text, which we decorate
    // with "stored marks".
    // @see prosemirror-view/src/clipboard.js:parseFromClipboard()).
    // @see prosemirror-view/src/input.js:doPaste().
    if ((view as any).shiftKey) {
      const tr = closeHistory(state.tr);

      // <- using the same internal flag that prosemirror-view is using
      analyticsService.trackEvent('atlassian.editor.paste.alt', {
        source: getPasteSource(event),
      });

      tr.replaceSelection(slice);
      (state.storedMarks || []).forEach(mark => {
        tr.addMark(tr.selection.from, tr.selection.from + slice.size, mark);
      });
      tr.scrollIntoView();
      dispatch(tr);
      return true;
    }
    return false;
  };
}

export function handlePastePreservingMarks(
  slice: Slice,
): (state: EditorState, dispatch: (tr: Transaction) => void) => boolean {
  return (state: EditorState, dispatch): boolean => {
    const {
      schema,
      tr: { selection },
    } = state;

    const {
      marks: { code: codeMark, link: linkMark },
      nodes: {
        bulletList,
        emoji,
        hardBreak,
        heading,
        listItem,
        mention,
        orderedList,
        paragraph,
        text,
      },
    } = schema;

    if (!(selection instanceof TextSelection)) {
      return false;
    }

    const selectionMarks = selection.$head.marks();
    if (selectionMarks.length === 0) {
      return false;
    }

    const textFormattingState: TextFormattingState = textFormattingPluginKey.getState(
      state,
    );

    // special case for codeMark: will preserve mark only if codeMark is currently active
    // won't preserve mark if cursor is on the edge on the mark (namely inactive)
    if (codeMark.isInSet(selectionMarks) && !textFormattingState.codeActive) {
      return false;
    }

    const isPlainTextSlice =
      slice.content.childCount === 1 &&
      slice.content.firstChild!.type === paragraph &&
      slice.content.firstChild!.content.childCount === 1 &&
      slice.content.firstChild!.firstChild!.type === text;

    // special case for plainTextSlice & linkMark: merge into existing link
    if (
      isPlainTextSlice &&
      linkMark.isInSet(selectionMarks) &&
      selectionMarks.length === 1
    ) {
      const tr = closeHistory(state.tr)
        .replaceSelectionWith(slice.content.firstChild!.firstChild!, true)
        .setStoredMarks(selectionMarks)
        .scrollIntoView();

      queueCardsFromChangedTr(state, tr);
      dispatch(tr);
      return true;
    }

    if (
      hasOnlyNodesOfType(
        bulletList,
        hardBreak,
        heading,
        listItem,
        paragraph,
        text,
        emoji,
        mention,
        orderedList,
      )(slice)
    ) {
      const transformedSlice = applyTextMarksToSlice(schema, selectionMarks)(
        slice,
      );

      const tr = closeHistory(state.tr)
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

export function handleMacroAutoConvert(text: string, slice: Slice): Command {
  return (state, dispatch, view) => {
    const macro = runMacroAutoConvert(state, text);
    if (macro) {
      const selection = state.tr.selection;
      const tr = state.tr.replaceSelection(slice);
      const before = tr.mapping.map(selection.from, -1);

      if (dispatch && view) {
        // insert the text or linkified/md-converted clipboard data
        dispatch(tr);

        // replace the text with the macro as a separate transaction
        // so the autoconversion generates 2 undo steps
        dispatch(
          closeHistory(view.state.tr)
            .replaceRangeWith(before, before + slice.size, macro)
            .scrollIntoView(),
        );
      }
    }
    return !!macro;
  };
}
