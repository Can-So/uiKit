import { NodeSelection } from 'prosemirror-state';
export var appearanceForNodeType = function (spec) {
    if (spec.name === 'inlineCard') {
        return 'inline';
    }
    else if (spec.name === 'blockCard') {
        return 'block';
    }
};
export var selectedCardAppearance = function (state) {
    return state.selection instanceof NodeSelection &&
        appearanceForNodeType(state.selection.node.type);
};
//# sourceMappingURL=utils.js.map