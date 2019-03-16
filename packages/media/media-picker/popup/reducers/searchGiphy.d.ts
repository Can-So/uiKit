import { Action } from 'redux';
import { State } from '../domain';
export declare const giphySearchStarted: (state: State, action: Action) => State;
export declare const giphySearchFullfilled: (state: State, action: Action) => State;
export declare const giphySearchFailed: (state: State, action: Action) => State;
