import { PluginKey } from 'prosemirror-state';
import { PMPluginFactory } from '../../types';
export declare const pluginKey: PluginKey<any>;
export declare type DateState = {
    showDatePickerAt: number | null;
};
declare const createPlugin: PMPluginFactory;
export default createPlugin;
