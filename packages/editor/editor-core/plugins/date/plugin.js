import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import DateNodeView from './nodeviews/date';
import { ReactNodeView } from '../../nodeviews';
export var pluginKey = new PluginKey('datePlugin');
var createPlugin = function (_a) {
    var dispatch = _a.dispatch, portalProviderAPI = _a.portalProviderAPI;
    return new Plugin({
        state: {
            init: function () { return ({ showDatePickerAt: null }); },
            apply: function (tr, state) {
                var meta = tr.getMeta(pluginKey);
                if (meta) {
                    // ED-5033, calendar control open for element in plugin state, when node-view is clicked.
                    // Following chanek ensures that if same node-view is clicked twice calendar should close,
                    // but if a different node-view is clicked, calendar should open next the that node-view.
                    var newState = void 0;
                    if (meta.showDatePickerAt === state.showDatePickerAt) {
                        newState = tslib_1.__assign({}, state, { showDatePickerAt: null });
                    }
                    else {
                        newState = tslib_1.__assign({}, state, meta);
                    }
                    dispatch(pluginKey, newState);
                    return newState;
                }
                if (tr.docChanged && state.showDatePickerAt) {
                    var _a = tr.mapping.mapResult(state.showDatePickerAt), pos = _a.pos, deleted = _a.deleted;
                    var newState = {
                        showDatePickerAt: deleted ? null : pos,
                    };
                    if (newState.showDatePickerAt !== state.showDatePickerAt) {
                        dispatch(pluginKey, newState);
                        return newState;
                    }
                }
                return state;
            },
        },
        key: pluginKey,
        props: {
            nodeViews: {
                date: ReactNodeView.fromComponent(DateNodeView, portalProviderAPI),
            },
        },
    });
};
export default createPlugin;
//# sourceMappingURL=plugin.js.map