import * as React from 'react';
import { EditorAppearanceComponentProps } from '../../types';
export interface MobileEditorProps {
    isMaxContentSizeReached?: boolean;
    maxHeight?: number;
}
export default class Editor extends React.Component<EditorAppearanceComponentProps, any> {
    static displayName: string;
    private appearance;
    private containerElement;
    private handleRef;
    private renderMobile;
    render(): JSX.Element;
}
