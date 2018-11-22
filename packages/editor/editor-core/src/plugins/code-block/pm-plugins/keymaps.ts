import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
import { Plugin, EditorState } from 'prosemirror-state';
import {
  setTextSelection,
  findParentNodeOfTypeClosestToPos,
} from 'prosemirror-utils';
import { getCursor } from '../../../utils';

export function keymapPlugin(schema: Schema): Plugin | undefined {
  return keymap({
    Enter: (state: EditorState, dispatch) => {
      const {
        selection,
        schema: { nodes },
      } = state;
      const { $from, $to } = selection;
      const node = $from.node($from.depth);

      const selectionIsAtEndOfCodeBlock =
        node &&
        node.type === nodes.codeBlock &&
        $from.parentOffset === $from.parent.nodeSize - 2 && // cursor offset is at the end of block
        $from.indexAfter($from.depth) === node.childCount; // paragraph is the last child of code block
      const codeBlockEndsWithNewLine =
        node.lastChild &&
        node.lastChild.text &&
        node.lastChild.text.endsWith('\n');

      if (selectionIsAtEndOfCodeBlock && codeBlockEndsWithNewLine) {
        const tr = state.tr.insert(
          $to.pos + 1,
          nodes.paragraph.createChecked({}),
        );

        dispatch(
          setTextSelection($to.pos + 1)(tr)
            .delete($from.pos - 1, $from.pos)
            .scrollIntoView(),
        );
        return true;
      }
      return false;
    },
    Backspace: (state: EditorState, dispatch) => {
      const $cursor = getCursor(state.selection);
      if (
        $cursor &&
        $cursor.pos === 1 &&
        $cursor.parent.type === state.schema.nodes.codeBlock
      ) {
        const node = findParentNodeOfTypeClosestToPos(
          $cursor,
          state.schema.nodes.codeBlock,
        );

        if (!node) {
          return false;
        }

        dispatch(
          state.tr
            .setNodeMarkup(node.pos, node.node.type, node.node.attrs, [])
            .setBlockType(
              $cursor.pos,
              $cursor.pos,
              state.schema.nodes.paragraph,
            ),
        );
        return true;
      }
      return false;
    },
  });
}

export default keymapPlugin;
