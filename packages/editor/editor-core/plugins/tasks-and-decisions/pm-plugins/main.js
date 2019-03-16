import * as tslib_1 from "tslib";
import { Plugin, PluginKey } from 'prosemirror-state';
import { uuid } from '@findable/adf-schema';
import { findParentNodeOfType } from 'prosemirror-utils';
import { decisionItemNodeView } from '../nodeviews/decisionItem';
import { taskItemNodeViewFactory } from '../nodeviews/taskItem';
export var stateKey = new PluginKey('tasksAndDecisionsPlugin');
var ACTIONS;
(function (ACTIONS) {
    ACTIONS[ACTIONS["SET_CURRENT_TASK_DECISION_ITEM"] = 0] = "SET_CURRENT_TASK_DECISION_ITEM";
    ACTIONS[ACTIONS["SET_CONTEXT_PROVIDER"] = 1] = "SET_CONTEXT_PROVIDER";
})(ACTIONS || (ACTIONS = {}));
var setCurrentTaskDecisionItem = function (item) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(stateKey, {
            action: ACTIONS.SET_CURRENT_TASK_DECISION_ITEM,
            data: item,
        }));
    }
    return true;
}; };
var setContextIdentifierProvider = function (provider) { return function (state, dispatch) {
    if (dispatch) {
        dispatch(state.tr.setMeta(stateKey, {
            action: ACTIONS.SET_CONTEXT_PROVIDER,
            data: provider,
        }));
    }
    return true;
}; };
export function createPlugin(portalProviderAPI, providerFactory, dispatch, editorAppearance) {
    return new Plugin({
        props: {
            nodeViews: {
                taskItem: taskItemNodeViewFactory(portalProviderAPI, providerFactory),
                decisionItem: decisionItemNodeView(portalProviderAPI),
            },
        },
        state: {
            init: function () {
                return { insideTaskDecisionItem: false };
            },
            apply: function (tr, pluginState) {
                var _a = tr.getMeta(stateKey) || {
                    action: null,
                    data: null,
                }, action = _a.action, data = _a.data;
                var newPluginState = pluginState;
                switch (action) {
                    case ACTIONS.SET_CURRENT_TASK_DECISION_ITEM:
                        newPluginState = tslib_1.__assign({}, pluginState, { currentTaskDecisionItem: data });
                        break;
                    case ACTIONS.SET_CONTEXT_PROVIDER:
                        newPluginState = tslib_1.__assign({}, pluginState, { contextIdentifierProvider: data });
                        break;
                }
                dispatch(stateKey, newPluginState);
                return newPluginState;
            },
        },
        view: function (editorView) {
            var providerHandler = function (name, providerPromise) {
                if (name === 'contextIdentifierProvider') {
                    if (!providerPromise) {
                        setContextIdentifierProvider(undefined)(editorView.state, editorView.dispatch);
                    }
                    else {
                        providerPromise.then(function (provider) {
                            setContextIdentifierProvider(provider)(editorView.state, editorView.dispatch);
                        });
                    }
                }
            };
            providerFactory.subscribe('contextIdentifierProvider', providerHandler);
            return {
                update: function (view) {
                    if (editorAppearance !== 'mobile') {
                        return;
                    }
                    /**
                     * For composition we need to hide the placeholder when the user is
                     * inside of a taskItem, this is done via pluginState since focus always
                     * lies with the root PM node.
                     *
                     * For web this should always display the placeholder until there is content.
                     * Only mobile will hide the placeholder on focus.
                     *
                     * @see ED-5924
                     */
                    var state = view.state, dispatch = view.dispatch;
                    var selection = state.selection, schema = state.schema;
                    var currentTaskDecisionItem = stateKey.getState(state).currentTaskDecisionItem;
                    var taskDecisionItem = findParentNodeOfType([
                        schema.nodes.taskItem,
                        schema.nodes.decisionItem,
                    ])(selection);
                    if (!taskDecisionItem && currentTaskDecisionItem) {
                        setCurrentTaskDecisionItem(undefined)(state, dispatch);
                        return;
                    }
                    if (taskDecisionItem &&
                        currentTaskDecisionItem &&
                        taskDecisionItem.node.eq(currentTaskDecisionItem) === false) {
                        setCurrentTaskDecisionItem(taskDecisionItem.node)(state, dispatch);
                        return;
                    }
                    if (taskDecisionItem && !currentTaskDecisionItem) {
                        setCurrentTaskDecisionItem(taskDecisionItem.node)(state, dispatch);
                        return;
                    }
                },
            };
        },
        key: stateKey,
        /*
         * After each transaction, we search through the document for any decisionList/Item & taskList/Item nodes
         * that do not have the localId attribute set and generate a random UUID to use. This is to replace a previous
         * Prosemirror capabibility where node attributes could be generated dynamically.
         * See https://discuss.prosemirror.net/t/release-0-23-0-possibly-to-be-1-0-0/959/17 for a discussion of this approach.
         *
         * Note: we currently do not handle the edge case where two nodes may have the same localId
         */
        appendTransaction: function (transactions, _oldState, newState) {
            var tr = newState.tr;
            var modified = false;
            if (transactions.some(function (transaction) { return transaction.docChanged; })) {
                // Adds a unique id to a node
                newState.doc.descendants(function (node, pos) {
                    var _a = newState.schema.nodes, decisionList = _a.decisionList, decisionItem = _a.decisionItem, taskList = _a.taskList, taskItem = _a.taskItem;
                    if (!!node.type &&
                        (node.type === decisionList ||
                            node.type === decisionItem ||
                            node.type === taskList ||
                            node.type === taskItem)) {
                        var _b = node.attrs, localId = _b.localId, rest = tslib_1.__rest(_b, ["localId"]);
                        if (localId === undefined || localId === null || localId === '') {
                            tr.setNodeMarkup(pos, undefined, tslib_1.__assign({ localId: uuid.generate() }, rest));
                            modified = true;
                        }
                    }
                });
            }
            if (modified) {
                return tr;
            }
            return;
        },
    });
}
//# sourceMappingURL=main.js.map