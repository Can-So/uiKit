import { AnalyticsEventPayload, CreateAndFireEventFunction, CreateUIAnalyticsEventSignature } from '@findable/analytics-next-types';
import { EventType } from '@findable/analytics-gas-types';
import { ReactionSummary, ReactionSource } from '../types';
export declare type PreviousState = 'new' | 'existingNotReacted' | 'existingReacted';
export declare const createAndFireEventInElementsChannel: CreateAndFireEventFunction;
export declare const createAndFireSafe: <U extends any[], T extends (...args: U) => AnalyticsEventPayload>(createAnalyticsEvent: void | CreateUIAnalyticsEventSignature, creator: T, ...args: U) => void;
export declare const createReactionsRenderedEvent: (startTime: number) => {
    action: string;
    actionSubject: string;
    eventType: EventType;
    actionSubjectId: string | undefined;
    attributes: {
        packageName: any;
        packageVersion: any;
    };
};
export declare const createPickerButtonClickedEvent: (reactionEmojiCount: number) => {
    action: string;
    actionSubject: string;
    eventType: EventType;
    actionSubjectId: string | undefined;
    attributes: {
        packageName: any;
        packageVersion: any;
    };
};
export declare const createPickerCancelledEvent: (startTime?: number | undefined) => {
    action: string;
    actionSubject: string;
    eventType: EventType;
    actionSubjectId: string | undefined;
    attributes: {
        packageName: any;
        packageVersion: any;
    };
};
export declare const createPickerMoreClickedEvent: (startTime?: number | undefined) => {
    action: string;
    actionSubject: string;
    eventType: EventType;
    actionSubjectId: string | undefined;
    attributes: {
        packageName: any;
        packageVersion: any;
    };
};
export declare const createReactionSelectionEvent: (source: ReactionSource, emojiId: string, reaction?: ReactionSummary | undefined, startTime?: number | undefined) => {
    action: string;
    actionSubject: string;
    eventType: EventType;
    actionSubjectId: string | undefined;
    attributes: {
        packageName: any;
        packageVersion: any;
    };
};
export declare const createReactionHoveredEvent: (startTime?: number | undefined) => {
    action: string;
    actionSubject: string;
    eventType: EventType;
    actionSubjectId: string | undefined;
    attributes: {
        packageName: any;
        packageVersion: any;
    };
};
export declare const createReactionClickedEvent: (added: boolean, emojiId: string) => {
    action: string;
    actionSubject: string;
    eventType: EventType;
    actionSubjectId: string | undefined;
    attributes: {
        packageName: any;
        packageVersion: any;
    };
};
