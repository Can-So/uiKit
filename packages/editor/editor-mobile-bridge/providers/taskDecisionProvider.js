export var objectKeyToString = function (objectKey) {
    var containerAri = objectKey.containerAri, objectAri = objectKey.objectAri, localId = objectKey.localId;
    return containerAri + ":" + objectAri + ":" + localId;
};
var TaskDecisionProviderImpl = /** @class */ (function () {
    function TaskDecisionProviderImpl(toggleTask) {
        this._handleToggleTask = toggleTask;
        this._handlers = new Map();
    }
    TaskDecisionProviderImpl.prototype.getDecisions = function (query) {
        return Promise.resolve({ decisions: [] });
    };
    TaskDecisionProviderImpl.prototype.getTasks = function (query) {
        return Promise.resolve({ tasks: [] });
    };
    TaskDecisionProviderImpl.prototype.getItems = function (query) {
        return Promise.resolve({ items: [] });
    };
    TaskDecisionProviderImpl.prototype.unsubscribeRecentUpdates = function (id) { };
    TaskDecisionProviderImpl.prototype.notifyRecentUpdates = function (updateContext) { };
    TaskDecisionProviderImpl.prototype.toggleTask = function (key, state) {
        if (this._handleToggleTask) {
            this._handleToggleTask(key, state);
        }
        // Optimistically notify subscribers that the task have been updated so that they can re-render accordingly
        this.notifyUpdated(key, state);
        return Promise.resolve(state);
    };
    TaskDecisionProviderImpl.prototype.subscribe = function (key, handler) {
        this._handlers.set(objectKeyToString(key), handler);
    };
    TaskDecisionProviderImpl.prototype.unsubscribe = function (key, handler) {
        this._handlers.delete(objectKeyToString(key));
    };
    TaskDecisionProviderImpl.prototype.notifyUpdated = function (objectKey, state) {
        if (!this._handlers.has(objectKeyToString(objectKey))) {
            return;
        }
        var handler = this._handlers.get(objectKeyToString(objectKey));
        handler(state);
    };
    return TaskDecisionProviderImpl;
}());
export { TaskDecisionProviderImpl };
export default (function (handleToggleTask) {
    return new TaskDecisionProviderImpl(handleToggleTask);
});
//# sourceMappingURL=taskDecisionProvider.js.map