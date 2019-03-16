import * as React from 'react';
import { Conversation as ConversationType } from '../model';
import { SharedProps, SendAnalyticsEvent } from './types';
import { createAnalyticsEvent } from '../internal/analytics';
import { SuccessHandler } from '../internal/actions';
export interface Props extends SharedProps {
    id?: string;
    localId?: string;
    conversation?: ConversationType;
    objectId: string;
    containerId?: string;
    showBeforeUnloadWarning?: boolean;
    onCreateConversation?: (localId: string, value: any, meta: any, objectId: string, containerId?: string, onSuccess?: SuccessHandler) => void;
    isExpanded?: boolean;
    meta?: {
        [key: string]: any;
    };
    createAnalyticsEvent: createAnalyticsEvent;
    portal?: HTMLElement;
}
export interface State {
    openEditorCount: number;
}
export default class Conversation extends React.PureComponent<Props, State> {
    constructor(props: Props);
    static defaultProps: {
        placeholder: string;
    };
    sendEditorAnalyticsEvent: SendAnalyticsEvent;
    private renderComments;
    private onCancel;
    private onOpen;
    private renderConversationsEditor;
    private onRetry;
    private onSave;
    private onEditorClose;
    private onEditorOpen;
    private handleEditorChange;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
