import { findParentNode } from 'prosemirror-utils';
import { Command } from '../../../types';
import { isSupportedNodeForBreakout } from '../utils/is-supported-node';

export type BreakoutMode = 'wide' | 'full-width';

export function setBreakoutMode(mode: BreakoutMode): Command {
  return (state, dispatch) => {
    const node = findParentNode(isSupportedNodeForBreakout)(state.selection);

    if (!node) {
      return false;
    }

    dispatch(
      state.tr.setNodeMarkup(node.pos, node.node.type, node.node.attrs, [
        state.schema.marks.breakout.create({ mode }),
      ]),
    );

    return true;
  };
}
