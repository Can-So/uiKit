import { PubSubClient } from '../types';
import { ServiceTaskState, DecisionResponse, DecisionState, Handler, ItemResponse, ObjectKey, Query, RecentUpdateContext, RecentUpdatesId, RecentUpdatesListener, ServiceTask, TaskDecisionProvider, TaskDecisionResourceConfig, TaskResponse, TaskState, User, ServiceItem } from '../types';
export declare const ACTION_CREATED_FPS_EVENT = "avi:task-decision-service:created:action";
export declare const ACTION_EDITED_FPS_EVENT = "avi:task-decision-service:edited:action";
export declare const ACTION_DELETED_FPS_EVENT = "avi:task-decision-service:deleted:action";
export declare const ACTION_ARCHIVED_FPS_EVENT = "avi:task-decision-service:archived:action";
export declare const ACTION_STATE_CHANGED_FPS_EVENT = "avi:task-decision-service:stateChanged:action";
export declare const DECISION_CREATED_FPS_EVENT = "avi:task-decision-service:created:decision";
export declare const DECISION_EDITED_FPS_EVENT = "avi:task-decision-service:edited:decision";
export declare const DECISION_DELETED_FPS_EVENT = "avi:task-decision-service:deleted:decision";
export declare const DECISION_ARCHIVED_FPS_EVENT = "avi:task-decision-service:archived:decision";
export declare const DECISION_STATE_CHANGED_FPS_EVENT = "avi:task-decision-service:stateChanged:decision";
export declare const ACTION_DECISION_FPS_EVENTS = "avi:task-decision-service:*:*";
export declare class RecentUpdates {
    private idsByContainer;
    private listenersById;
    private pubSubClient?;
    constructor(pubSubClient?: PubSubClient);
    subscribe(containerAri: string, recentUpdatesListener: RecentUpdatesListener): void;
    unsubscribe(unsubscribeId: RecentUpdatesId): void;
    notify(recentUpdateContext: RecentUpdateContext): void;
    onPubSubEvent: (_event: string, payload: ServiceItem) => void;
    destroy(): void;
    private subscribeToPubSubEvents;
    private unsubscribeFromPubSubEvents;
}
export declare class ItemStateManager {
    private debouncedTaskStateQuery;
    private debouncedTaskToggle;
    private serviceConfig;
    private subscribers;
    private trackedObjectKeys;
    private cachedItems;
    private batchedKeys;
    constructor(serviceConfig: TaskDecisionResourceConfig);
    destroy(): void;
    toggleTask(objectKey: ObjectKey, state: TaskState): Promise<TaskState>;
    refreshAllTasks(): void;
    subscribe(objectKey: ObjectKey, handler: Handler): void;
    unsubscribe(objectKey: ObjectKey, handler: Handler): void;
    getTaskState(keys: ObjectKey[]): Promise<ServiceTaskState[]>;
    notifyUpdated(objectKey: ObjectKey, state: TaskState | DecisionState): void;
    onTaskUpdatedEvent: (_event: string, payload: ServiceTask) => void;
    onReconnect: () => void;
    private subscribeToPubSubEvents;
    private unsubscribeFromPubSubEvents;
    private queueAllItems;
    private queueItem;
    private dequeueItem;
    private scheduleGetTaskState;
}
export default class TaskDecisionResource implements TaskDecisionProvider {
    private serviceConfig;
    private recentUpdates;
    private itemStateManager;
    constructor(serviceConfig: TaskDecisionResourceConfig);
    getDecisions(query: Query, recentUpdatesListener?: RecentUpdatesListener): Promise<DecisionResponse>;
    getTasks(query: Query, recentUpdatesListener?: RecentUpdatesListener): Promise<TaskResponse>;
    getItems(query: Query, recentUpdatesListener?: RecentUpdatesListener): Promise<ItemResponse>;
    unsubscribeRecentUpdates(id: RecentUpdatesId): void;
    notifyRecentUpdates(recentUpdateContext: RecentUpdateContext): void;
    private query;
    private apiQueryToServiceQuery;
    toggleTask(objectKey: ObjectKey, state: TaskState): Promise<TaskState>;
    subscribe(objectKey: ObjectKey, handler: Handler): void;
    unsubscribe(objectKey: ObjectKey, handler: Handler): void;
    /**
     * Usually only needed for testing to ensure no outstanding requests
     * are sent to a server (typically mocked).
     */
    destroy(): void;
    getCurrentUser(): User | undefined;
}
