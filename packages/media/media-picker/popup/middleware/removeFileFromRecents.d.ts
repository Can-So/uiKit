import { Store, Dispatch, Action } from 'redux';
import { State } from '../domain';
export declare const removeFileFromRecents: (store: Store<State>) => (next: Dispatch<State>) => (action: Action) => Action;
