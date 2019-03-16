import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
import * as React from 'react';
export declare type Event = {
    channel?: string;
    event: UIAnalyticsEventInterface;
};
export declare class EventViewer extends React.PureComponent<Event, {
    showMore: boolean;
}> {
    constructor(props: Event);
    private handleMoreClick;
    render(): JSX.Element;
}
