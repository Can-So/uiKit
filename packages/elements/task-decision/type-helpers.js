export var isDecision = function (item) {
    return !!(item && item.type === 'DECISION');
};
export var isTask = function (item) {
    return !!(item && item.type === 'TASK');
};
export var isServiceDecision = function (item) {
    return !!(item && item.type === 'DECISION');
};
export var isServiceTask = function (item) {
    return !!(item && item.type === 'TASK');
};
export var isDateSortCriteria = function (sortCriteria) {
    return !sortCriteria ||
        sortCriteria === 'creationDate' ||
        sortCriteria === 'lastUpdateDate';
};
export var toObjectKey = function (item) {
    var containerAri = item.containerAri, localId = item.localId, objectAri = item.objectAri;
    return {
        containerAri: containerAri,
        localId: localId,
        objectAri: objectAri,
    };
};
export var toRendererContext = function (item) {
    var containerAri = item.containerAri, objectAri = item.objectAri;
    return {
        containerAri: containerAri,
        objectAri: objectAri,
    };
};
export var objectKeyToString = function (objectKey) {
    var containerAri = objectKey.containerAri, objectAri = objectKey.objectAri, localId = objectKey.localId;
    return containerAri + ":" + objectAri + ":" + localId;
};
export var toggleTaskState = function (state) {
    return state === 'DONE' ? 'TODO' : 'DONE';
};
//# sourceMappingURL=type-helpers.js.map