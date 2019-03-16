import { findParentNode } from 'prosemirror-utils';
import { isSupportedNodeForBreakout } from './is-supported-node';
export function isBreakoutMarkAllowed(state) {
    if (!state.schema.marks.breakout) {
        return false;
    }
    var node = findParentNode(isSupportedNodeForBreakout)(state.selection);
    if (!node || node.depth === 0) {
        return false;
    }
    var parent = state.selection.$from.node(node.depth - 1);
    return parent.type.allowsMarkType(state.schema.marks.breakout);
}
//# sourceMappingURL=is-breakout-mark-allowed.js.map