import { ButtonAppearances } from '@atlaskit/button';
import { LoadOptions } from '@atlaskit/user-picker';
import * as React from 'react';
import { ConfigResponse, DialogContentState, ShareButtonStyle } from '../types';
declare type RenderChildren = (args: {
    onClick: () => void;
    loading: boolean;
    error?: ShareError;
}) => React.ReactNode;
declare type DialogState = {
    isDialogOpen: boolean;
    isSharing: boolean;
    shareError?: ShareError;
    ignoreIntermediateState: boolean;
    defaultValue: DialogContentState;
};
export declare type State = DialogState;
declare type ShareError = {
    message: string;
};
export declare type Props = {
    buttonStyle?: ShareButtonStyle;
    config?: ConfigResponse;
    children?: RenderChildren;
    copyLink: string;
    isDisabled?: boolean;
    loadUserOptions?: LoadOptions;
    onLinkCopy?: Function;
    onShareSubmit?: (shareContentState: DialogContentState) => Promise<any>;
    shareFormTitle?: React.ReactNode;
    shouldCloseOnEscapePress?: boolean;
    triggerButtonAppearance?: ButtonAppearances;
    triggerButtonStyle?: ShareButtonStyle;
};
export declare const defaultShareContentState: DialogContentState;
export declare class ShareDialogWithTrigger extends React.Component<Props, State> {
    static defaultProps: {
        isDisabled: boolean;
        shouldCloseOnEscapePress: boolean;
        triggerButtonAppearance: string;
        triggerButtonStyle: "icon-only";
    };
    private containerRef;
    escapeIsHeldDown: boolean;
    state: State;
    private handleKeyDown;
    private onTriggerClick;
    private handleCloseDialog;
    private handleShareSubmit;
    private handleFormDismiss;
    handleShareFailure: (_err: Error) => void;
    render(): JSX.Element;
}
export {};
