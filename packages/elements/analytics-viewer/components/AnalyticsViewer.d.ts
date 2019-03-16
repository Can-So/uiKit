/// <reference types="react" />
import { Event } from './EventViewer';
export declare type EventsArray = Event[];
declare type Props = {
    events: EventsArray;
    className?: string;
};
export declare const AnalyticsViewer: ({ events, className }: Props) => JSX.Element;
export {};
