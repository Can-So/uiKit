import { Action, State } from './store';
declare type Reducer = (state: State, action: Action) => State;
export declare const createReducer: (initialState: State, handlers: {
    [key: string]: Reducer;
}) => (state: State | undefined, action: Action) => State;
export {};
