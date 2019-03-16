import { Store, Unsubscribe } from 'redux';
import { State, Action, Handler } from '../internal/store';
import { Comment, Conversation, User } from '../model';
export interface ConversationResourceConfig {
    url: string;
    user?: User;
}
export interface ResourceProvider {
    store: Store<State | undefined>;
    getConversations(objectId: string, containerId?: string): Promise<Conversation[]>;
    subscribe(handler: Handler): Unsubscribe;
    create(localId: string, value: any, meta: any, objectId: string, containerId?: string): Promise<Conversation>;
    addComment(conversationId: string, parentId: string, document: any, localId?: string): Promise<Comment>;
    updateComment(conversationId: string, commentId: string, document: any): Promise<Comment>;
    deleteComment(conversationId: string, commentId: string): Promise<Pick<Comment, 'conversationId' | 'commentId' | 'deleted'>>;
    revertComment(conversationId: string, commentId: string): Promise<Pick<Comment, 'conversationId' | 'commentId'>>;
    updateUser(user?: User): Promise<User | undefined>;
    saveDraft(isLocal: boolean, value: any, conversationId: string, commentId: string | undefined, meta: any, objectId: string, containerId?: string): void;
}
export declare class AbstractConversationResource implements ResourceProvider {
    private _store;
    readonly store: Store<State | undefined>;
    dispatch: (action: Action) => void;
    constructor();
    /**
     * Retrieve the IDs (and meta-data) for all conversations associated with the container ID.
     */
    getConversations(objectId: string, containerId?: string): Promise<Conversation[]>;
    /**
     * Subscribe to the provider's internal store
     * @param {Handler} handler
     */
    subscribe(handler: Handler): Unsubscribe;
    /**
     * Creates a new Conversation and associates it with the containerId provided.
     */
    create(localId: string, value: any, meta: any, objectId: string, containerId?: string): Promise<Conversation>;
    /**
     * Adds a comment to a parent, or update if existing. ParentId can be either a conversation or another comment.
     */
    addComment(conversationId: string, parentId: string, doc: any, localId?: string): Promise<Comment>;
    /**
     * Updates a comment based on ID. Returns updated content
     */
    updateComment(conversationId: string, commentId: string, document: any): Promise<Comment>;
    /**
     * Deletes a comment based on ID. Returns updated comment.
     */
    deleteComment(conversationId: string, commentId: string): Promise<Pick<Comment, 'conversationId' | 'commentId' | 'deleted'>>;
    /**
     * Reverts a comment based on ID.
     */
    revertComment(conversationId: string, commentId: string): Promise<Pick<Comment, 'conversationId' | 'commentId'>>;
    /**
     * Updates a user in the store. Returns updated user
     */
    updateUser(user?: User): Promise<User | undefined>;
    saveDraft(isLocal: boolean, value: any, conversationId: string, commentId: string | undefined, meta: any, objectId: string, containerId?: string): void;
}
export declare class ConversationResource extends AbstractConversationResource {
    private config;
    constructor(config: ConversationResourceConfig);
    private makeRequest;
    /**
     * Retrieve the IDs (and meta-data) for all conversations associated with the container ID.
     */
    getConversations(objectId: string, containerId?: string): Promise<Conversation[]>;
    /**
     * Creates a new Conversation and associates it with the containerId provided.
     */
    create(localId: string, value: any, meta: any, objectId: string, containerId?: string): Promise<Conversation>;
    /**
     * Adds a comment to a parent, or update if existing. ParentId can be either a conversation or another comment.
     */
    addComment(conversationId: string, parentId: string, doc: any, localId?: string): Promise<Comment>;
    /**
     * Updates a comment based on ID. Returns updated content
     */
    updateComment(conversationId: string, commentId: string, document: any): Promise<Comment>;
    /**
     * Deletes a comment based on ID. Returns updated comment.
     */
    deleteComment(conversationId: string, commentId: string): Promise<Pick<Comment, 'conversationId' | 'commentId' | 'deleted'>>;
    /**
     * Reverts a comment based on ID.
     */
    revertComment(conversationId: string, commentId: string): Promise<Pick<Comment, 'conversationId' | 'commentId'>>;
    /**
     * Updates a user in the store. Returns updated user
     */
    updateUser(user?: User): Promise<User | undefined>;
    /**
     * Internal helper methods for optimistic updates
     */
    private createConversation;
    protected createComment(conversationId: string, parentId: string, doc: any, localId?: string): Comment;
    protected getComment(conversationId: string, commentId: string): Comment | undefined;
}
