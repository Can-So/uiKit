import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import { Editor as AkEditor, EditorProps } from '@atlaskit/editor-core';
import { Props as BaseProps } from '../components/Conversation';
import { ResourceProvider } from '../api/ConversationResource';
export interface Props extends BaseProps {
    localId: string;
    objectId: string;
    containerId?: string;
    dataProviders?: ProviderFactory;
    meta?: {
        [key: string]: any;
    };
    isExpanded?: boolean;
    onCancel?: () => void;
    provider: ResourceProvider;
}
export interface ContainerProps {
    id?: string;
    objectId: string;
    containerId?: string;
    provider: ResourceProvider;
    dataProviders?: ProviderFactory;
    meta?: {
        [key: string]: any;
    };
    isExpanded?: boolean;
    onCancel?: () => void;
    showBeforeUnloadWarning?: boolean;
    onEditorOpen?: () => void;
    onEditorClose?: () => void;
    onEditorChange?: () => void;
    renderEditor?: (Editor: typeof AkEditor, props: EditorProps) => JSX.Element;
    placeholder?: string;
    disableScrollTo?: boolean;
    allowFeedbackAndHelpButtons?: boolean;
    portal?: HTMLElement;
}
declare class ConversationContainer extends React.Component<ContainerProps, any> {
    constructor(props: ContainerProps);
    render(): JSX.Element;
}
export default ConversationContainer;
