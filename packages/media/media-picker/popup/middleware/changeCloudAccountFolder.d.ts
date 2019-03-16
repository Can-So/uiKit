import { Action, Store, Dispatch } from 'redux';
import { Fetcher } from '../tools/fetcher/fetcher';
import { State } from '../domain';
export declare const changeCloudAccountFolderMiddleware: (fetcher: Fetcher) => (store: Store<State>) => (next: Dispatch<State>) => (action: Action) => Action;
