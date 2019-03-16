import { EditorProps, EditorInstance, PortalProviderAPI } from '@findable/editor-core';
import { ProviderFactory } from '@findable/editor-common';
import { RefsNode, Refs } from './schema-builder';
import { Schema } from 'prosemirror-model';
import { PluginKey } from 'prosemirror-state';
import { CreateUIAnalyticsEventSignature } from '@findable/analytics-next-types';
/**
 * Currently skipping these three failing tests
 * TODO: JEST-23 Fix these tests
 */
export declare type Options = {
    doc?: (schema: Schema) => RefsNode;
    editorPlugins?: any[];
    editorProps?: EditorProps;
    providerFactory?: ProviderFactory;
    pluginKey?: PluginKey;
    createAnalyticsEvent?: CreateUIAnalyticsEventSignature;
};
export default function createEditorFactoryForTests<T = any>(): ({ doc, editorProps, editorPlugins, providerFactory, pluginKey, createAnalyticsEvent, }: Options) => EditorInstance & {
    portalProviderAPI: PortalProviderAPI;
    refs: Refs;
    sel: number;
    plugin: any;
    pluginState: T;
};
