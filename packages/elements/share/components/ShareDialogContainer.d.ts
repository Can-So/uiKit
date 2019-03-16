import { ButtonAppearances } from '@atlaskit/button';
import { LoadOptions } from '@atlaskit/user-picker';
import * as React from 'react';
import { ConfigResponse, ShareClient } from '../clients/ShareServiceClient';
import { DialogContentState, OriginTracing, OriginTracingFactory, ShareButtonStyle, ShareResponse } from '../types';
export declare type Props = {
    buttonStyle?: ShareButtonStyle;
    client?: ShareClient;
    cloudId: string;
    formatCopyLink: (origin: OriginTracing, link: string) => string;
    loadUserOptions: LoadOptions;
    originTracingFactory: OriginTracingFactory;
    productId: string;
    shareAri: string;
    shareContentType: string;
    shareLink: string;
    shareTitle: string;
    shareFormTitle?: React.ReactNode;
    shouldCloseOnEscapePress?: boolean;
    triggerButtonAppearance?: ButtonAppearances;
    triggerButtonStyle?: ShareButtonStyle;
};
export declare type State = {
    config?: ConfigResponse;
    copyLinkOrigin: OriginTracing | null;
    prevShareLink: string | null;
    shareActionCount: number;
    shareOrigin: OriginTracing | null;
};
/**
 * This component serves as a Provider to provide customizable implementations
 * to ShareDialogTrigger component
 */
export declare class ShareDialogContainer extends React.Component<Props, State> {
    private client;
    static defaultProps: {
        shareLink: string;
        formatCopyLink: (origin: OriginTracing, link: string) => string;
    };
    constructor(props: Props);
    static getDerivedStateFromProps(nextProps: Props, prevState: State): Partial<State> | null;
    componentDidMount(): void;
    fetchConfig: () => void;
    handleSubmitShare: ({ users, comment, }: DialogContentState) => Promise<ShareResponse>;
    handleCopyLink: () => void;
    render(): JSX.Element;
}
