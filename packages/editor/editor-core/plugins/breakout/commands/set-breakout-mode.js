import { findParentNode } from 'prosemirror-utils';
import { isSupportedNodeForBreakout } from '../utils/is-supported-node';
export function setBreakoutMode(mode) {
    return function (state, dispatch) {
        var node = findParentNode(isSupportedNodeForBreakout)(state.selection);
        if (!node) {
            return false;
        }
        if (dispatch) {
            dispatch(state.tr.setNodeMarkup(node.pos, node.node.type, node.node.attrs, [
                state.schema.marks.breakout.create({ mode: mode }),
            ]));
        }
        return true;
    };
}
//# sourceMappingURL=set-breakout-mode.js.map