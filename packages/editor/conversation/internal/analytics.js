import * as tslib_1 from "tslib";
export var ANALYTICS_CHANNEL = 'editor';
export var trackEventActions;
(function (trackEventActions) {
    trackEventActions["created"] = "created";
    trackEventActions["updated"] = "updated";
    trackEventActions["deleted"] = "deleted";
})(trackEventActions || (trackEventActions = {}));
export var actionSubjectIds;
(function (actionSubjectIds) {
    actionSubjectIds["createCommentButton"] = "createCommentButton";
    actionSubjectIds["createCommentInput"] = "createCommentInput";
    actionSubjectIds["editButton"] = "editButton";
    actionSubjectIds["cancelFailedRequestButton"] = "cancelFailedRequestButton";
    actionSubjectIds["retryFailedRequestButton"] = "retryFailedRequestButton";
    actionSubjectIds["deleteButton"] = "deleteButton";
    actionSubjectIds["saveButton"] = "saveButton";
    actionSubjectIds["cancelButton"] = "cancelButton";
    actionSubjectIds["replyButton"] = "replyButton";
})(actionSubjectIds || (actionSubjectIds = {}));
export var eventTypes;
(function (eventTypes) {
    eventTypes["UI"] = "ui";
    eventTypes["TRACK"] = "track";
})(eventTypes || (eventTypes = {}));
export function fireEvent(analyticsEvent, eventData) {
    analyticsEvent.update(tslib_1.__assign({}, eventData, { eventType: eventData.eventType || eventTypes.UI, attributes: tslib_1.__assign({}, analyticsEvent.attributes, eventData.attributes) }));
    analyticsEvent.fire(ANALYTICS_CHANNEL);
}
//# sourceMappingURL=analytics.js.map