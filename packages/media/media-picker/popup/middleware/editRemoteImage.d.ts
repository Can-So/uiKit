import { Store, Dispatch } from 'redux';
import { EditRemoteImageAction } from '../actions/editRemoteImage';
import { State } from '../domain';
export declare const editRemoteImageMiddleware: () => (store: Store<State>) => (next: Dispatch<State>) => (action: EditRemoteImageAction) => EditRemoteImageAction;
export declare function editRemoteImage(store: Store<State>, action: EditRemoteImageAction): Promise<void>;
