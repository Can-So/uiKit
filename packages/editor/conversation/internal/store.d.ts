import { Store } from 'redux';
import { Conversation, User } from '../model';
export interface State {
    conversations: Conversation[];
    user?: User;
    highlighted?: string;
}
export interface Action {
    type: string;
    payload?: any;
}
export declare type Handler = (state: State | undefined) => void;
export default function createStore(initialState?: State): Store<State | undefined>;
