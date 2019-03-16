import { keymap } from 'prosemirror-keymap';
import { Selection } from 'prosemirror-state';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { isSupportedSourceNode, splitListAtSelection, insertTaskDecisionWithAnalytics, } from '../commands';
// tries to find a valid cursor position
var setTextSelection = function (pos) { return function (tr) {
    var newSelection = Selection.findFrom(tr.doc.resolve(pos), -1, true);
    if (newSelection) {
        tr.setSelection(newSelection);
    }
    return tr;
}; };
var isInsideTaskOrDecisionItem = function (state) {
    var _a = state.schema.nodes, decisionItem = _a.decisionItem, taskItem = _a.taskItem;
    return hasParentNodeOfType([decisionItem, taskItem])(state.selection);
};
export function keymapPlugin(schema) {
    var deleteCurrentItem = function ($from, tr) {
        return tr.delete($from.before($from.depth) - 1, $from.end($from.depth) + 1);
    };
    /*
     * Since the DecisionItem and TaskItem only accepts inline-content, we won't get any of the default behaviour from ProseMirror
     * eg. behaviour for backspace and enter etc. So we need to implement it.
     */
    var keymaps = {
        Backspace: function (state, dispatch) {
            var selection = state.selection, nodes = state.schema.nodes, tr = state.tr;
            var decisionList = nodes.decisionList, decisionItem = nodes.decisionItem, taskList = nodes.taskList, taskItem = nodes.taskItem;
            if ((!decisionItem || !decisionList) && (!taskList || !taskItem)) {
                return false;
            }
            var $from = selection.$from, $to = selection.$to;
            // Don't do anything if selection is a range
            if ($from.pos !== $to.pos) {
                return false;
            }
            // Don't do anything if the cursor isn't at the beginning of the node.
            if ($from.parentOffset !== 0) {
                return false;
            }
            var previousPos = tr.doc.resolve(Math.max(0, $from.before($from.depth) - 1));
            var previousNodeType = previousPos.pos > 0 && previousPos.node(1) && previousPos.node(1).type;
            var parentNodeType = $from.node(1).type;
            var previousNodeIsList = previousNodeType === decisionList || previousNodeType === taskList;
            var parentNodeIsList = parentNodeType === decisionList || parentNodeType === taskList;
            if (previousNodeIsList && !parentNodeIsList) {
                var content = $from.node($from.depth).content;
                var insertPos = previousPos.pos - 1;
                deleteCurrentItem($from, tr).insert(insertPos, content);
                dispatch(setTextSelection(insertPos)(tr).scrollIntoView());
                return true;
            }
            var nodeType = $from.node().type;
            if (nodeType !== decisionItem && nodeType !== taskItem) {
                return false;
            }
            dispatch(splitListAtSelection(tr, schema));
            return true;
        },
        Delete: function (state, dispatch) {
            var selection = state.selection, nodes = state.schema.nodes, tr = state.tr;
            var nodeIsTaskOrDecisionItem = isInsideTaskOrDecisionItem(state);
            var decisionList = nodes.decisionList, decisionItem = nodes.decisionItem, taskList = nodes.taskList, taskItem = nodes.taskItem;
            if (((!decisionItem || !decisionList) && (!taskList || !taskItem)) ||
                !nodeIsTaskOrDecisionItem) {
                return false;
            }
            var $from = selection.$from, $to = selection.$to;
            // Don't do anything if selection is a range
            if ($from.pos !== $to.pos) {
                return false;
            }
            // Don't do anything if the cursor isn't at the end of the node.
            var endOfItem = $from.end();
            var isAtEndOfItem = $from.pos === endOfItem;
            if (!isAtEndOfItem) {
                return false;
            }
            var list = $from.node($from.depth - 1);
            var isAtEndOfList = list.lastChild === $from.node();
            // split list, converted next item to a paragraph when not at end
            if (!isAtEndOfList) {
                setTextSelection(endOfItem + 2)(tr);
                splitListAtSelection(tr, schema);
                setTextSelection($from.pos)(tr);
                tr.scrollIntoView();
                dispatch(tr);
                return true;
            }
            var listPos = tr.doc.resolve($from.after($from.depth - 1));
            var nodeAfterList = listPos.nodeAfter;
            if (!nodeAfterList) {
                // nothing after - default to prosemirror
                return false;
            }
            if (!isSupportedSourceNode(schema, selection)) {
                // Unsupported content in following node, do nothing.
                return true;
            }
            var nodeAfterPos = tr.doc.resolve(listPos.pos + 1);
            var nodeAfterType = nodeAfterList.type;
            if (nodeAfterType === decisionList || nodeAfterType === taskList) {
                // Do nothing until FS-2896 is implemented
                return true;
            }
            var newContent = nodeAfterList.content;
            tr.delete(nodeAfterPos.before(), nodeAfterPos.after());
            tr.insert($from.pos, newContent);
            setTextSelection($from.pos)(tr);
            tr.scrollIntoView();
            dispatch(tr);
            return true;
        },
        Enter: function (state, dispatch) {
            var selection = state.selection, tr = state.tr;
            var $from = selection.$from;
            var nodeIsTaskOrDecisionItem = isInsideTaskOrDecisionItem(state);
            var node = $from.node($from.depth);
            var nodeType = node && node.type;
            var isEmpty = node && node.textContent.length === 0;
            var listType = nodeType === state.schema.nodes.taskItem ? 'taskList' : 'decisionList';
            if (nodeIsTaskOrDecisionItem) {
                if (!isEmpty) {
                    var addItem = function (_a) {
                        var tr = _a.tr, itemLocalId = _a.itemLocalId;
                        return tr.split($from.pos, 1, [
                            { type: nodeType, attrs: { localId: itemLocalId } },
                        ]);
                    };
                    var insertTr = insertTaskDecisionWithAnalytics(state, listType, "keyboard" /* KEYBOARD */, addItem);
                    if (insertTr) {
                        dispatch(insertTr);
                    }
                    return true;
                }
                // Otherwise, split list
                splitListAtSelection(tr, schema);
                dispatch(tr);
                return true;
            }
            return false;
        },
    };
    return keymap(keymaps);
}
export default keymapPlugin;
//# sourceMappingURL=keymaps.js.map