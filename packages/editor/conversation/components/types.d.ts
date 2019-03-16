/// <reference types="react" />
import { ProviderFactory } from '@findable/editor-common';
import { Comment as CommentType, User } from '../model';
import { Editor as AkEditor, EditorProps } from '@findable/editor-core';
import { SuccessHandler } from '../internal/actions';
import { EventData } from '../internal/analytics';
export declare type SendAnalyticsEvent = (eventData: EventData) => void;
/**
 * Props which are passed down from the parent Conversation/Comment
 */
export interface SharedProps {
    user?: User;
    comments?: CommentType[];
    onAddComment?: (conversationId: string, parentId: string, value: any, localId?: string, onSuccess?: SuccessHandler) => void;
    onUpdateComment?: (conversationId: string, commentId: string, value: any, onSuccess?: SuccessHandler) => void;
    onDeleteComment?: (conversationId: string, commentId: string, onSuccess?: SuccessHandler) => void;
    onRevertComment?: (conversationId: string, commentId: string) => void;
    onCancelComment?: (conversationId: string, commentId: string) => void;
    onCancel?: () => void;
    onHighlightComment?: (commentId: string) => void;
    onEditorOpen?: () => void;
    onEditorClose?: () => void;
    onEditorChange?: (isLocal: boolean, value: any, conversationId: string, commentId: string | undefined, meta: any, objectId: string, containerId?: string) => void;
    dataProviders?: ProviderFactory;
    onUserClick?: (user: User) => void;
    onRetry?: (localId?: string) => void;
    renderEditor?: (Editor: typeof AkEditor, props: EditorProps) => JSX.Element;
    objectId?: string;
    containerId?: string;
    isHighlighted?: boolean;
    placeholder?: string;
    disableScrollTo?: boolean;
    allowFeedbackAndHelpButtons?: boolean;
    sendAnalyticsEvent: SendAnalyticsEvent;
    portal?: HTMLElement;
}
