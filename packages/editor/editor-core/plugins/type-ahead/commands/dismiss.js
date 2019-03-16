import { findTypeAheadQuery } from '../utils/find-query-mark';
import { analyticsService } from '../../../analytics';
import { pluginKey } from '../pm-plugins/main';
export var dismissCommand = function () { return function (state, dispatch) {
    var queryMark = findTypeAheadQuery(state);
    if (queryMark === null) {
        return false;
    }
    var start = queryMark.start, end = queryMark.end;
    var schema = state.schema;
    var markType = schema.marks.typeAheadQuery;
    if (start === -1) {
        return false;
    }
    analyticsService.trackEvent('atlassian.editor.typeahead.dismiss');
    var typeAheadHandler = pluginKey.getState(state).typeAheadHandler;
    if (typeAheadHandler && typeAheadHandler.dismiss) {
        typeAheadHandler.dismiss(state);
    }
    if (dispatch) {
        dispatch(state.tr.removeMark(start, end, markType).removeStoredMark(markType));
    }
    return true;
}; };
//# sourceMappingURL=dismiss.js.map