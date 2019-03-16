import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { ProviderFactory } from '@atlaskit/editor-common';
export declare function inputRulePlugin(schema: Schema, providerFactory?: ProviderFactory): Plugin | undefined;
export declare const stateKey: PluginKey<any>;
declare const plugins: (schema: Schema<any, any>, providerFactory?: ProviderFactory | undefined) => Plugin<any>[];
export default plugins;
