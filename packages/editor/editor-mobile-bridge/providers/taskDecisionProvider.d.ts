import { TaskDecisionProvider, Query, DecisionResponse, TaskResponse, ItemResponse, RecentUpdatesId, RecentUpdateContext, ObjectKey, TaskState, Handler } from '@atlaskit/task-decision';
declare type ToggleTaskCallback = (key: ObjectKey, state: TaskState) => void;
export declare const objectKeyToString: (objectKey: ObjectKey) => string;
export declare class TaskDecisionProviderImpl implements TaskDecisionProvider {
    _handleToggleTask: ToggleTaskCallback | undefined;
    _handlers: Map<string, Handler>;
    constructor(toggleTask?: ToggleTaskCallback);
    getDecisions(query: Query): Promise<DecisionResponse>;
    getTasks(query: Query): Promise<TaskResponse>;
    getItems(query: Query): Promise<ItemResponse>;
    unsubscribeRecentUpdates(id: RecentUpdatesId): void;
    notifyRecentUpdates(updateContext?: RecentUpdateContext): void;
    toggleTask(key: ObjectKey, state: TaskState): Promise<TaskState>;
    subscribe(key: ObjectKey, handler: Handler): void;
    unsubscribe(key: ObjectKey, handler: Handler): void;
    notifyUpdated(objectKey: ObjectKey, state: TaskState): void;
}
declare const _default: (handleToggleTask?: ToggleTaskCallback | undefined) => TaskDecisionProviderImpl;
export default _default;
