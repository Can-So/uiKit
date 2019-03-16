import * as React from 'react';
import { Color } from '@atlaskit/status';
import { StatusType } from '../plugin';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
export declare enum InputMethod {
    blur = "blur",
    escKey = "escKey",
    enterKey = "enterKey"
}
export interface Props {
    target: HTMLElement | null;
    closeStatusPicker: () => void;
    onSelect: (status: StatusType) => void;
    onTextChanged: (status: StatusType, isNew: boolean) => void;
    onEnter: (status: StatusType) => void;
    isNew?: boolean;
    defaultText?: string;
    defaultColor?: Color;
    defaultLocalId?: string;
    createAnalyticsEvent?: CreateUIAnalyticsEventSignature;
}
export interface State {
    color: Color;
    text: string;
    localId?: string;
    isNew?: boolean;
}
export declare class StatusPickerWithoutAnalytcs extends React.Component<Props, State> {
    private startTime;
    private inputMethod?;
    private createStatusAnalyticsAndFireFunc;
    static defaultProps: {
        autoFocus: boolean;
    };
    constructor(props: Props);
    private fireStatusPopupOpenedAnalytics;
    private fireStatusPopupClosedAnalytics;
    private reset;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, _snapshot?: any): void;
    private extractStateFromProps;
    handleClickOutside: (event: Event) => void;
    private handleEscapeKeydown;
    render(): JSX.Element | null;
    private onColorHover;
    private onColorClick;
    private onTextChanged;
    private onEnter;
    private handlePopupClick;
}
declare const _default: React.ComponentClass<Pick<Props, "onSelect" | "target" | "onEnter" | "onTextChanged" | "closeStatusPicker" | "isNew" | "defaultText" | "defaultColor" | "defaultLocalId">, any>;
export default _default;
