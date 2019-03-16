import * as React from 'react';
import { Comment as CommentType } from '../model';
import { SharedProps } from './types';
export interface Props extends SharedProps {
    conversationId: string;
    comment: CommentType;
}
export interface State {
    isEditing?: boolean;
    isReplying?: boolean;
    lastDispatch?: {
        handler: any;
        args: any[];
    };
}
export declare const DeletedMessage: () => JSX.Element;
export default class Comment extends React.Component<Props, State> {
    constructor(props: Props);
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    private dispatch;
    private onReply;
    private onSaveReply;
    private onCancelReply;
    private onDelete;
    private onEdit;
    private handleCommentEditorChange;
    private onSaveEdit;
    private onCancelEdit;
    private onRequestCancel;
    private onRequestRetry;
    /**
     * Username click handler - pass a User object, returns a handler which will invoke onUserClick with it
     * @param {User} user
     */
    private handleUserClick;
    private getContent;
    private renderComments;
    private renderEditor;
    private getActions;
    private handleTimeClick;
    render(): JSX.Element;
}
