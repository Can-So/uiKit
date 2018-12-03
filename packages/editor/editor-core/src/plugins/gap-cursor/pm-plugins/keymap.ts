import { keymap } from 'prosemirror-keymap';
import { EditorState, Plugin, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import * as keymaps from '../../../keymaps';
import { arrow, deleteNode } from '../actions';
import { Direction } from '../direction';

export default function keymapPlugin(): Plugin {
  const map = {};

  keymaps.bindKeymapWithCommand(
    keymaps.moveLeft.common!,
    (
      state: EditorState,
      dispatch: (tr: Transaction) => void,
      view?: EditorView,
    ) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.LEFT, endOfTextblock)(state, dispatch);
    },
    map,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveRight.common!,
    (
      state: EditorState,
      dispatch: (tr: Transaction) => void,
      view?: EditorView,
    ) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.RIGHT, endOfTextblock)(state, dispatch);
    },
    map,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveUp.common!,
    (
      state: EditorState,
      dispatch: (tr: Transaction) => void,
      view?: EditorView,
    ) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.UP, endOfTextblock)(state, dispatch);
    },
    map,
  );

  keymaps.bindKeymapWithCommand(
    keymaps.moveDown.common!,
    (
      state: EditorState,
      dispatch: (tr: Transaction) => void,
      view?: EditorView,
    ) => {
      const endOfTextblock = view ? view.endOfTextblock.bind(view) : undefined;
      return arrow(Direction.DOWN, endOfTextblock)(state, dispatch);
    },
    map,
  );

  // default PM's Backspace doesn't handle removing block nodes when cursor is after it
  keymaps.bindKeymapWithCommand(
    keymaps.backspace.common!,
    deleteNode(Direction.BACKWARD),
    map,
  );

  // handle Delete key (remove node after the cursor)
  keymaps.bindKeymapWithCommand(
    keymaps.deleteKey.common!,
    deleteNode(Direction.FORWARD),
    map,
  );

  return keymap(map);
}
