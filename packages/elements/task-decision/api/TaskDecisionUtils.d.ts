import { Decision, DecisionResponse, Item, ItemResponse, Query, ServiceDecision, ServiceDecisionResponse, ServiceItem, ServiceItemResponse, ServiceTask, ServiceTaskResponse, Task, TaskResponse, ServiceTaskState, BaseItem, TaskState } from '../types';
export interface ResponseConverter<S, C> {
    (serviceDecisionResponse: S, query?: Query): C;
}
export declare const convertServiceDecisionToDecision: (serviceDecision: ServiceDecision) => Decision;
export declare const convertServiceDecisionResponseToDecisionResponse: (serviceDecisionResponse: ServiceDecisionResponse, query?: Query | undefined) => DecisionResponse;
export declare const convertServiceTaskToTask: (serviceTask: ServiceTask) => Task;
export declare const convertServiceTaskStateToBaseItem: (serviceTaskInfo: ServiceTaskState) => BaseItem<TaskState>;
export declare const convertServiceTaskResponseToTaskResponse: (serviceResponse: ServiceTaskResponse, query?: Query | undefined) => TaskResponse;
export declare const convertServiceItemToItem: (items: Item[], serviceItem: ServiceItem) => Item[];
export declare const convertServiceItemResponseToItemResponse: (serviceResponse: ServiceItemResponse, query?: Query | undefined) => ItemResponse;
export declare const decisionsToDocument: (decisions: Decision[]) => any;
export declare const tasksToDocument: (tasks: Task[]) => any;
export declare const findIndex: (array: any[], predicate: (item: any) => boolean) => number;
