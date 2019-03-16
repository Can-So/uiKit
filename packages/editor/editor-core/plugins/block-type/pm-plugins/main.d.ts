import { Plugin, PluginKey } from 'prosemirror-state';
import { BlockType } from '../types';
export declare type BlockTypeState = {
    currentBlockType: BlockType;
    blockTypesDisabled: boolean;
    availableBlockTypes: BlockType[];
    availableWrapperBlockTypes: BlockType[];
};
export declare const pluginKey: PluginKey<any>;
export declare const createPlugin: (dispatch: (eventName: string | PluginKey<any>, data: any) => void, appearance?: "comment" | "full-page" | "chromeless" | "mobile" | undefined) => Plugin<any>;
