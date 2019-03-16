import { PluginKey, Plugin } from 'prosemirror-state';
export declare type LayoutState = {
    pos: number | null;
    allowBreakout: boolean;
};
export declare const pluginKey: PluginKey<any>;
declare const _default: (pluginConfig?: boolean | {
    allowBreakout: boolean;
} | undefined) => Plugin<any>;
export default _default;
