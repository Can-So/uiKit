import { Action, State } from './store';
import { Conversation } from '../model';
export declare const getNestedDepth: (conversation: Conversation, parentId?: string | undefined, level?: number) => number;
export declare const initialState: {
    conversations: never[];
};
export declare const reducers: (state: State | undefined, action: Action) => State;
