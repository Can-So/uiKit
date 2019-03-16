import * as React from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next-types';
declare type ManageButtonProps = {
    href: string;
};
export default class ManageButton extends React.Component<ManageButtonProps> {
    onClick: (_: any, analyticsEvent: UIAnalyticsEvent) => void;
    render(): JSX.Element;
}
export {};
