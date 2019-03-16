import { State } from './store';
import { Comment, Conversation, User } from '../model';
export declare const getConversation: (state: State, conversationId: string) => Conversation | undefined;
export declare const getComments: (state: State, conversationId: string, parentId?: string | undefined) => Comment[];
export declare const getHighlighted: (state: State) => string | undefined;
export declare const getUser: (state: State) => User | undefined;
