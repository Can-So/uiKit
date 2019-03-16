import { PluginKey, Selection } from 'prosemirror-state';
import { Color as ColorType } from '@findable/status';
import { PMPluginFactory } from '../../types';
export declare const pluginKey: PluginKey<any>;
export declare type StatusType = {
    color: ColorType;
    text: string;
    localId?: string;
};
export declare type StatusState = {
    isNew: boolean;
    showStatusPickerAt: number | null;
    selectionChanges: SelectionChange;
    selectedStatus: StatusType | null;
};
export declare type SelectionChangeHandler = (newSelection: Selection, prevSelection: Selection) => any;
export declare class SelectionChange {
    private changeHandlers;
    constructor();
    subscribe(cb: SelectionChangeHandler): void;
    unsubscribe(cb: SelectionChangeHandler): void;
    notifyNewSelection(newSelection: Selection, prevSelection: Selection): void;
}
declare const createPlugin: PMPluginFactory;
export default createPlugin;
