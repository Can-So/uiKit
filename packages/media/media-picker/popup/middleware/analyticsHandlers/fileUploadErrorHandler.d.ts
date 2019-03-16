import { Action, MiddlewareAPI } from 'redux';
import { State } from '../../domain';
import { HandlerResult } from '.';
declare const _default: (action: Action, store: MiddlewareAPI<State>) => HandlerResult;
export default _default;
