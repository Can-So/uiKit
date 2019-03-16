import { Conversation } from './Conversation';
import { User } from './User';
export interface Comment extends Pick<Conversation, 'comments' | 'error'> {
    commentId: string;
    conversationId: string;
    parentId?: string;
    document: {
        adf?: any;
        md?: string;
        html?: string;
    };
    createdBy: User;
    createdAt: number;
    deleted?: boolean;
    state?: 'SUCCESS' | 'SAVING' | 'ERROR';
    localId?: string;
    oldDocument?: {
        adf?: any;
        md?: string;
        html?: string;
    };
    isPlaceholder?: boolean;
    commentAri?: string;
    nestedDepth?: number;
}
