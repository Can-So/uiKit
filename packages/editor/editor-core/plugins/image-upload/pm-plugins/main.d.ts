import { Plugin, PluginKey } from 'prosemirror-state';
import { PMPluginFactoryParams } from '../../../types';
export declare const stateKey: PluginKey<any>;
export declare const createPlugin: ({ dispatch, providerFactory, }: PMPluginFactoryParams) => Plugin<any>;
