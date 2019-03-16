import { toggleBlockMark, changeImageAlignment } from '../../../commands';
/**
 * Iterates over the commands one after the other,
 * passes the tr through and dispatches the cumulated transaction
 */
export var cascadeCommands = function (cmds) { return function (state, dispatch) {
    var baseTr = state.tr;
    var shouldDispatch = false;
    var onDispatchAction = function (tr) {
        tr.steps.forEach(function (st) {
            baseTr.step(st);
        });
        shouldDispatch = true;
    };
    cmds.forEach(function (cmd) {
        cmd(state, onDispatchAction);
    });
    if (dispatch && shouldDispatch) {
        dispatch(baseTr);
        return true;
    }
    return false;
}; };
export var isAlignable = function (align) { return function (state, dispatch) {
    var _a = state.schema, _b = _a.nodes, paragraph = _b.paragraph, heading = _b.heading, alignment = _a.marks.alignment;
    return toggleBlockMark(alignment, function () { return (!align ? undefined : align === 'start' ? false : { align: align }); }, [paragraph, heading])(state, dispatch);
}; };
export var changeAlignment = function (align) { return function (state, dispatch) {
    var _a = state.schema, _b = _a.nodes, paragraph = _b.paragraph, heading = _b.heading, alignment = _a.marks.alignment;
    return cascadeCommands([
        changeImageAlignment(align),
        toggleBlockMark(alignment, function () { return (!align ? undefined : align === 'start' ? false : { align: align }); }, [paragraph, heading]),
    ])(state, dispatch);
}; };
//# sourceMappingURL=index.js.map