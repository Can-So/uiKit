import * as React from 'react';
import { EditorAppearanceComponentProps } from '../../types';
export interface CommentEditorProps {
    isMaxContentSizeReached?: boolean;
    maxHeight?: number;
}
export interface EditorAppearanceComponentState {
}
export default class Editor extends React.Component<EditorAppearanceComponentProps, EditorAppearanceComponentState> {
    static displayName: string;
    private appearance;
    private containerElement;
    private handleSave;
    private handleCancel;
    private renderChrome;
    render(): JSX.Element;
}
