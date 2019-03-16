import * as tslib_1 from "tslib";
import { isServiceDecision, isServiceTask } from '../type-helpers';
export var convertServiceDecisionToDecision = function (serviceDecision) {
    var creationDate = serviceDecision.creationDate, lastUpdateDate = serviceDecision.lastUpdateDate, rawContent = serviceDecision.rawContent, contentAsFabricDocument = serviceDecision.contentAsFabricDocument, other = tslib_1.__rest(serviceDecision, ["creationDate", "lastUpdateDate", "rawContent", "contentAsFabricDocument"]);
    return tslib_1.__assign({ creationDate: new Date(creationDate), lastUpdateDate: new Date(lastUpdateDate), content: JSON.parse(contentAsFabricDocument) }, other);
};
export var convertServiceDecisionResponseToDecisionResponse = function (serviceDecisionResponse, query) {
    var decisions = serviceDecisionResponse.decisions.map(convertServiceDecisionToDecision);
    var nextQuery;
    if (query &&
        serviceDecisionResponse.meta &&
        serviceDecisionResponse.meta.cursor) {
        nextQuery = tslib_1.__assign({}, query, { cursor: serviceDecisionResponse.meta.cursor });
    }
    return {
        decisions: decisions,
        nextQuery: nextQuery,
    };
};
export var convertServiceTaskToTask = function (serviceTask) {
    var creationDate = serviceTask.creationDate, lastUpdateDate = serviceTask.lastUpdateDate, rawContent = serviceTask.rawContent, contentAsFabricDocument = serviceTask.contentAsFabricDocument, other = tslib_1.__rest(serviceTask, ["creationDate", "lastUpdateDate", "rawContent", "contentAsFabricDocument"]);
    return tslib_1.__assign({ creationDate: new Date(creationDate), lastUpdateDate: new Date(lastUpdateDate), content: JSON.parse(contentAsFabricDocument) }, other);
};
export var convertServiceTaskStateToBaseItem = function (serviceTaskInfo) {
    var lastUpdateDate = serviceTaskInfo.lastUpdateDate, other = tslib_1.__rest(serviceTaskInfo, ["lastUpdateDate"]);
    return tslib_1.__assign({ type: 'TASK', lastUpdateDate: new Date(lastUpdateDate) }, other);
};
export var convertServiceTaskResponseToTaskResponse = function (serviceResponse, query) {
    var tasks = serviceResponse.tasks.map(convertServiceTaskToTask);
    var nextQuery;
    if (query && serviceResponse.meta && serviceResponse.meta.cursor) {
        nextQuery = tslib_1.__assign({}, query, { cursor: serviceResponse.meta.cursor });
    }
    return {
        tasks: tasks,
        nextQuery: nextQuery,
    };
};
export var convertServiceItemToItem = function (items, serviceItem) {
    if (isServiceDecision(serviceItem)) {
        items.push(convertServiceDecisionToDecision(serviceItem));
    }
    else if (isServiceTask(serviceItem)) {
        items.push(convertServiceTaskToTask(serviceItem));
    }
    return items;
};
export var convertServiceItemResponseToItemResponse = function (serviceResponse, query) {
    var items = serviceResponse.elements.reduce(convertServiceItemToItem, []);
    var nextQuery;
    if (query && serviceResponse.meta && serviceResponse.meta.cursor) {
        nextQuery = tslib_1.__assign({}, query, { cursor: serviceResponse.meta.cursor });
    }
    return {
        items: items,
        nextQuery: nextQuery,
    };
};
export var decisionsToDocument = function (decisions) { return ({
    type: 'doc',
    version: 1,
    content: [
        {
            type: 'decisionList',
            content: decisions.map(function (decision) {
                var content = decision.content, localId = decision.localId, state = decision.state;
                return {
                    type: 'decisionItem',
                    attrs: {
                        localId: localId,
                        state: state,
                    },
                    content: content,
                };
            }),
        },
    ],
}); };
export var tasksToDocument = function (tasks) { return ({
    type: 'doc',
    version: 1,
    content: [
        {
            type: 'taskList',
            content: tasks.map(function (task) {
                var content = task.content, localId = task.localId, state = task.state;
                return {
                    type: 'taskItem',
                    attrs: {
                        localId: localId,
                        state: state,
                    },
                    content: content,
                };
            }),
        },
    ],
}); };
export var findIndex = function (array, predicate) {
    var index = -1;
    array.some(function (item, i) {
        if (predicate(item)) {
            index = i;
            return true;
        }
        return false;
    });
    return index;
};
//# sourceMappingURL=TaskDecisionUtils.js.map