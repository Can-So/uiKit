import { findParentNode } from 'prosemirror-utils';
import { isSupportedNodeForBreakout } from '../utils/is-supported-node';
export function removeBreakout() {
    return function (state, dispatch) {
        var node = findParentNode(isSupportedNodeForBreakout)(state.selection);
        if (!node) {
            return false;
        }
        var marks = node.node.marks.filter(function (m) { return m.type.name !== 'breakout'; });
        if (dispatch) {
            dispatch(state.tr.setNodeMarkup(node.pos, node.node.type, node.node.attrs, marks));
        }
        return true;
    };
}
//# sourceMappingURL=remove-breakout.js.map