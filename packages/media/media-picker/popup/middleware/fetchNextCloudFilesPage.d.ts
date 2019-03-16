import { Action, Store, Dispatch } from 'redux';
import { State } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';
export declare const fetchNextCloudFilesPageMiddleware: (fetcher: Fetcher) => (store: Store<State>) => (next: Dispatch<State>) => (action: Action) => Action;
