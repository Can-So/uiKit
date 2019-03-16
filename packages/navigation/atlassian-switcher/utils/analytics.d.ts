import * as React from 'react';
import { NavigationAnalyticsContext } from '@atlaskit/analytics-namespaced-context';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { UI_EVENT_TYPE, OPERATIONAL_EVENT_TYPE } from '@atlaskit/analytics-gas-types';
declare type PropsToContextMapper<P, C> = (props: P) => C;
export declare const NAVIGATION_CHANNEL = "navigation";
export declare const SWITCHER_SUBJECT = "atlassianSwitcher";
export declare const SWITCHER_ITEM_SUBJECT = "atlassianSwitcherItem";
export declare const createAndFireNavigationEvent: import("@atlaskit/analytics-next-types").CreateAndFireEventFunction;
export declare const analyticsAttributes: <T extends object>(attributes: T) => {
    attributes: T;
};
export declare const withAnalyticsContextData: <P, C>(mapPropsToContext: PropsToContextMapper<P, C>) => (WrappedComponent: React.ComponentType<P>) => React.ComponentType<P>;
declare type RenderTrackerProps = {
    subject: string;
    data?: object;
    onRender?: any;
};
export declare const RenderTracker: React.ComponentClass<Pick<RenderTrackerProps, "subject" | "data" | "onRender">, any>;
export { withAnalyticsEvents, NavigationAnalyticsContext, OPERATIONAL_EVENT_TYPE, UI_EVENT_TYPE, };
