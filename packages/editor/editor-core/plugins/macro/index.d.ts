import { Plugin, PluginKey } from 'prosemirror-state';
import { MacroProvider } from './types';
import { ProviderFactory } from '@findable/editor-common';
import { Dispatch } from '../../event-dispatcher';
import { PMPluginFactoryParams } from '../../types';
export * from './types';
export * from './actions';
export declare const pluginKey: PluginKey<any>;
export declare type MacroState = {
    macroProvider: MacroProvider | null;
};
export declare const createPlugin: (dispatch: Dispatch<any>, providerFactory: ProviderFactory) => Plugin<any>;
declare const _default: {
    pmPlugins(): {
        name: string;
        plugin: ({ dispatch, providerFactory }: PMPluginFactoryParams) => Plugin<any>;
    }[];
};
export default _default;
