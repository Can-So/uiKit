import {
  EditorState,
  NodeSelection,
  Transaction,
  Selection,
} from 'prosemirror-state';
import { findDomRefAtPos } from 'prosemirror-utils';
import { EditorView } from 'prosemirror-view';
import { uuid } from '@atlaskit/editor-common';
import { pluginKey } from './plugin';
import { Color as ColorType } from '@atlaskit/status';

export type StatusType = {
  color: ColorType;
  text: string;
  localId?: string;
};

export const DEFAULT_STATUS: StatusType = {
  text: '',
  color: 'neutral',
};

export const getStatusAtPosition = pos => editorView => {
  const element = findDomRefAtPos(
    pos,
    editorView.domAtPos.bind(editorView),
  ) as HTMLElement;

  const state = { ...DEFAULT_STATUS };
  if (element) {
    state.color = (element.getAttribute('color') || state.color) as ColorType;
    state.text = element.getAttribute('text') || state.text;
    state.localId =
      element.getAttribute('localId') || uuid.generate().toString();

    return state;
  }

  return undefined;
};

export const createStatus = (showStatusPickerAtOffset = -2) => (
  insert: (node?: Node | Object | string) => Transaction,
  state: EditorState,
): Transaction => {
  const statusNode = state.schema.nodes.status.createChecked({
    ...DEFAULT_STATUS,
    localId: uuid.generate(),
  });

  const tr = insert(statusNode);
  const showStatusPickerAt = tr.selection.from + showStatusPickerAtOffset;
  return tr
    .setSelection(NodeSelection.create(tr.doc, showStatusPickerAt))
    .setMeta(pluginKey, { showStatusPickerAt, autoFocus: true });
};

export const updateStatus = (status?: StatusType) => (
  editorView: EditorView,
): boolean => {
  const { state, dispatch } = editorView;
  const { schema } = state;

  const statusProps = { ...DEFAULT_STATUS, ...status };

  let tr = state.tr;
  const { showStatusPickerAt } = pluginKey.getState(state);

  if (!showStatusPickerAt) {
    const statusNode = schema.nodes.status.createChecked(statusProps);
    const newShowStatusPickerAt = tr.selection.from;
    tr = tr.replaceSelectionWith(statusNode);
    tr = tr.setSelection(NodeSelection.create(tr.doc, newShowStatusPickerAt));
    tr = tr
      .setMeta(pluginKey, { showStatusPickerAt: newShowStatusPickerAt })
      .scrollIntoView();
    dispatch(tr);
    return true;
  }

  if (state.doc.nodeAt(showStatusPickerAt)) {
    tr = tr.setNodeMarkup(showStatusPickerAt, schema.nodes.status, statusProps);
    tr = tr.setSelection(NodeSelection.create(tr.doc, showStatusPickerAt));
    tr = tr.setMeta(pluginKey, { showStatusPickerAt }).scrollIntoView();

    dispatch(tr);
    return true;
  }

  return false;
};

export const setStatusPickerAt = (showStatusPickerAt: number | null) => (
  state: EditorState,
  dispatch: (tr: Transaction) => void,
): boolean => {
  dispatch(
    state.tr.setMeta(pluginKey, { showStatusPickerAt, autoFocus: false }),
  );
  return true;
};

export const commitStatusPicker = () => (editorView: EditorView) => {
  const { state, dispatch } = editorView;
  const { showStatusPickerAt } = pluginKey.getState(state);

  if (!showStatusPickerAt) {
    return;
  }

  const statusNode = state.tr.doc.nodeAt(showStatusPickerAt);

  if (!statusNode) {
    return;
  }

  let tr = state.tr;
  tr = tr.setMeta(pluginKey, { showStatusPickerAt: null, autoFocus: false });

  if (statusNode.attrs.text) {
    // still has content - keep content, move selection after status
    tr = tr.setSelection(
      Selection.near(state.tr.doc.resolve(showStatusPickerAt + 2)),
    );
  } else {
    // no content - remove node
    tr = tr
      .delete(showStatusPickerAt, showStatusPickerAt + 1)
      .setSelection(Selection.near(state.tr.doc.resolve(showStatusPickerAt)));
  }

  dispatch(tr);
  editorView.focus();
};
