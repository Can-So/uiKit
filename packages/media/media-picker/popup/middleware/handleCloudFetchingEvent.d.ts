import { Action, Dispatch, Store } from 'redux';
import { State } from '../domain';
export declare const handleCloudFetchingEvent: (store: Store<State>) => (next: Dispatch<State>) => (action: Action) => Action;
