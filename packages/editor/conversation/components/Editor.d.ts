import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import { Editor as AkEditor, EditorProps } from '@atlaskit/editor-core';
import { User } from '../model';
export interface Props {
    defaultValue?: any;
    isExpanded?: boolean;
    onCancel?: () => void;
    onSave?: (value: any) => void;
    onClose?: () => void;
    onOpen?: () => void;
    isEditing?: boolean;
    onChange?: (value: any) => void;
    dataProviders?: ProviderFactory;
    user?: User;
    renderEditor?: (Editor: typeof AkEditor, props: EditorProps) => JSX.Element;
    placeholder?: string;
    disableScrollTo?: boolean;
    allowFeedbackAndHelpButtons?: boolean;
}
export interface State {
    isExpanded?: boolean;
    isEditing?: boolean;
}
export default class Editor extends React.Component<Props, State> {
    constructor(props: Props);
    UNSAFE_componentWillUpdate(nextProps: Props, nextState: State): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private onFocus;
    private onCancel;
    private onSave;
    private onChange;
    private renderEditor;
    renderAvatar(): JSX.Element | null;
    render(): JSX.Element;
}
