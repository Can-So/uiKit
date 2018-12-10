import { TextSelection } from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { taskDecisionSliceFilter } from '../../utils/filter';
import { linkifyContent } from '../hyperlink/utils';
import { analyticsService } from '../../analytics';
import { Slice } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { runMacroAutoConvert } from '../macro';
import { closeHistory } from 'prosemirror-history';
import {
  applyTextMarksToSlice,
  extractSingleTextNodeFromSlice,
  getPasteSource,
  hasOnlyNodesOfType,
} from './util';
import { queueCardsFromChangedTr } from '../card/pm-plugins/doc';
import { compose } from '../../utils';

export function handlePasteIntoTaskAndDecision(
  slice: Slice,
): (state: EditorState, dispatch) => boolean {
  return (state: EditorState, dispatch): boolean => {
    const {
      schema: {
        nodes: {
          decisionItem,
          decisionList,
          emoji,
          hardBreak,
          paragraph,
          taskList,
          taskItem,
          text,
        },
      },
    } = state;

    if (
      (!decisionItem && !decisionList && !taskList && !taskItem) ||
      !hasParentNodeOfType([decisionItem, taskItem])(state.selection)
    ) {
      return false;
    }

    const { schema } = state;

    let transformedSlice = compose(
      linkifyContent(schema),
      taskDecisionSliceFilter(schema),
    )(slice);

    const singleTextNode = extractSingleTextNodeFromSlice(transformedSlice);

    // if single text node containing no link => inherit container marks
    if (
      singleTextNode &&
      (!singleTextNode.marks ||
        !singleTextNode.marks.some(mark => mark.type === schema.marks.link))
    ) {
      const tr = closeHistory(state.tr)
        .replaceSelectionWith(singleTextNode, true)
        .scrollIntoView();
      dispatch(tr);
      return true;
    }

    // if list of paragraphs and selection contains marks => apply selection marks
    if (state.tr.selection instanceof TextSelection) {
      const selectionMarks = state.tr.selection.$cursor
        ? state.tr.selection.$cursor.marks()
        : state.tr.selection.$head
        ? state.tr.selection.$head.marks()
        : [];

      if (
        Array.isArray(selectionMarks) &&
        selectionMarks.length > 0 &&
        hasOnlyNodesOfType(paragraph, text, emoji, hardBreak)(slice)
      ) {
        transformedSlice = compose(
          linkifyContent(schema),
          taskDecisionSliceFilter(schema),
          applyTextMarksToSlice(schema, selectionMarks),
        )(slice);
      }
    }

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
): (state: EditorState, dispatch, view: EditorView) => boolean {
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
): (state: EditorState, dispatch) => boolean {
  return (state: EditorState, dispatch): boolean => {
    const { schema, tr } = state;
    const {
      nodes: { emoji, hardBreak, paragraph, text },
    } = schema;

    if (!(tr.selection instanceof TextSelection)) {
      return false;
    }

    const selectionMarks = tr.selection.$cursor
      ? tr.selection.$cursor.marks()
      : tr.selection.$head
      ? tr.selection.$head.marks()
      : [];

    if (!Array.isArray(selectionMarks) || selectionMarks.length === 0) {
      return false;
    }

    // if single text node containing no link => inherit container marks
    const singleTextNode = extractSingleTextNodeFromSlice(slice);

    if (
      singleTextNode &&
      (!singleTextNode.marks ||
        !singleTextNode.marks.some(mark => mark.type === schema.marks.link))
    ) {
      const tr = closeHistory(state.tr)
        .replaceSelectionWith(singleTextNode, true)
        .setStoredMarks(selectionMarks)
        .scrollIntoView();

      queueCardsFromChangedTr(state, tr);
      dispatch(tr);
      return true;
    }

    // if list of paragraphs and selection contains marks => apply selection marks
    if (hasOnlyNodesOfType(paragraph, text, emoji, hardBreak)(slice)) {
      const transformedSlice = applyTextMarksToSlice(schema, selectionMarks)(
        slice,
      );

      if (!transformedSlice) {
        return false;
      }

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

export function handleMacroAutoConvert(
  text: string,
  slice: Slice,
): (state: EditorState, dispatch, view: EditorView) => boolean {
  return (state: EditorState, dispatch, view: EditorView) => {
    const macro = runMacroAutoConvert(state, text);
    if (macro) {
      const selection = state.tr.selection;
      const tr = state.tr.replaceSelection(slice);
      const before = tr.mapping.map(selection.from, -1);

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
    return !!macro;
  };
}
