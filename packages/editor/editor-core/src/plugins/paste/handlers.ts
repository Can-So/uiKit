import { hasParentNodeOfType } from 'prosemirror-utils';
import { taskDecisionSliceFilter } from '../../utils/filter';
import { analyticsService } from '../../analytics';
import { Slice } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { runMacroAutoConvert } from '../macro';
import { closeHistory } from 'prosemirror-history';

export const handlePasteIntoTaskAndDecision = (slice: Slice) => (
  state: EditorState,
  dispatch,
): boolean => {
  const {
    schema: {
      nodes: { decisionItem, decisionList, taskList, taskItem },
    },
  } = state;
  if (decisionItem && decisionList && taskList && taskItem) {
    if (hasParentNodeOfType([decisionItem, taskItem])(state.selection)) {
      if (state.selection.empty) {
        analyticsService.trackEvent(
          'atlassian.fabric.action-decision.editor.paste',
        );
        const tr = closeHistory(state.tr);
        tr.replaceSelection(taskDecisionSliceFilter(slice, state.schema));
        dispatch(tr.scrollIntoView());
        return true;
      }
    }
  }
  return false;
};

export const handlePasteAsPlainText = (slice: Slice) => (
  state: EditorState,
  dispatch,
  view: EditorView,
): boolean => {
  // In case of SHIFT+CMD+V ("Paste and Match Style") we don't want to run the usual
  // fuzzy matching of content. ProseMirror already handles this scenario and will
  // provide us with slice containing paragraphs with plain text, which we decorate
  // with "stored marks".
  // @see prosemirror-view/src/clipboard.js:parseFromClipboard()).
  // @see prosemirror-view/src/input.js:doPaste().
  const tr = closeHistory(state.tr);
  if ((view as any).shiftKey) {
    // <- using the same internal flag that prosemirror-view is using
    analyticsService.trackEvent('atlassian.editor.paste.alt');
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

export const handleMacroAutoConvert = (text: string) => (
  state: EditorState,
  dispatch,
) => {
  const macro = runMacroAutoConvert(state, text);
  if (macro) {
    dispatch(
      closeHistory(state.tr)
        .replaceSelectionWith(macro)
        .scrollIntoView(),
    );
  }
  return !!macro;
};
