import { Store, Dispatch, Action } from 'redux';
import { State } from '../domain';
export declare const changeService: (store: Store<State>) => (next: Dispatch<State>) => (action: Action) => Promise<Action>;
