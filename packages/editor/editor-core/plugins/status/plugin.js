import * as tslib_1 from "tslib";
import { DecorationSet, Decoration } from 'prosemirror-view';
import { Plugin, PluginKey, } from 'prosemirror-state';
import StatusNodeView from './nodeviews/status';
import { ReactNodeView } from '../../nodeviews';
import { ZWSP } from '../../utils';
import { mayGetStatusNodeAt, isEmptyStatus } from './utils';
export var pluginKey = new PluginKey('statusPlugin');
var SelectionChange = /** @class */ (function () {
    function SelectionChange() {
        this.changeHandlers = [];
        this.changeHandlers = [];
    }
    SelectionChange.prototype.subscribe = function (cb) {
        this.changeHandlers.push(cb);
    };
    SelectionChange.prototype.unsubscribe = function (cb) {
        this.changeHandlers = this.changeHandlers.filter(function (ch) { return ch !== cb; });
    };
    SelectionChange.prototype.notifyNewSelection = function (newSelection, prevSelection) {
        this.changeHandlers.forEach(function (cb) { return cb(newSelection, prevSelection); });
    };
    return SelectionChange;
}());
export { SelectionChange };
var createPlugin = function (_a) {
    var dispatch = _a.dispatch, portalProviderAPI = _a.portalProviderAPI;
    return new Plugin({
        state: {
            init: function () { return ({
                isNew: false,
                selectionChanges: new SelectionChange(),
                showStatusPickerAt: null,
                selectedStatus: null,
            }); },
            apply: function (tr, state, editorState) {
                var meta = tr.getMeta(pluginKey);
                var nodeAtSelection = tr.doc.nodeAt(tr.selection.from);
                if (state.showStatusPickerAt &&
                    (!nodeAtSelection ||
                        nodeAtSelection.type !== editorState.schema.nodes.status ||
                        // note: Status node has to==from+1 so from==to is positioned just before the Status node and StatusPicker should be dismissed
                        tr.selection.from === tr.selection.to)) {
                    var newState = tslib_1.__assign({}, state, { showStatusPickerAt: null, selectedStatus: null });
                    dispatch(pluginKey, newState);
                    return newState;
                }
                if (meta) {
                    var selectedStatus = null;
                    if (meta.showStatusPickerAt &&
                        meta.showStatusPickerAt !== state.showStatusPickerAt) {
                        var statusNode = tr.doc.nodeAt(meta.showStatusPickerAt);
                        if (statusNode) {
                            selectedStatus = statusNode.attrs;
                        }
                    }
                    var newState = tslib_1.__assign({}, state, meta, { selectedStatus: selectedStatus });
                    dispatch(pluginKey, newState);
                    return newState;
                }
                if (tr.docChanged && state.showStatusPickerAt) {
                    var _a = tr.mapping.mapResult(state.showStatusPickerAt), pos = _a.pos, deleted = _a.deleted;
                    var newState = tslib_1.__assign({}, state, { showStatusPickerAt: deleted ? null : pos, selectedStatus: null });
                    if (newState.showStatusPickerAt !== state.showStatusPickerAt) {
                        dispatch(pluginKey, newState);
                        return newState;
                    }
                }
                return state;
            },
        },
        appendTransaction: function (transactions, oldEditorState, newEditorState) {
            var changed = false;
            var tr = newEditorState.tr;
            // user leaves the StatusPicker with empty text and selects a new node
            if (transactions.find(function (tr) { return tr.selectionSet; })) {
                var oldStatus = mayGetStatusNodeAt(oldEditorState.selection);
                var newStatus = mayGetStatusNodeAt(newEditorState.selection);
                if (oldStatus &&
                    ((newStatus && oldStatus.localId !== newStatus.localId) || !newStatus)) {
                    if (isEmptyStatus(oldStatus)) {
                        var pos = oldEditorState.selection.from;
                        tr.delete(tr.mapping.map(pos), tr.mapping.map(pos + 1));
                        changed = true;
                    }
                }
            }
            return changed ? tr : undefined;
        },
        key: pluginKey,
        props: {
            nodeViews: {
                status: ReactNodeView.fromComponent(StatusNodeView, portalProviderAPI),
            },
            decorations: function (state) {
                var tr = state.tr;
                var nodeAtSelection = tr.doc.nodeAt(tr.selection.from);
                if (nodeAtSelection &&
                    nodeAtSelection.type === state.schema.nodes.status) {
                    var delayedNodeRendering = function () {
                        return document.createTextNode(ZWSP);
                    };
                    var decoration = Decoration.widget(tr.selection.from, delayedNodeRendering, {
                        side: 1,
                        key: '#status-zero-width-char-decoration',
                    });
                    var doc = state.doc;
                    return DecorationSet.create(doc, [decoration]);
                }
                return null;
            },
        },
        view: function (_view) {
            return {
                update: function (view, prevState) {
                    var newSelection = view.state.selection;
                    var prevSelection = prevState.selection;
                    if (!prevSelection.eq(newSelection)) {
                        // selection changed
                        var pluginState = pluginKey.getState(view.state);
                        var selectionChanges = pluginState.selectionChanges;
                        if (selectionChanges) {
                            selectionChanges.notifyNewSelection(newSelection, prevSelection);
                        }
                    }
                },
            };
        },
    });
};
export default createPlugin;
//# sourceMappingURL=plugin.js.map