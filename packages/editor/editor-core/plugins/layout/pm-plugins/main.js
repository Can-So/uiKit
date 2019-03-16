import * as tslib_1 from "tslib";
import { PluginKey, Plugin, TextSelection, } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';
import { keydownHandler } from 'prosemirror-keymap';
import { findParentNodeOfType } from 'prosemirror-utils';
import { filter } from '../../../utils/commands';
import { fixColumnSizes } from '../actions';
var isWholeSelectionInsideLayoutColumn = function (state) {
    // Since findParentNodeOfType doesn't check if selection.to shares the parent, we do this check ourselves
    var fromParent = findParentNodeOfType(state.schema.nodes.layoutColumn)(state.selection);
    if (fromParent) {
        var isToPosInsideSameLayoutColumn = state.selection.from < fromParent.pos + fromParent.node.nodeSize;
        return isToPosInsideSameLayoutColumn;
    }
    return false;
};
var moveCursorToNextColumn = function (state, dispatch) {
    var selection = state.selection;
    var _a = state.schema.nodes, layoutColumn = _a.layoutColumn, layoutSection = _a.layoutSection;
    var section = findParentNodeOfType(layoutSection)(selection);
    var column = findParentNodeOfType(layoutColumn)(selection);
    if (column.node !== section.node.lastChild) {
        var $nextColumn = state.doc.resolve(column.pos + column.node.nodeSize);
        var shiftedSelection = TextSelection.findFrom($nextColumn, 1);
        if (dispatch) {
            dispatch(state.tr.setSelection(shiftedSelection));
        }
    }
    return true;
};
// TODO: Look at memoize-one-ing this fn
var getNodeDecoration = function (pos, node) { return [
    Decoration.node(pos, pos + node.nodeSize, { class: 'selected' }),
]; };
var getInitialPluginState = function (pluginConfig, state) {
    var maybeLayoutSection = findParentNodeOfType(state.schema.nodes.layoutSection)(state.selection);
    var allowBreakout = typeof pluginConfig === 'object' ? !!pluginConfig.allowBreakout : false;
    var pos = maybeLayoutSection ? maybeLayoutSection.pos : null;
    return { pos: pos, allowBreakout: allowBreakout };
};
export var pluginKey = new PluginKey('layout');
export default (function (pluginConfig) {
    return new Plugin({
        key: pluginKey,
        state: {
            init: function (_, state) {
                return getInitialPluginState(pluginConfig, state);
            },
            apply: function (tr, pluginState, _oldState, newState) {
                if (tr.docChanged || tr.selectionSet) {
                    var maybeLayoutSection = findParentNodeOfType(newState.schema.nodes.layoutSection)(newState.selection);
                    var newPluginState = tslib_1.__assign({}, pluginState, { pos: maybeLayoutSection ? maybeLayoutSection.pos : null });
                    return newPluginState;
                }
                return pluginState;
            },
        },
        props: {
            decorations: function (state) {
                var layoutState = pluginKey.getState(state);
                if (layoutState.pos !== null) {
                    return DecorationSet.create(state.doc, getNodeDecoration(layoutState.pos, state.doc.nodeAt(layoutState.pos)));
                }
                return undefined;
            },
            handleKeyDown: keydownHandler({
                Tab: filter(isWholeSelectionInsideLayoutColumn, moveCursorToNextColumn),
            }),
        },
        appendTransaction: function (transactions, oldState, newState) {
            var changes = [];
            transactions.forEach(function (prevTr) {
                // remap change segments across the transaction set
                changes.map(function (change) {
                    return {
                        from: prevTr.mapping.map(change.from),
                        to: prevTr.mapping.map(change.to),
                        slice: change.slice,
                    };
                });
                // don't consider transactions that don't mutate
                if (!prevTr.docChanged) {
                    return;
                }
                var change = fixColumnSizes(prevTr, newState);
                if (change) {
                    changes.push(change);
                }
            });
            if (changes.length) {
                var tr_1 = newState.tr;
                var selection = newState.selection;
                changes.forEach(function (change) {
                    tr_1.replaceRange(change.from, change.to, change.slice);
                });
                if (tr_1.docChanged) {
                    tr_1.setSelection(selection);
                    tr_1.setMeta('addToHistory', false);
                    return tr_1;
                }
            }
        },
    });
});
//# sourceMappingURL=main.js.map