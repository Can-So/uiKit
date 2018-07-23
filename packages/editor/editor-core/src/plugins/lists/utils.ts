import { findWrapping } from 'prosemirror-transform';
import { Schema, ResolvedPos } from 'prosemirror-model';

export const isWrappingPossible = (nodeType, state) => {
  const { $from, $to } = state.selection;
  const range = $from.blockRange($to);
  if (!range) {
    return false;
  }

  const wrap = findWrapping(range, nodeType);
  if (!wrap) {
    return false;
  }

  return true;
};

// This will return (depth - 1) for root list parent of a list.
export const getListLiftTarget = (
  schema: Schema,
  resPos: ResolvedPos,
): number => {
  let target = resPos.depth;
  const { bulletList, orderedList, listItem } = schema.nodes;
  for (let i = resPos.depth; i > 0; i--) {
    const node = resPos.node(i);
    if (node.type === bulletList || node.type === orderedList) {
      target = i;
    }
    if (
      node.type !== bulletList &&
      node.type !== orderedList &&
      node.type !== listItem
    ) {
      break;
    }
  }
  return target - 1;
};
