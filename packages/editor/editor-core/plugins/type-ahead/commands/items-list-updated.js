import { pluginKey, ACTIONS } from '../pm-plugins/main';
export var itemsListUpdated = function (items) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(pluginKey, {
            action: ACTIONS.ITEMS_LIST_UPDATED,
            items: items,
        }));
    }
    return true;
}; };
//# sourceMappingURL=items-list-updated.js.map