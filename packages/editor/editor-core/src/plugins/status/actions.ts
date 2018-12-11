import { Fragment } from 'prosemirror-model';
import {
  EditorState,
  NodeSelection,
  Transaction,
  Selection,
} from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { uuid } from '@atlaskit/editor-common';
import { pluginKey, StatusType } from './plugin';

export const DEFAULT_STATUS: StatusType = {
  text: '',
  color: 'neutral',
};

export const createStatus = (showStatusPickerAtOffset = -2) => (
  insert: (node?: Node | Object | string) => Transaction,
  state: EditorState,
): Transaction => {
  const statusNode = state.schema.nodes.status.createChecked({
    ...DEFAULT_STATUS,
    localId: uuid.generate(),
  });

  const selectedStatus = statusNode.attrs;

  const tr = insert(statusNode);
  const showStatusPickerAt = tr.selection.from + showStatusPickerAtOffset;
  return tr
    .setSelection(NodeSelection.create(tr.doc, showStatusPickerAt))
    .setMeta(pluginKey, {
      showStatusPickerAt,
      autoFocus: true,
      selectedStatus,
    });
};

export const updateStatus = (status?: StatusType, autoFocus?: boolean) => (
  editorView: EditorView,
): boolean => {
  const { state, dispatch } = editorView;
  const { schema } = state;
  const selectedStatus = null;

  const statusProps = {
    ...DEFAULT_STATUS,
    localId: uuid.generate(),
    ...status,
  };

  let tr = state.tr;
  const { showStatusPickerAt } = pluginKey.getState(state);

  if (!showStatusPickerAt) {
    // Same behaviour as quick insert (used in createStatus)
    const statusNode = schema.nodes.status.createChecked(statusProps);
    const fragment = Fragment.fromArray([statusNode, state.schema.text(' ')]);

    const newShowStatusPickerAt = tr.selection.from;
    tr = tr.replaceWith(newShowStatusPickerAt, newShowStatusPickerAt, fragment);
    tr = tr.setSelection(NodeSelection.create(tr.doc, newShowStatusPickerAt));
    tr = tr
      .setMeta(pluginKey, {
        showStatusPickerAt: newShowStatusPickerAt,
        selectedStatus,
        autoFocus,
      })
      .scrollIntoView();
    dispatch(tr);
    return true;
  }

  if (state.doc.nodeAt(showStatusPickerAt)) {
    tr = tr.setNodeMarkup(showStatusPickerAt, schema.nodes.status, statusProps);
    tr = tr.setSelection(NodeSelection.create(tr.doc, showStatusPickerAt));
    tr = tr
      .setMeta(pluginKey, { showStatusPickerAt, selectedStatus })
      .scrollIntoView();

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
    state.tr.setMeta(pluginKey, {
      showStatusPickerAt,
      autoFocus: false,
      selectedStatus: null,
    }),
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
  tr = tr.setMeta(pluginKey, {
    showStatusPickerAt: null,
    autoFocus: false,
    selectedStatus: null,
  });

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
