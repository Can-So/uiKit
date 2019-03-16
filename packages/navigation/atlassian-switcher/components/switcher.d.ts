import * as React from 'react';
import { Messages } from 'react-intl';
import { SwitcherItemType, RecentItemType } from '../utils/links';
import { TriggerXFlowCallback, FeatureFlagProps } from '../types';
declare type SwitcherProps = {
    messages: Messages;
    triggerXFlow: TriggerXFlowCallback;
    isLoading: boolean;
    licensedProductLinks: SwitcherItemType[];
    suggestedProductLinks: SwitcherItemType[];
    fixedLinks: SwitcherItemType[];
    adminLinks: SwitcherItemType[];
    recentLinks: RecentItemType[];
    customLinks: SwitcherItemType[];
    manageLink?: string;
} & FeatureFlagProps;
export default class Switcher extends React.Component<SwitcherProps> {
    mountedAt?: number;
    componentDidMount(): void;
    timeSinceMounted(): number;
    triggerXFlow: () => void;
    shouldComponentUpdate(nextProps: SwitcherProps): boolean;
    render(): JSX.Element;
}
export {};
