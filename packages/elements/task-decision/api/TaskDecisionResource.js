import * as tslib_1 from "tslib";
import * as uuid from 'uuid';
import { utils } from '@findable/util-service-support';
import { PubSubSpecialEventType } from '../types';
import { defaultLimit } from '../constants';
import { convertServiceDecisionResponseToDecisionResponse, convertServiceItemResponseToItemResponse, convertServiceTaskResponseToTaskResponse, convertServiceTaskToTask, convertServiceTaskStateToBaseItem, findIndex, } from './TaskDecisionUtils';
import { objectKeyToString, toggleTaskState } from '../type-helpers';
export var ACTION_CREATED_FPS_EVENT = 'avi:task-decision-service:created:action';
export var ACTION_EDITED_FPS_EVENT = 'avi:task-decision-service:edited:action';
export var ACTION_DELETED_FPS_EVENT = 'avi:task-decision-service:deleted:action';
export var ACTION_ARCHIVED_FPS_EVENT = 'avi:task-decision-service:archived:action';
export var ACTION_STATE_CHANGED_FPS_EVENT = 'avi:task-decision-service:stateChanged:action';
export var DECISION_CREATED_FPS_EVENT = 'avi:task-decision-service:created:decision';
export var DECISION_EDITED_FPS_EVENT = 'avi:task-decision-service:edited:decision';
export var DECISION_DELETED_FPS_EVENT = 'avi:task-decision-service:deleted:decision';
export var DECISION_ARCHIVED_FPS_EVENT = 'avi:task-decision-service:archived:decision';
export var DECISION_STATE_CHANGED_FPS_EVENT = 'avi:task-decision-service:stateChanged:decision';
export var ACTION_DECISION_FPS_EVENTS = 'avi:task-decision-service:*:*';
var RecentUpdates = /** @class */ (function () {
    function RecentUpdates(pubSubClient) {
        var _this = this;
        this.idsByContainer = new Map();
        this.listenersById = new Map();
        this.onPubSubEvent = function (_event, payload) {
            var containerAri = payload.containerAri;
            _this.notify({ containerAri: containerAri });
        };
        this.pubSubClient = pubSubClient;
        this.subscribeToPubSubEvents();
    }
    RecentUpdates.prototype.subscribe = function (containerAri, recentUpdatesListener) {
        var id = uuid();
        var containerIds = this.idsByContainer.get(containerAri);
        if (!containerIds) {
            containerIds = [];
            this.idsByContainer.set(containerAri, containerIds);
        }
        containerIds.push(id);
        this.listenersById.set(id, {
            listener: recentUpdatesListener,
            containerAri: containerAri,
        });
        // Notify of id
        recentUpdatesListener.id(id);
    };
    RecentUpdates.prototype.unsubscribe = function (unsubscribeId) {
        var listenerDetail = this.listenersById.get(unsubscribeId);
        if (listenerDetail) {
            this.listenersById.delete(unsubscribeId);
            var containerAri = listenerDetail.containerAri;
            var idsToFilter = this.idsByContainer.get(containerAri);
            if (idsToFilter) {
                this.idsByContainer.set(containerAri, idsToFilter.filter(function (id) { return id !== unsubscribeId; }));
            }
        }
    };
    RecentUpdates.prototype.notify = function (recentUpdateContext) {
        var _this = this;
        var containerAri = recentUpdateContext.containerAri;
        var subscriberIds = this.idsByContainer.get(containerAri);
        if (subscriberIds) {
            subscriberIds.forEach(function (subscriberId) {
                var listenerDetail = _this.listenersById.get(subscriberId);
                if (listenerDetail) {
                    var listener = listenerDetail.listener;
                    listener.recentUpdates(recentUpdateContext);
                }
            });
        }
    };
    RecentUpdates.prototype.destroy = function () {
        this.unsubscribeFromPubSubEvents();
    };
    RecentUpdates.prototype.subscribeToPubSubEvents = function () {
        if (this.pubSubClient) {
            this.pubSubClient.on(ACTION_DECISION_FPS_EVENTS, this.onPubSubEvent);
        }
    };
    RecentUpdates.prototype.unsubscribeFromPubSubEvents = function () {
        if (this.pubSubClient) {
            this.pubSubClient.off(ACTION_DECISION_FPS_EVENTS, this.onPubSubEvent);
        }
    };
    return RecentUpdates;
}());
export { RecentUpdates };
var ItemStateManager = /** @class */ (function () {
    function ItemStateManager(serviceConfig) {
        var _this = this;
        this.debouncedTaskStateQuery = null;
        this.debouncedTaskToggle = new Map();
        this.subscribers = new Map();
        this.trackedObjectKeys = new Map();
        this.cachedItems = new Map();
        this.batchedKeys = new Map();
        this.onTaskUpdatedEvent = function (_event, payload) {
            var containerAri = payload.containerAri, objectAri = payload.objectAri, localId = payload.localId;
            var objectKey = { containerAri: containerAri, objectAri: objectAri, localId: localId };
            var key = objectKeyToString(objectKey);
            var cached = _this.cachedItems.get(key);
            if (!cached) {
                // ignore unknown task
                return;
            }
            var lastUpdateDate = new Date(payload.lastUpdateDate);
            if (lastUpdateDate > cached.lastUpdateDate) {
                _this.cachedItems.set(key, convertServiceTaskStateToBaseItem(payload));
                _this.notifyUpdated(objectKey, payload.state);
                return;
            }
        };
        this.onReconnect = function () {
            _this.refreshAllTasks();
        };
        this.serviceConfig = serviceConfig;
        this.subscribeToPubSubEvents();
    }
    ItemStateManager.prototype.destroy = function () {
        if (this.debouncedTaskStateQuery) {
            clearTimeout(this.debouncedTaskStateQuery);
        }
        this.debouncedTaskToggle.forEach(function (timeout) {
            clearTimeout(timeout);
        });
        this.unsubscribeFromPubSubEvents();
    };
    ItemStateManager.prototype.toggleTask = function (objectKey, state) {
        var _this = this;
        var stringKey = objectKeyToString(objectKey);
        var timeout = this.debouncedTaskToggle.get(stringKey);
        if (timeout) {
            clearTimeout(timeout);
            this.debouncedTaskToggle.delete(stringKey);
        }
        // Update cache optimistically
        this.cachedItems.set(stringKey, tslib_1.__assign({}, objectKey, { lastUpdateDate: new Date(), type: 'TASK', state: state }));
        // Optimistically notify subscribers that the task have been updated so that they can re-render accordingly
        this.notifyUpdated(objectKey, state);
        return new Promise(function (resolve, reject) {
            _this.debouncedTaskToggle.set(stringKey, window.setTimeout(function () {
                var options = {
                    path: 'tasks',
                    requestInit: {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json; charset=UTF-8',
                        },
                        body: JSON.stringify(tslib_1.__assign({}, objectKey, { state: state })),
                    },
                };
                utils
                    .requestService(_this.serviceConfig, options)
                    .then(convertServiceTaskToTask)
                    .then(function (task) {
                    var key = objectKeyToString(objectKey);
                    _this.cachedItems.set(key, task);
                    resolve(state);
                    // Notify subscribers that the task have been updated so that they can re-render accordingly
                    _this.notifyUpdated(objectKey, state);
                })
                    .catch(function () {
                    // Undo optimistic change
                    var previousState = toggleTaskState(state);
                    _this.cachedItems.set(stringKey, tslib_1.__assign({}, objectKey, { lastUpdateDate: new Date(), type: 'TASK', state: previousState }));
                    _this.notifyUpdated(objectKey, previousState);
                    reject();
                });
            }, 500));
        });
    };
    ItemStateManager.prototype.refreshAllTasks = function () {
        this.queueAllItems();
        this.scheduleGetTaskState();
    };
    ItemStateManager.prototype.subscribe = function (objectKey, handler) {
        var key = objectKeyToString(objectKey);
        var handlers = this.subscribers.get(key) || [];
        handlers.push(handler);
        this.subscribers.set(key, handlers);
        this.trackedObjectKeys.set(key, objectKey);
        var cached = this.cachedItems.get(key);
        if (cached) {
            this.notifyUpdated(objectKey, cached.state);
            return;
        }
        this.queueItem(objectKey);
        this.scheduleGetTaskState();
    };
    ItemStateManager.prototype.unsubscribe = function (objectKey, handler) {
        var key = objectKeyToString(objectKey);
        var handlers = this.subscribers.get(key);
        if (!handlers) {
            return;
        }
        var index = findIndex(handlers, function (h) { return h === handler; });
        if (index !== -1) {
            handlers.splice(index, 1);
        }
        if (handlers.length === 0) {
            this.subscribers.delete(key);
            this.trackedObjectKeys.delete(key);
        }
        else {
            this.subscribers.set(key, handlers);
        }
    };
    ItemStateManager.prototype.getTaskState = function (keys) {
        var options = {
            path: 'tasks/state',
            requestInit: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify({
                    taskKeys: keys,
                }),
            },
        };
        return utils.requestService(this.serviceConfig, options);
    };
    ItemStateManager.prototype.notifyUpdated = function (objectKey, state) {
        var key = objectKeyToString(objectKey);
        var handlers = this.subscribers.get(key);
        if (!handlers) {
            return;
        }
        handlers.forEach(function (handler) {
            handler(state);
        });
    };
    ItemStateManager.prototype.subscribeToPubSubEvents = function () {
        if (this.serviceConfig.pubSubClient) {
            this.serviceConfig.pubSubClient.on(ACTION_STATE_CHANGED_FPS_EVENT, this.onTaskUpdatedEvent);
            this.serviceConfig.pubSubClient.on(PubSubSpecialEventType.RECONNECT, this.onReconnect);
        }
    };
    ItemStateManager.prototype.unsubscribeFromPubSubEvents = function () {
        if (this.serviceConfig.pubSubClient) {
            this.serviceConfig.pubSubClient.off(ACTION_STATE_CHANGED_FPS_EVENT, this.onTaskUpdatedEvent);
            this.serviceConfig.pubSubClient.off(PubSubSpecialEventType.RECONNECT, this.onReconnect);
        }
    };
    ItemStateManager.prototype.queueAllItems = function () {
        this.batchedKeys = new Map(this.trackedObjectKeys);
    };
    ItemStateManager.prototype.queueItem = function (objectKey) {
        var key = objectKeyToString(objectKey);
        if (this.batchedKeys.get(key)) {
            return;
        }
        this.batchedKeys.set(key, objectKey);
    };
    ItemStateManager.prototype.dequeueItem = function (objectKey) {
        var key = objectKeyToString(objectKey);
        this.batchedKeys.delete(key);
    };
    ItemStateManager.prototype.scheduleGetTaskState = function () {
        var _this = this;
        if (this.debouncedTaskStateQuery) {
            clearTimeout(this.debouncedTaskStateQuery);
        }
        this.debouncedTaskStateQuery = window.setTimeout(function () {
            _this.getTaskState(Array.from(_this.batchedKeys.values())).then(function (tasks) {
                tasks.forEach(function (task) {
                    var containerAri = task.containerAri, objectAri = task.objectAri, localId = task.localId;
                    var objectKey = { containerAri: containerAri, objectAri: objectAri, localId: localId };
                    _this.cachedItems.set(objectKeyToString(objectKey), convertServiceTaskStateToBaseItem(task));
                    _this.dequeueItem(objectKey);
                    _this.notifyUpdated(objectKey, task.state);
                });
            });
        }, 1);
    };
    return ItemStateManager;
}());
export { ItemStateManager };
var TaskDecisionResource = /** @class */ (function () {
    function TaskDecisionResource(serviceConfig) {
        this.serviceConfig = serviceConfig;
        this.recentUpdates = new RecentUpdates(serviceConfig.pubSubClient);
        this.itemStateManager = new ItemStateManager(serviceConfig);
    }
    TaskDecisionResource.prototype.getDecisions = function (query, recentUpdatesListener) {
        return this.query(query, 'decisions/query', convertServiceDecisionResponseToDecisionResponse, recentUpdatesListener);
    };
    TaskDecisionResource.prototype.getTasks = function (query, recentUpdatesListener) {
        return this.query(query, 'tasks/query', convertServiceTaskResponseToTaskResponse, recentUpdatesListener);
    };
    TaskDecisionResource.prototype.getItems = function (query, recentUpdatesListener) {
        return this.query(query, 'elements/query', convertServiceItemResponseToItemResponse, recentUpdatesListener);
    };
    TaskDecisionResource.prototype.unsubscribeRecentUpdates = function (id) {
        this.recentUpdates.unsubscribe(id);
    };
    TaskDecisionResource.prototype.notifyRecentUpdates = function (recentUpdateContext) {
        this.recentUpdates.notify(recentUpdateContext);
        this.itemStateManager.refreshAllTasks();
    };
    TaskDecisionResource.prototype.query = function (query, path, converter, recentUpdatesListener) {
        var options = {
            path: path,
            requestInit: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(this.apiQueryToServiceQuery(query)),
            },
        };
        if (recentUpdatesListener) {
            this.recentUpdates.subscribe(query.containerAri, recentUpdatesListener);
        }
        return utils
            .requestService(this.serviceConfig, options)
            .then(function (serviceResponse) {
            return converter(serviceResponse, query);
        });
    };
    TaskDecisionResource.prototype.apiQueryToServiceQuery = function (query) {
        var sortCriteria = query.sortCriteria, limit = query.limit, other = tslib_1.__rest(query, ["sortCriteria", "limit"]);
        var serviceQuery = tslib_1.__assign({}, other, { limit: limit || defaultLimit });
        switch (sortCriteria) {
            case 'lastUpdateDate':
                serviceQuery.sortCriteria = 'LAST_UPDATE_DATE';
                break;
            case 'creationDate':
            default:
                serviceQuery.sortCriteria = 'CREATION_DATE';
                break;
        }
        return serviceQuery;
    };
    TaskDecisionResource.prototype.toggleTask = function (objectKey, state) {
        return this.itemStateManager.toggleTask(objectKey, state);
    };
    TaskDecisionResource.prototype.subscribe = function (objectKey, handler) {
        this.itemStateManager.subscribe(objectKey, handler);
    };
    TaskDecisionResource.prototype.unsubscribe = function (objectKey, handler) {
        this.itemStateManager.unsubscribe(objectKey, handler);
    };
    /**
     * Usually only needed for testing to ensure no outstanding requests
     * are sent to a server (typically mocked).
     */
    TaskDecisionResource.prototype.destroy = function () {
        this.recentUpdates.destroy();
        this.itemStateManager.destroy();
    };
    TaskDecisionResource.prototype.getCurrentUser = function () {
        return this.serviceConfig.currentUser;
    };
    return TaskDecisionResource;
}());
export default TaskDecisionResource;
//# sourceMappingURL=TaskDecisionResource.js.map