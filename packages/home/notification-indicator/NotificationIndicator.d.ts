import { Component } from 'react';
import { NotificationLogProvider } from '@atlaskit/notification-log-client';
export interface ValueUpdatingParams {
    source: string;
    visibilityChangesSinceTimer?: number;
}
export interface ValueUpdatingResult {
    skip?: boolean;
    countOverride?: number;
}
export interface ValueUpdatedParams {
    oldCount: number;
    newCount: number;
    source: string;
}
export interface Props {
    notificationLogProvider: Promise<NotificationLogProvider>;
    appearance?: string;
    max?: number;
    refreshRate?: number;
    refreshOnHidden?: boolean;
    refreshOnVisibilityChange?: boolean;
    onCountUpdating?: (param: ValueUpdatingParams) => ValueUpdatingResult;
    onCountUpdated?: (param: ValueUpdatedParams) => void;
    createAnalyticsEvent?: any;
}
export interface State {
    count: number | null;
}
declare class NotificationIndicator extends Component<Props, State> {
    private intervalId?;
    private visibilityChangesSinceTimer;
    private notificationLogProvider?;
    static defaultProps: Partial<Props>;
    state: State;
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: Props): void;
    componentWillUnmount(): void;
    private updateInterval;
    private onVisibilityChange;
    private shouldRefresh;
    private timerTick;
    private handleAnalytics;
    private refresh;
    render(): JSX.Element | null;
}
export default NotificationIndicator;
