export const ANALYTICS_CHANNEL = 'editor';

export type createAnalyticsEvent = (event: object) => AnalyticsEvent;

export enum trackEventActions {
  created = 'created',
  updated = 'updated',
  deleted = 'deleted',
}

export enum actionSubjectIds {
  createCommentButton = 'createCommentButton',
  createCommentInput = 'createCommentInput',
  editButton = 'editButton',
  cancelFailedRequestButton = 'cancelFailedRequestButton',
  retryFailedRequestButton = 'retryFailedRequestButton',
  deleteButton = 'deleteButton',
  saveButton = 'saveButton',
  cancelButton = 'cancelButton',
  replyButton = 'replyButton',
}

export enum eventTypes {
  UI = 'ui',
  TRACK = 'track',
}

export interface AnalyticsEvent {
  update: (attributes: object) => void;
  fire: (channel: string) => void;
  attributes: object;
}

export type EventAttributes = {
  nestedDepth?: number;
};

export type EventData = {
  actionSubjectId?: string;
  containerId?: string;
  nestedDepth?: number;
  eventType?: eventTypes;
  action?: string;
  actionSubject?: string;
  attributes?: EventAttributes;
};

export function fireEvent(
  analyticsEvent: AnalyticsEvent,
  eventData: EventData,
) {
  analyticsEvent.update({
    ...eventData,
    eventType: eventData.eventType || eventTypes.UI,
    attributes: {
      ...analyticsEvent.attributes,
      ...eventData.attributes,
    },
  });
  analyticsEvent.fire(ANALYTICS_CHANNEL);
}
