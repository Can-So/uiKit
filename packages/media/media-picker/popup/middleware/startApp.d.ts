import { Dispatch, MiddlewareAPI, Action } from 'redux';
import { State } from '../domain';
export default function (): (store: MiddlewareAPI<State>) => (next: Dispatch<State>) => (action: Action) => Action;
