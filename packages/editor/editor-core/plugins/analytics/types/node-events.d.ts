import { TrackAEP } from './events';
import { ACTION_SUBJECT, INPUT_METHOD, ACTION } from './enums';
export declare const enum PANEL_TYPE {
    INFO = "info",
    SUCCESS = "success",
    NOTE = "note",
    WARNING = "warning",
    ERROR = "error"
}
declare type DeletePanelAEP = TrackAEP<ACTION.DELETED, ACTION_SUBJECT.PANEL, undefined, {
    inputMethod: INPUT_METHOD.TOOLBAR;
}>;
declare type ChangePanelAEP = TrackAEP<ACTION.CHANGED_TYPE, ACTION_SUBJECT.PANEL, undefined, {
    newType: PANEL_TYPE;
    previousType: PANEL_TYPE;
}>;
export declare type NodeEventPayload = ChangePanelAEP | DeletePanelAEP;
export {};
