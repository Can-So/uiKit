import { Selection, NodeSelection } from 'prosemirror-state';
import { Fragment, Node } from 'prosemirror-model';
import { safeInsert } from 'prosemirror-utils';
import { analyticsService } from '../../../analytics';
import { isChromeWithSelectionBug, normaliseNestedLayout, } from '../../../utils';
import { pluginKey, ACTIONS } from '../pm-plugins/main';
import { findTypeAheadQuery } from '../utils/find-query-mark';
import { dismissCommand } from './dismiss';
export var selectCurrentItem = function (mode) {
    if (mode === void 0) { mode = 'selected'; }
    return function (state, dispatch) {
        var _a = pluginKey.getState(state), active = _a.active, currentIndex = _a.currentIndex, items = _a.items, typeAheadHandler = _a.typeAheadHandler;
        if (!active || !typeAheadHandler) {
            return false;
        }
        if (!typeAheadHandler.selectItem || !items[currentIndex]) {
            return withTypeAheadQueryMarkPosition(state, function (start, end) {
                return insertFallbackCommand(start, end)(state, dispatch);
            });
        }
        return selectItem(typeAheadHandler, items[currentIndex], mode)(state, dispatch);
    };
};
export var selectSingleItemOrDismiss = function (mode) {
    if (mode === void 0) { mode = 'selected'; }
    return function (state, dispatch) {
        var _a = pluginKey.getState(state), active = _a.active, items = _a.items, typeAheadHandler = _a.typeAheadHandler;
        if (!active || !typeAheadHandler || !typeAheadHandler.selectItem) {
            return false;
        }
        if (items.length === 1) {
            return selectItem(typeAheadHandler, items[0], mode)(state, dispatch);
        }
        if (!items || items.length === 0) {
            dismissCommand()(state, dispatch);
            return false;
        }
        return false;
    };
};
export var selectByIndex = function (index) { return function (state, dispatch) {
    var _a = pluginKey.getState(state), active = _a.active, items = _a.items, typeAheadHandler = _a.typeAheadHandler;
    if (!active ||
        !typeAheadHandler ||
        !typeAheadHandler.selectItem ||
        !items[index]) {
        return false;
    }
    return selectItem(typeAheadHandler, items[index])(state, dispatch);
}; };
export var selectItem = function (handler, item, mode) {
    if (mode === void 0) { mode = 'selected'; }
    return function (state, dispatch) {
        return withTypeAheadQueryMarkPosition(state, function (start, end) {
            var insert = function (maybeNode, opts) {
                if (opts === void 0) { opts = {}; }
                var tr = state.tr;
                tr = tr
                    .setMeta(pluginKey, { action: ACTIONS.SELECT_CURRENT })
                    .replaceWith(start, end, Fragment.empty);
                if (!maybeNode) {
                    return tr;
                }
                var node;
                try {
                    node =
                        maybeNode instanceof Node
                            ? maybeNode
                            : typeof maybeNode === 'string'
                                ? state.schema.text(maybeNode)
                                : Node.fromJSON(state.schema, maybeNode);
                }
                catch (e) {
                    // tslint:disable-next-line:no-console
                    console.error(e);
                    return tr;
                }
                if (node.isText) {
                    tr = tr.replaceWith(start, start, node);
                    /**
                     *
                     * Replacing a type ahead query mark with a block node.
                     *
                     */
                }
                else if (node.isBlock) {
                    tr = safeInsert(normaliseNestedLayout(state, node))(tr);
                    /**
                     *
                     * Replacing a type ahead query mark with an inline node.
                     *
                     */
                }
                else if (node.isInline) {
                    var fragment = Fragment.fromArray([node, state.schema.text(' ')]);
                    tr = tr.replaceWith(start, start, fragment);
                    // This problem affects Chrome v58-62. See: https://github.com/ProseMirror/prosemirror/issues/710
                    if (isChromeWithSelectionBug) {
                        var selection = document.getSelection();
                        if (selection) {
                            selection.empty();
                        }
                    }
                    if (opts.selectInlineNode) {
                        // Select inserted node
                        tr = tr.setSelection(NodeSelection.create(tr.doc, start));
                    }
                    else {
                        // Placing cursor after node + space.
                        tr = tr.setSelection(Selection.near(tr.doc.resolve(start + fragment.size)));
                    }
                }
                return tr;
            };
            analyticsService.trackEvent('atlassian.editor.typeahead.select', { mode: mode });
            var tr = handler.selectItem(state, item, insert, { mode: mode });
            if (tr === false) {
                return insertFallbackCommand(start, end)(state, dispatch);
            }
            if (dispatch) {
                dispatch(tr);
            }
            return true;
        });
    };
};
export var insertFallbackCommand = function (start, end) { return function (state, dispatch) {
    var _a = pluginKey.getState(state), query = _a.query, trigger = _a.trigger;
    var node = state.schema.text(trigger + query);
    if (dispatch) {
        dispatch(state.tr.replaceWith(start, end, node));
    }
    return true;
}; };
export var withTypeAheadQueryMarkPosition = function (state, cb) {
    var queryMark = findTypeAheadQuery(state);
    if (!queryMark || queryMark.start === -1) {
        return false;
    }
    return cb(queryMark.start, queryMark.end);
};
//# sourceMappingURL=select-item.js.map