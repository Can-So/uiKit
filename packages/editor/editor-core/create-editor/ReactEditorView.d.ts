import * as React from 'react';
import * as PropTypes from 'prop-types';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
import { ProviderFactory, Transformer } from '@atlaskit/editor-common';
import { EventDispatcher } from '../event-dispatcher';
import { AnalyticsEventPayload } from '../plugins/analytics';
import { EditorProps, EditorConfig, EditorPlugin } from '../types';
import { PortalProviderAPI } from '../ui/PortalProvider';
export interface EditorViewProps {
    editorProps: EditorProps;
    createAnalyticsEvent?: CreateUIAnalyticsEventSignature;
    providerFactory: ProviderFactory;
    portalProviderAPI: PortalProviderAPI;
    allowAnalyticsGASV3?: boolean;
    render?: (props: {
        editor: JSX.Element;
        view?: EditorView;
        config: EditorConfig;
        eventDispatcher: EventDispatcher;
        transformer?: Transformer<string>;
        dispatchAnalyticsEvent: (payload: AnalyticsEventPayload) => void;
    }) => JSX.Element;
    onEditorCreated: (instance: {
        view: EditorView;
        config: EditorConfig;
        eventDispatcher: EventDispatcher;
        transformer?: Transformer<string>;
    }) => void;
    onEditorDestroyed: (instance: {
        view: EditorView;
        config: EditorConfig;
        eventDispatcher: EventDispatcher;
        transformer?: Transformer<string>;
    }) => void;
}
export default class ReactEditorView<T = {}> extends React.Component<EditorViewProps & T> {
    view?: EditorView;
    eventDispatcher: EventDispatcher;
    contentTransformer?: Transformer<string>;
    config: EditorConfig;
    editorState: EditorState;
    analyticsEventHandler: (payloadChannel: {
        payload: AnalyticsEventPayload;
        channel?: string;
    }) => void;
    static contextTypes: {
        getAtlaskitAnalyticsEventHandlers: PropTypes.Requireable<any>;
        intl: ReactIntl.IntlShape;
    };
    constructor(props: EditorViewProps & T);
    private broadcastDisabled;
    componentWillReceiveProps(nextProps: EditorViewProps): void;
    /**
     * Deactivate analytics event handler, if exist any.
     */
    deactivateAnalytics(): void;
    /**
     * Create analytics event handler, if createAnalyticsEvent exist
     * @param createAnalyticsEvent
     */
    activateAnalytics(createAnalyticsEvent?: CreateUIAnalyticsEventSignature): void;
    /**
     * Clean up any non-PM resources when the editor is unmounted
     */
    componentWillUnmount(): void;
    getPlugins(editorProps: EditorProps, createAnalyticsEvent?: CreateUIAnalyticsEventSignature): EditorPlugin[];
    createEditorState: (options: {
        props: EditorViewProps;
        replaceDoc?: boolean | undefined;
    }) => EditorState<any>;
    createEditorView: (node: HTMLDivElement) => void;
    handleEditorViewRef: (node: HTMLDivElement) => void;
    dispatchAnalyticsEvent: (payload: AnalyticsEventPayload) => void;
    render(): JSX.Element;
}
