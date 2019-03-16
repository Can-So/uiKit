import { uuid } from '@findable/adf-schema';
import { TextSelection, } from 'prosemirror-state';
import { safeInsert, hasParentNodeOfType, replaceParentNodeOfType, findParentNodeOfType, } from 'prosemirror-utils';
import { GapCursorSelection } from '../gap-cursor';
import { addAnalytics, } from '../analytics';
import { stateKey as taskDecisionStateKey } from './pm-plugins/main';
var getContextData = function (contextProvider) {
    if (contextProvider === void 0) { contextProvider = {}; }
    var objectId = contextProvider.objectId, containerId = contextProvider.containerId;
    var userContext = objectId
        ? "edit" /* EDIT */
        : "new" /* NEW */;
    return {
        objectId: objectId,
        containerId: containerId,
        userContext: userContext,
    };
};
var generateAnalyticsPayload = function (listType, contextData, inputMethod, itemLocalId, listLocalId, itemIdx, listSize) {
    var containerId;
    var objectId;
    var userContext;
    if (contextData) {
        (containerId = contextData.containerId, objectId = contextData.objectId, userContext = contextData.userContext);
    }
    return {
        action: "inserted" /* INSERTED */,
        actionSubject: "document" /* DOCUMENT */,
        actionSubjectId: listType === 'taskList'
            ? "action" /* ACTION */
            : "decision" /* DECISION */,
        eventType: "track" /* TRACK */,
        attributes: {
            inputMethod: inputMethod,
            containerAri: containerId,
            objectAri: objectId,
            userContext: userContext,
            localId: itemLocalId,
            listLocalId: listLocalId,
            position: itemIdx,
            listSize: listSize,
        },
    };
};
export var getListTypes = function (listType, schema) {
    var _a = schema.nodes, decisionList = _a.decisionList, decisionItem = _a.decisionItem, taskList = _a.taskList, taskItem = _a.taskItem;
    if (listType === 'taskList') {
        return {
            list: taskList,
            item: taskItem,
        };
    }
    return {
        list: decisionList,
        item: decisionItem,
    };
};
export var insertTaskDecision = function (view, listType, inputMethod) {
    if (inputMethod === void 0) { inputMethod = "toolbar" /* TOOLBAR */; }
    var state = view.state;
    var schema = state.schema;
    var addAndCreateList = function (_a) {
        var tr = _a.tr, list = _a.list, item = _a.item, listLocalId = _a.listLocalId, itemLocalId = _a.itemLocalId;
        return createListAtSelection(tr, list, item, schema, state, listLocalId, itemLocalId);
    };
    var addToList = function (_a) {
        var state = _a.state, tr = _a.tr, item = _a.item, itemLocalId = _a.itemLocalId;
        var $to = state.selection.$to;
        var pos = $to.end($to.depth);
        return tr
            .split(pos, 1, [{ type: item, attrs: { localId: itemLocalId } }])
            .setSelection(new TextSelection(tr.doc.resolve(pos + $to.depth)));
    };
    var tr = insertTaskDecisionWithAnalytics(state, listType, inputMethod, addAndCreateList, addToList);
    if (tr) {
        view.dispatch(tr);
        return true;
    }
    return false;
};
export var insertTaskDecisionWithAnalytics = function (state, listType, inputMethod, addAndCreateList, addToList) {
    var schema = state.schema;
    var _a = getListTypes(listType, schema), list = _a.list, item = _a.item;
    var tr = state.tr;
    var $to = state.selection.$to;
    var listNode = findParentNodeOfType(list)(state.selection);
    var itemLocalId = uuid.generate();
    var contextIdentifierProvider = taskDecisionStateKey.getState(state)
        .contextIdentifierProvider;
    var contextData = getContextData(contextIdentifierProvider);
    var listLocalId;
    var insertTrCreator;
    var itemIdx;
    var listSize;
    if (!listNode) {
        // Not a list - convert to one.
        listLocalId = uuid.generate();
        itemIdx = 0;
        listSize = 1;
        insertTrCreator = addAndCreateList;
    }
    else if ($to.node().textContent.length > 0) {
        listSize = listNode.node.childCount + 1;
        listLocalId = listNode.node.attrs.localId;
        var listItemNode = findParentNodeOfType(item)(state.selection); // finds current item in list
        itemIdx = listItemNode
            ? state.doc.resolve(listItemNode.pos).index() + 1
            : 0;
        insertTrCreator = addToList ? addToList : addAndCreateList;
    }
    if (insertTrCreator) {
        var insertTr = insertTrCreator({
            state: state,
            tr: tr,
            list: list,
            item: item,
            listLocalId: listLocalId,
            itemLocalId: itemLocalId,
        });
        if (insertTr) {
            insertTr = addAnalytics(insertTr, generateAnalyticsPayload(listType, contextData, inputMethod, itemLocalId, listLocalId, itemIdx || 0, listSize || 0));
        }
        return insertTr;
    }
    return null;
};
export var isSupportedSourceNode = function (schema, selection) {
    var _a = schema.nodes, paragraph = _a.paragraph, blockquote = _a.blockquote, decisionList = _a.decisionList, taskList = _a.taskList;
    return hasParentNodeOfType([blockquote, paragraph, decisionList, taskList])(selection);
};
export var changeInDepth = function (before, after) {
    return after.depth - before.depth;
};
export var createListAtSelection = function (tr, list, item, schema, state, listLocalId, itemLocalId) {
    if (listLocalId === void 0) { listLocalId = uuid.generate(); }
    if (itemLocalId === void 0) { itemLocalId = uuid.generate(); }
    var selection = state.selection;
    var $from = selection.$from, $to = selection.$to;
    if ($from.parent !== $to.parent) {
        // ignore selections across multiple nodes
        return null;
    }
    var _a = schema.nodes, paragraph = _a.paragraph, blockquote = _a.blockquote, decisionList = _a.decisionList, taskList = _a.taskList, mediaGroup = _a.mediaGroup;
    if ($from.parent.type === mediaGroup) {
        return null;
    }
    var emptyList = list.create({ localId: listLocalId }, [
        item.create({ localId: itemLocalId }),
    ]);
    // we don't take the content of a block node next to the gap cursor and always create an empty task
    if (selection instanceof GapCursorSelection) {
        return safeInsert(emptyList)(tr);
    }
    // try to replace any of the given nodeTypes
    if (isSupportedSourceNode(schema, selection)) {
        var newTr = replaceParentNodeOfType([blockquote, paragraph, decisionList, taskList], list.create({ localId: uuid.generate() }, [
            item.create({ localId: uuid.generate() }, $from.node($from.depth).content),
        ]))(tr);
        // Adjust depth for new selection, if it has changed (e.g. paragraph to list (ol > li))
        var depthAdjustment = changeInDepth($to, newTr.selection.$to);
        tr = tr.setSelection(new TextSelection(tr.doc.resolve($to.pos + depthAdjustment)));
        // replacing successful
        if (newTr !== tr) {
            return tr;
        }
    }
    return safeInsert(emptyList)(tr);
};
export var splitListAtSelection = function (tr, schema) {
    var selection = tr.selection;
    var $from = selection.$from, $to = selection.$to;
    if ($from.parent !== $to.parent) {
        // ignore selections across multiple nodes
        return tr;
    }
    var _a = schema.nodes, decisionItem = _a.decisionItem, decisionList = _a.decisionList, paragraph = _a.paragraph, taskItem = _a.taskItem, taskList = _a.taskList;
    var parentList = findParentNodeOfType([decisionList, taskList])(selection);
    if (!parentList) {
        return tr;
    }
    var item = findParentNodeOfType([decisionItem, taskItem])(selection);
    if (!item) {
        return tr;
    }
    var resolvedItemPos = tr.doc.resolve(item.pos);
    var newListIds = [
        parentList.node.attrs['localId'] || uuid.generate(),
        uuid.generate(),
    ];
    var beforeItems = [];
    var afterItems = [];
    parentList.node.content.forEach(function (item, offset, _index) {
        if (offset < resolvedItemPos.parentOffset) {
            beforeItems.push(item);
        }
        else if (offset > resolvedItemPos.parentOffset) {
            afterItems.push(item);
        }
    });
    var content = [];
    if (beforeItems.length) {
        content.push(parentList.node.type.createChecked({
            localId: newListIds.shift(),
        }, beforeItems));
    }
    content.push(paragraph.createChecked({}, item.node.content));
    if (afterItems.length) {
        content.push(parentList.node.type.createChecked({
            localId: newListIds.shift(),
        }, afterItems));
    }
    // If no list remains at start, then the new selection is different relative to the original selection.
    var posAdjust = beforeItems.length === 0 ? -1 : 1;
    tr = tr.replaceWith(resolvedItemPos.start() - 1, resolvedItemPos.end() + 1, content);
    tr = tr.setSelection(new TextSelection(tr.doc.resolve($from.pos + posAdjust)));
    return tr;
};
//# sourceMappingURL=commands.js.map