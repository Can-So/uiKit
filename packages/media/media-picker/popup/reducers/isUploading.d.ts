import { Action } from 'redux';
import { State } from '../domain';
export declare function isUploading(state: boolean | undefined, action: Action): boolean;
export declare function isCancelling(state: boolean | undefined, action: Action): boolean;
export default function (state: State, action: Action): State;
