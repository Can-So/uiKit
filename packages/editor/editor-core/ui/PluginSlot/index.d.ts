import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { ProviderFactory } from '@findable/editor-common';
import { EditorAppearance, UIComponentFactory } from '../../types';
import { EventDispatcher } from '../../event-dispatcher';
import EditorActions from '../../actions';
import { AnalyticsEventPayload } from '../../plugins/analytics';
export interface Props {
    items?: Array<UIComponentFactory>;
    editorView?: EditorView;
    editorActions?: EditorActions;
    eventDispatcher?: EventDispatcher;
    providerFactory: ProviderFactory;
    appearance: EditorAppearance;
    popupsMountPoint?: HTMLElement;
    popupsBoundariesElement?: HTMLElement;
    popupsScrollableElement?: HTMLElement;
    containerElement: HTMLElement | undefined;
    disabled: boolean;
    dispatchAnalyticsEvent?: (payload: AnalyticsEventPayload) => void;
}
export default class PluginSlot extends React.Component<Props, any> {
    shouldComponentUpdate(nextProps: Props): boolean;
    render(): JSX.Element | null;
}
