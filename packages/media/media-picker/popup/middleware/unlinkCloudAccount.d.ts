import { Store, Dispatch } from 'redux';
import { RequestUnlinkCloudAccountAction } from '../actions';
import { State } from '../domain';
import { Fetcher } from '../tools/fetcher/fetcher';
declare const _default: (fetcher: Fetcher) => (store: Store<State>) => (next: Dispatch<State>) => (action: RequestUnlinkCloudAccountAction) => RequestUnlinkCloudAccountAction;
export default _default;
