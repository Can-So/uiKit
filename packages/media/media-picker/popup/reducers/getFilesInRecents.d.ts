import { Action } from 'redux';
import { State } from '../domain';
export declare const getRecentFilesStarted: (state: State, action: Action) => State;
export declare const getRecentFilesFullfilled: (state: State, action: Action) => State;
export declare const getRecentFilesFailed: (state: State, action: Action) => State;
