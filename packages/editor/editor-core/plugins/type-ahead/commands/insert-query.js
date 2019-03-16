import { safeInsert } from 'prosemirror-utils';
export function insertTypeAheadQuery(trigger) {
    return function (state, dispatch) {
        if (dispatch) {
            dispatch(safeInsert(state.schema.text(trigger, [
                state.schema.marks.typeAheadQuery.create({ trigger: trigger }),
            ]))(state.tr));
        }
        return true;
    };
}
//# sourceMappingURL=insert-query.js.map