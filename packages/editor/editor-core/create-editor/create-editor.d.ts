import { Schema, MarkSpec } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { ProviderFactory, ErrorReporter, ErrorReportingHandler } from '@atlaskit/editor-common';
import { AnalyticsHandler } from '../analytics';
import { EditorPlugin, EditorProps, EditorConfig } from '../types';
import { Dispatch, EventDispatcher } from '../event-dispatcher';
import { PortalProviderAPI } from '../ui/PortalProvider';
export declare function sortByRank(a: {
    rank: number;
}, b: {
    rank: number;
}): number;
export declare function fixExcludes(marks: {
    [key: string]: MarkSpec;
}): {
    [key: string]: MarkSpec;
};
export declare function processPluginsList(plugins: EditorPlugin[], editorProps: EditorProps): EditorConfig;
export declare function createSchema(editorConfig: EditorConfig): Schema<string, string>;
export declare function createPMPlugins({ editorConfig, schema, props, dispatch, eventDispatcher, providerFactory, errorReporter, portalProviderAPI, reactContext, }: {
    editorConfig: EditorConfig;
    schema: Schema;
    props: EditorProps;
    dispatch: Dispatch;
    eventDispatcher: EventDispatcher;
    providerFactory: ProviderFactory;
    errorReporter: ErrorReporter;
    portalProviderAPI: PortalProviderAPI;
    reactContext: () => {
        [key: string]: any;
    };
}): Plugin[];
export declare function createErrorReporter(errorReporterHandler?: ErrorReportingHandler): ErrorReporter;
export declare function initAnalytics(analyticsHandler?: AnalyticsHandler): void;
