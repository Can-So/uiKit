import { findTypeAheadQuery } from '../utils/find-query-mark';
import { isQueryActive } from '../utils/is-query-active';
import { pluginKey, ACTIONS } from '../pm-plugins/main';
export var updateQueryCommand = function (query) { return function (state, dispatch) {
    var queryMark = findTypeAheadQuery(state);
    var activeQuery = isQueryActive(state.schema.marks.typeAheadQuery, state.doc, state.selection.from, state.selection.to);
    if (queryMark === null || activeQuery === false) {
        return false;
    }
    if (dispatch) {
        dispatch(state.tr.setMeta(pluginKey, {
            action: ACTIONS.SET_QUERY,
            params: { query: query },
        }));
    }
    return true;
}; };
//# sourceMappingURL=update-query.js.map