import { Action, Dispatch, Store } from 'redux';
import { State } from '../domain';
export declare const getFilesInRecents: () => (store: Store<State>) => (next: Dispatch<Action>) => (action: Action) => Action;
export declare const requestRecentFiles: (store: Store<State>) => void;
