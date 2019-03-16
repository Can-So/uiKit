import { pluginKey, ACTIONS } from '../pm-plugins/main';
export var setCurrentIndex = function (currentIndex) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(pluginKey, {
            action: ACTIONS.SET_CURRENT_INDEX,
            params: { currentIndex: currentIndex },
        }));
    }
    return true;
}; };
//# sourceMappingURL=set-current-index.js.map