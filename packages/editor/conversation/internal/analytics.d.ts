export declare const ANALYTICS_CHANNEL = "editor";
export declare type createAnalyticsEvent = (event: object) => AnalyticsEvent;
export declare enum trackEventActions {
    created = "created",
    updated = "updated",
    deleted = "deleted"
}
export declare enum actionSubjectIds {
    createCommentButton = "createCommentButton",
    createCommentInput = "createCommentInput",
    editButton = "editButton",
    cancelFailedRequestButton = "cancelFailedRequestButton",
    retryFailedRequestButton = "retryFailedRequestButton",
    deleteButton = "deleteButton",
    saveButton = "saveButton",
    cancelButton = "cancelButton",
    replyButton = "replyButton"
}
export declare enum eventTypes {
    UI = "ui",
    TRACK = "track"
}
export interface AnalyticsEvent {
    update: (attributes: object) => void;
    fire: (channel: string) => void;
    attributes: object;
}
export declare type EventAttributes = {
    nestedDepth?: number;
};
export declare type EventData = {
    actionSubjectId?: string;
    objectId?: string;
    containerId?: string;
    nestedDepth?: number;
    eventType?: eventTypes;
    action?: string;
    actionSubject?: string;
    attributes?: EventAttributes;
};
export declare function fireEvent(analyticsEvent: AnalyticsEvent, eventData: EventData): void;
