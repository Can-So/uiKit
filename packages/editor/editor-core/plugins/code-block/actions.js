import { setParentNodeMarkup, removeParentNodeOfType } from 'prosemirror-utils';
export var removeCodeBlock = function (state, dispatch) {
    var nodes = state.schema.nodes, tr = state.tr;
    if (dispatch) {
        dispatch(removeParentNodeOfType(nodes.codeBlock)(tr));
    }
    return true;
};
export var changeLanguage = function (language) { return function (state, dispatch) {
    var nodes = state.schema.nodes, tr = state.tr;
    // setParentNodeMarkup doesn't typecheck the attributes
    var attrs = { language: language };
    if (dispatch) {
        dispatch(setParentNodeMarkup(nodes.codeBlock, null, attrs)(tr));
    }
    return true;
}; };
//# sourceMappingURL=actions.js.map