import * as React from 'react';
import { MentionEventHandler } from '../../types';
import { FireAnalyticsEvent } from '@atlaskit/analytics';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
export declare const ANALYTICS_HOVER_DELAY = 1000;
export declare type OwnProps = {
    id: string;
    text: string;
    isHighlighted?: boolean;
    accessLevel?: string;
    onClick?: MentionEventHandler;
    onMouseEnter?: MentionEventHandler;
    onMouseLeave?: MentionEventHandler;
    onHover?: () => void;
};
export declare type OldAnalytics = {
    fireAnalyticsEvent?: FireAnalyticsEvent;
    firePrivateAnalyticsEvent?: FireAnalyticsEvent;
};
export declare type Props = OwnProps & OldAnalytics & WithAnalyticsEventProps;
export declare class MentionInternal extends React.PureComponent<Props, {}> {
    private hoverTimeout?;
    private handleOnClick;
    private handleOnMouseEnter;
    private handleOnMouseLeave;
    private getMentionType;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
declare const Mention: React.ComponentClass<OwnProps, any>;
declare type Mention = MentionInternal;
export default Mention;
