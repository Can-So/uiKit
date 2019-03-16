import { Store, Action, Dispatch } from 'redux';
import { State } from '../domain';
import { PopupUploadEventEmitter } from '../../components/types';
declare const _default: (eventEmitter: PopupUploadEventEmitter) => (_: Store<State>) => (next: Dispatch<State>) => (action: Action) => Action;
export default _default;
