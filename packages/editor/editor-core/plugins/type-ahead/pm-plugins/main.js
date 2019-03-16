import * as tslib_1 from "tslib";
import { Plugin, PluginKey, TextSelection, } from 'prosemirror-state';
import { isMarkTypeAllowedInCurrentSelection } from '../../../utils';
import { dismissCommand } from '../commands/dismiss';
import { itemsListUpdated } from '../commands/items-list-updated';
import { updateQueryCommand } from '../commands/update-query';
import { isQueryActive } from '../utils/is-query-active';
import { findTypeAheadQuery } from '../utils/find-query-mark';
export var pluginKey = new PluginKey('typeAheadPlugin');
export var ACTIONS = {
    SELECT_PREV: 'SELECT_PREV',
    SELECT_NEXT: 'SELECT_NEXT',
    SELECT_CURRENT: 'SELECT_CURRENT',
    SET_CURRENT_INDEX: 'SET_CURRENT_INDEX',
    SET_QUERY: 'SET_QUERY',
    ITEMS_LIST_UPDATED: 'ITEMS_LIST_UPDATED',
};
export function createInitialPluginState(prevActiveState, isAllowed) {
    if (prevActiveState === void 0) { prevActiveState = false; }
    if (isAllowed === void 0) { isAllowed = true; }
    return {
        isAllowed: isAllowed,
        active: false,
        prevActiveState: prevActiveState,
        query: null,
        trigger: null,
        typeAheadHandler: null,
        currentIndex: 0,
        items: [],
        itemsLoader: null,
        queryMarkPos: null,
        queryStarted: 0,
        upKeyCount: 0,
        downKeyCount: 0,
    };
}
export function createPlugin(dispatch, reactContext, typeAhead) {
    return new Plugin({
        key: pluginKey,
        state: {
            init: function () {
                return createInitialPluginState();
            },
            apply: function (tr, pluginState, oldState, state) {
                var meta = tr.getMeta(pluginKey) || {};
                var action = meta.action, params = meta.params;
                switch (action) {
                    case ACTIONS.SET_CURRENT_INDEX:
                        return setCurrentItemIndex({
                            dispatch: dispatch,
                            pluginState: pluginState,
                            tr: tr,
                            params: params,
                        });
                    case ACTIONS.SELECT_PREV:
                        return selectPrevActionHandler({ dispatch: dispatch, pluginState: pluginState, tr: tr });
                    case ACTIONS.SELECT_NEXT:
                        return selectNextActionHandler({ dispatch: dispatch, pluginState: pluginState, tr: tr });
                    case ACTIONS.ITEMS_LIST_UPDATED:
                        return itemsListUpdatedActionHandler({ dispatch: dispatch, pluginState: pluginState, tr: tr });
                    case ACTIONS.SELECT_CURRENT:
                        var _a = tr.selection, from = _a.from, to = _a.to;
                        var typeAheadQuery = state.schema.marks.typeAheadQuery;
                        // If inserted content has typeAheadQuery mark should fallback to default action handler
                        return tr.doc.rangeHasMark(from - 1, to, typeAheadQuery)
                            ? defaultActionHandler({
                                dispatch: dispatch,
                                reactContext: reactContext,
                                typeAhead: typeAhead,
                                state: state,
                                pluginState: pluginState,
                                tr: tr,
                            })
                            : selectCurrentActionHandler({ dispatch: dispatch, pluginState: pluginState, tr: tr });
                    case ACTIONS.SET_QUERY:
                        return updateQueryHandler({ dispatch: dispatch, pluginState: pluginState, tr: tr, params: params });
                    default:
                        return defaultActionHandler({
                            dispatch: dispatch,
                            reactContext: reactContext,
                            typeAhead: typeAhead,
                            state: state,
                            pluginState: pluginState,
                            tr: tr,
                        });
                }
            },
        },
        view: function () {
            return {
                update: function (editorView) {
                    var pluginState = pluginKey.getState(editorView.state);
                    if (!pluginState) {
                        return;
                    }
                    var state = editorView.state, dispatch = editorView.dispatch;
                    var doc = state.doc, selection = state.selection;
                    var from = selection.from, to = selection.to;
                    var typeAheadQuery = state.schema.marks.typeAheadQuery;
                    // Disable type ahead query when removing trigger.
                    if (pluginState.active &&
                        !pluginState.query &&
                        !pluginState.trigger) {
                        dismissCommand()(state, dispatch);
                        return;
                    }
                    // Disable type ahead query when the first character is a space.
                    if (pluginState.active &&
                        (pluginState.query || '').indexOf(' ') === 0) {
                        dismissCommand()(state, dispatch);
                        return;
                    }
                    // Optimization to not call dismissCommand if plugin is in an inactive state.
                    if (!pluginState.active &&
                        pluginState.prevActiveState &&
                        !doc.rangeHasMark(from - 1, to, typeAheadQuery)) {
                        dismissCommand()(state, dispatch);
                        return;
                    }
                    // Fetch type ahead items if handler returned a promise.
                    if (pluginState.active && pluginState.itemsLoader) {
                        pluginState.itemsLoader.promise.then(function (items) {
                            return itemsListUpdated(items)(editorView.state, dispatch);
                        });
                    }
                },
            };
        },
        props: {
            handleDOMEvents: {
                input: function (view, event) {
                    var _a = view, state = _a.state, dispatch = _a.dispatch, domChange = _a.inDOMChange;
                    var selection = state.selection, schema = state.schema;
                    if (selection instanceof TextSelection &&
                        selection.$cursor &&
                        schema.marks.typeAheadQuery.isInSet(selection.$cursor.marks())) {
                        updateQueryCommand(event.data)(state, dispatch);
                        return false;
                    }
                    var triggers = typeAhead.map(function (typeAheadHandler) { return typeAheadHandler.trigger; });
                    if (triggers.indexOf(event.data) !== -1 &&
                        event.inputType === 'insertCompositionText' &&
                        domChange &&
                        domChange.composing) {
                        domChange.finish(true);
                    }
                    return false;
                },
            },
        },
    });
}
export function createItemsLoader(promiseOfItems) {
    var canceled = false;
    return {
        promise: new Promise(function (resolve, reject) {
            promiseOfItems
                .then(function (result) { return !canceled && resolve(result); })
                .catch(function (error) { return !canceled && reject(error); });
        }),
        cancel: function () {
            canceled = true;
        },
    };
}
export function defaultActionHandler(_a) {
    var dispatch = _a.dispatch, reactContext = _a.reactContext, typeAhead = _a.typeAhead, pluginState = _a.pluginState, state = _a.state, tr = _a.tr;
    var typeAheadQuery = state.schema.marks.typeAheadQuery;
    var doc = state.doc, selection = state.selection;
    var from = selection.from, to = selection.to;
    var isActive = isQueryActive(typeAheadQuery, doc, from - 1, to);
    var isAllowed = isMarkTypeAllowedInCurrentSelection(typeAheadQuery, state);
    if (!isAllowed && !isActive) {
        var newPluginState_1 = createInitialPluginState(pluginState.active, isAllowed);
        dispatch(pluginKey, newPluginState_1);
        return newPluginState_1;
    }
    var nodeBefore = selection.$from.nodeBefore;
    if (!isActive || !nodeBefore || !pluginState) {
        var newPluginState_2 = createInitialPluginState(pluginState ? pluginState.active : false);
        if (!pluginState || pluginState.active || !pluginState.isAllowed) {
            dispatch(pluginKey, newPluginState_2);
        }
        return newPluginState_2;
    }
    var typeAheadMark = typeAheadQuery.isInSet(nodeBefore.marks || []);
    if (!typeAheadMark || !typeAheadMark.attrs.trigger) {
        return pluginState;
    }
    var textContent = nodeBefore.textContent || '';
    var trigger = typeAheadMark.attrs.trigger.replace(/([^\x00-\xFF]|[\s\n])+/g, '');
    // If trigger has been removed, reset plugin state
    if (!textContent.includes(trigger)) {
        var newPluginState_3 = tslib_1.__assign({}, createInitialPluginState(true), { active: true });
        dispatch(pluginKey, newPluginState_3);
        return newPluginState_3;
    }
    var query = textContent
        .replace(/^([^\x00-\xFF]|[\s\n])+/g, '')
        .replace(trigger, '');
    var typeAheadHandler = typeAhead.find(function (t) { return t.trigger === trigger; });
    var typeAheadItems = [];
    var itemsLoader = null;
    try {
        var intl = reactContext().intl;
        typeAheadItems = typeAheadHandler.getItems(query, state, intl, {
            prevActive: pluginState.prevActiveState,
            queryChanged: query !== pluginState.query,
        }, tr, dispatch);
        if (pluginState.itemsLoader) {
            pluginState.itemsLoader.cancel();
        }
        if (typeAheadItems.then) {
            itemsLoader = createItemsLoader(typeAheadItems);
            typeAheadItems = pluginState.items;
        }
    }
    catch (e) { }
    var queryMark = findTypeAheadQuery(state);
    var newPluginState = {
        isAllowed: isAllowed,
        query: query,
        trigger: trigger,
        typeAheadHandler: typeAheadHandler,
        active: true,
        prevActiveState: pluginState.active,
        items: typeAheadItems,
        itemsLoader: itemsLoader,
        currentIndex: pluginState.currentIndex,
        queryMarkPos: queryMark !== null ? queryMark.start : null,
        queryStarted: Date.now(),
        upKeyCount: 0,
        downKeyCount: 0,
    };
    dispatch(pluginKey, newPluginState);
    return newPluginState;
}
export function setCurrentItemIndex(_a) {
    var dispatch = _a.dispatch, pluginState = _a.pluginState, params = _a.params;
    if (!params) {
        return pluginState;
    }
    var newPluginState = tslib_1.__assign({}, pluginState, { currentIndex: params.currentIndex || params.currentIndex === 0
            ? params.currentIndex
            : pluginState.currentIndex });
    dispatch(pluginKey, newPluginState);
    return newPluginState;
}
export function updateQueryHandler(_a) {
    var dispatch = _a.dispatch, pluginState = _a.pluginState, params = _a.params;
    if (!params) {
        return pluginState;
    }
    var newPluginState = tslib_1.__assign({}, pluginState, { query: typeof params.query === 'string' ? params.query : null });
    dispatch(pluginKey, newPluginState);
    return newPluginState;
}
export function selectPrevActionHandler(_a) {
    var dispatch = _a.dispatch, pluginState = _a.pluginState;
    var newIndex = pluginState.currentIndex - 1;
    var newPluginState = tslib_1.__assign({}, pluginState, { currentIndex: newIndex < 0 ? pluginState.items.length - 1 : newIndex, upKeyCount: ++pluginState.upKeyCount });
    dispatch(pluginKey, newPluginState);
    return newPluginState;
}
export function selectNextActionHandler(_a) {
    var dispatch = _a.dispatch, pluginState = _a.pluginState;
    var newIndex = pluginState.currentIndex + 1;
    var newPluginState = tslib_1.__assign({}, pluginState, { currentIndex: newIndex > pluginState.items.length - 1 ? 0 : newIndex, downKeyCount: ++pluginState.downKeyCount });
    dispatch(pluginKey, newPluginState);
    return newPluginState;
}
export function itemsListUpdatedActionHandler(_a) {
    var dispatch = _a.dispatch, pluginState = _a.pluginState, tr = _a.tr;
    var items = tr.getMeta(pluginKey).items;
    var newPluginState = tslib_1.__assign({}, pluginState, { items: items, itemsLoader: null, currentIndex: pluginState.currentIndex > items.length ? 0 : pluginState.currentIndex });
    dispatch(pluginKey, newPluginState);
    return newPluginState;
}
export function selectCurrentActionHandler(_a) {
    var dispatch = _a.dispatch, pluginState = _a.pluginState;
    var newPluginState = createInitialPluginState(false);
    dispatch(pluginKey, newPluginState);
    return newPluginState;
}
//# sourceMappingURL=main.js.map