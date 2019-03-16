import * as React from 'react';
import { PureComponent } from 'react';
import { Appearance, ContentRef, User } from '../types';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
export interface Props {
    taskId: string;
    isDone?: boolean;
    onChange?: (taskId: string, isChecked: boolean) => void;
    contentRef?: ContentRef;
    children?: any;
    placeholder?: string;
    showPlaceholder?: boolean;
    appearance?: Appearance;
    participants?: User[];
    showParticipants?: boolean;
    creator?: User;
    lastUpdater?: User;
    disabled?: boolean;
}
export declare class TaskItem extends PureComponent<Props & WithAnalyticsEventProps, {}> {
    static defaultProps: Partial<Props>;
    private checkBoxId;
    constructor(props: Props & WithAnalyticsEventProps);
    componentWillReceiveProps(nextProps: Props): void;
    handleOnChange: (_evt: React.SyntheticEvent<HTMLInputElement>) => void;
    getAttributionText(): string | undefined;
    render(): JSX.Element;
}
declare const _default: any;
export default _default;
