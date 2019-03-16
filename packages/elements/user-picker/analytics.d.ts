import { AnalyticsEventPayload, CreateAndFireEventFunction } from '@atlaskit/analytics-next-types';
import { UserPickerProps, UserPickerState } from './types';
export declare type UserPickerSession = {
    id: string;
    start: number;
    inputChangeTime: number;
    upCount: number;
    downCount: number;
    lastKey?: number;
};
export declare const startSession: () => UserPickerSession;
export declare const createAndFireEventInElementsChannel: CreateAndFireEventFunction;
export interface EventCreator {
    (props: UserPickerProps, state: UserPickerState, session?: UserPickerSession): AnalyticsEventPayload;
    (props: UserPickerProps, state: UserPickerState, session?: UserPickerSession, ...args: any[]): AnalyticsEventPayload;
}
export declare const focusEvent: EventCreator;
export declare const clearEvent: EventCreator;
export declare const deleteEvent: EventCreator;
export declare const cancelEvent: EventCreator;
export declare const selectEvent: EventCreator;
export declare const searchedEvent: EventCreator;
export declare const failedEvent: EventCreator;
