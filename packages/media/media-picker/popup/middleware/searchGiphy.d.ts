import { Store, Dispatch, Action } from 'redux';
import { State } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';
export interface TrendingGifsParams {
    readonly offset?: number;
    readonly query: string;
    readonly shouldAppendResults: boolean;
}
declare const _default: (fetcher: Fetcher) => (store: Store<State>) => (next: Dispatch<State>) => (action: Action) => Action;
export default _default;
export declare const fetchGifs: (fetcher: Fetcher, store: Store<State>, params: TrendingGifsParams) => Promise<void>;
