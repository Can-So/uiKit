import * as React from 'react';
import Comment from '../containers/Comment';
import Editor from './Editor';
import {
  Comment as CommentType,
  Conversation as ConversationType,
  User,
} from '../model';

export interface Props {
  id?: string;
  localId?: string;
  conversation?: ConversationType;
  containerId: string;
  comments?: CommentType[];
  user?: User;
  onAddComment?: (conversationId: string, parentId: string, value: any) => void;
  onUpdateComment?: (
    conversationId: string,
    commentId: string,
    value: any,
  ) => void;
  onCreateConversation?: (
    localId: string,
    containerId: string,
    value: any,
    meta: any,
  ) => void;
  onCancel?: () => void;
  isExpanded?: boolean;
  meta?: {
    [key: string]: any;
  };
}

export default class Conversation extends React.PureComponent<Props> {
  private renderComments() {
    const {
      comments,
      conversation,
      onAddComment,
      onUpdateComment,
      user,
    } = this.props;

    if (!conversation) {
      return;
    }

    const { conversationId } = conversation;

    return (comments || []).map(comment => (
      <Comment
        key={comment.commentId}
        conversationId={conversationId}
        comment={comment}
        user={user}
        onAddComment={onAddComment}
        onUpdateComment={onUpdateComment}
      />
    ));
  }

  private onSave = async (value: any) => {
    const {
      containerId,
      id,
      localId,
      meta,
      onAddComment,
      onCreateConversation,
    } = this.props;

    if (!id) {
      if (onCreateConversation) {
        onCreateConversation(localId!, containerId, value, meta);
      }
    } else {
      if (onAddComment) {
        onAddComment(id, id, value);
      }
    }
  };

  render() {
    const { isExpanded, onCancel, meta } = this.props;

    return (
      <div>
        {this.renderComments()}
        {isExpanded || !meta ? (
          <Editor
            isExpanded={isExpanded}
            onSave={this.onSave}
            onCancel={onCancel}
          />
        ) : null}
      </div>
    );
  }
}
