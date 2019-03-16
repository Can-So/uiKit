import { LoadOptions, OptionData } from '@findable/user-picker';
import * as React from 'react';
import { Comment, ConfigResponse, DialogContentState, FormChildrenArgs } from '../types';
declare type ShareError = {
    message: string;
} | null;
export declare type ShareData = {
    users: OptionData[];
    comment: Comment;
};
export declare type Props = {
    capabilitiesInfoMessage?: React.ReactNode;
    config?: ConfigResponse;
    copyLink: string;
    isSharing?: boolean;
    loadOptions?: LoadOptions;
    onLinkCopy?: (link: string) => void;
    onShareClick?: (data: ShareData) => void;
    shareError?: ShareError;
    submitButtonLabel?: React.ReactNode;
    title?: React.ReactNode;
    onDismiss?: (data: ShareData) => void;
    defaultValue?: DialogContentState;
};
export declare type InternalFormProps = FormChildrenArgs<ShareData> & Props;
export declare const ShareForm: React.StatelessComponent<Props>;
export {};
