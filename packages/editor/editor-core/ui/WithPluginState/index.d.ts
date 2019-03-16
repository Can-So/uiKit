import * as React from 'react';
import { PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import * as PropTypes from 'prop-types';
import { EventDispatcher } from '../../event-dispatcher';
import EditorActions from '../../actions';
export interface State {
    [name: string]: any;
}
export declare type PluginsConfig = {
    [name: string]: PluginKey;
};
export declare type Context = {
    editorActions?: EditorActions;
};
export interface Props {
    eventDispatcher?: EventDispatcher;
    editorView?: EditorView;
    plugins: PluginsConfig;
    render: (pluginsState: any) => React.ReactElement<any> | null;
}
/**
 * Wraps component in a high order component that watches state changes of given plugins
 * and passes those states to the wrapped component.
 *
 * Example:
 * <WithPluginState
 *   eventDispatcher={eventDispatcher}
 *   editorView={editorView}
 *   plugins={{
 *     hyperlink: hyperlinkPluginKey
 *   }}
 *   render={renderComponent}
 * />
 *
 * renderComponent: ({ hyperlink }) => React.Component;
 */
export default class WithPluginState extends React.Component<Props, State> {
    private listeners;
    private debounce;
    private notAppliedState;
    private isSubscribed;
    private hasBeenMounted;
    static contextTypes: {
        editorActions: PropTypes.Requireable<any>;
    };
    state: {};
    context: Context;
    constructor(props: Props, context: Context);
    private getEditorView;
    private getEventDispatcher;
    private handlePluginStateChange;
    /**
     * Debounces setState calls in order to reduce number of re-renders caused by several plugin state changes.
     */
    private updateState;
    private getPluginsStates;
    private subscribe;
    private unsubscribe;
    private onContextUpdate;
    private subscribeToContextUpdates;
    private unsubscribeFromContextUpdates;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Props): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<any> | null;
}
