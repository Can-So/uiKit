import * as React from 'react';
import { Component } from 'react';
import { CardEventHandler } from '@findable/media-card';
import { Context } from '@findable/media-core';
import { InjectedIntlProps } from 'react-intl';
import { Browser } from '../../../../components/types';
import { FileReference, LocalUploads, Recents, SelectedItem, ServiceFile, ServiceName } from '../../../domain';
export interface UploadViewOwnProps {
    readonly mpBrowser: Browser;
    readonly context: Context;
    readonly recentsCollection: string;
}
export interface UploadViewStateProps {
    readonly isLoading: boolean;
    readonly recents: Recents;
    readonly uploads: LocalUploads;
    readonly selectedItems: SelectedItem[];
}
export interface UploadViewDispatchProps {
    readonly onFileClick: (serviceFile: ServiceFile, serviceName: ServiceName) => void;
    readonly onEditorShowImage: (file: FileReference, dataUri: string) => void;
    readonly onEditRemoteImage: (file: FileReference, collectionName: string) => void;
    readonly setUpfrontIdDeferred: (id: string, resolver: (id: string) => void, rejecter: Function) => void;
    readonly removeFileFromRecents: (id: string, occurrenceKey?: string, userFileId?: string) => void;
}
export declare type UploadViewProps = UploadViewOwnProps & UploadViewStateProps & UploadViewDispatchProps & InjectedIntlProps;
export interface UploadViewState {
    readonly hasPopupBeenVisible: boolean;
    readonly isWebGLWarningFlagVisible: boolean;
    readonly shouldDismissWebGLWarningFlag: boolean;
    readonly isLoadingNextPage: boolean;
    readonly deletionCandidate?: {
        id: string;
        occurrenceKey: string;
        userFileId?: string;
    };
}
export declare class StatelessUploadView extends Component<UploadViewProps, UploadViewState> {
    state: UploadViewState;
    render(): JSX.Element;
    private renderDeleteConfirmation;
    private onThresholdReachedListener;
    private renderLoadingView;
    private renderLoadingNextPageView;
    private renderRecentsView;
    onAnnotateActionClick(callback: CardEventHandler): CardEventHandler;
    private renderWebGLWarningFlag;
    private renderCards;
    private uploadingFilesCards;
    private recentFilesCards;
    private showWebGLWarningFlag;
    private onFlagDismissed;
    private onLearnMoreClicked;
}
declare const _default: React.ComponentClass<Pick<UploadViewOwnProps & UploadViewStateProps & UploadViewDispatchProps, never> & UploadViewOwnProps, any> & {
    WrappedComponent: React.ComponentType<UploadViewOwnProps & UploadViewStateProps & UploadViewDispatchProps>;
};
export default _default;
