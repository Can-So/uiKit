import { keymap } from 'prosemirror-keymap';
import { Schema } from 'prosemirror-model';
import { Plugin, EditorState } from 'prosemirror-state';
import {
  findParentNodeOfTypeClosestToPos,
  hasParentNodeOfType,
} from 'prosemirror-utils';
import { getCursor } from '../../../utils';

export function keymapPlugin(schema: Schema): Plugin | undefined {
  return keymap({
    Backspace: (state: EditorState, dispatch) => {
      const $cursor = getCursor(state.selection);
      const { paragraph, codeBlock, listItem } = state.schema.nodes;
      if (!$cursor || $cursor.parent.type !== codeBlock) {
        return false;
      }

      if (
        $cursor.pos === 1 ||
        (hasParentNodeOfType(listItem)(state.selection) &&
          $cursor.parentOffset === 0)
      ) {
        const node = findParentNodeOfTypeClosestToPos($cursor, codeBlock);

        if (!node) {
          return false;
        }

        dispatch(
          state.tr
            .setNodeMarkup(node.pos, node.node.type, node.node.attrs, [])
            .setBlockType($cursor.pos, $cursor.pos, paragraph),
        );
        return true;
      }

      return false;
    },
  });
}

export default keymapPlugin;
