import { findParentNode } from 'prosemirror-utils';
import { isSupportedNodeForBreakout } from './is-supported-node';
export function getBreakoutMode(state) {
    var node = findParentNode(isSupportedNodeForBreakout)(state.selection);
    if (!node) {
        return;
    }
    var breakoutMark = node.node.marks.find(function (m) { return m.type.name === 'breakout'; });
    if (!breakoutMark) {
        return;
    }
    return breakoutMark.attrs.mode;
}
//# sourceMappingURL=get-breakout-mode.js.map