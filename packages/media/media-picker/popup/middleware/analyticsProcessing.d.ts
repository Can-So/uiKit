import { MiddlewareAPI, Dispatch, Action } from 'redux';
import { State } from '../domain';
declare const _default: (store: MiddlewareAPI<State>) => (next: Dispatch<State>) => (action: Action) => Action;
export default _default;
