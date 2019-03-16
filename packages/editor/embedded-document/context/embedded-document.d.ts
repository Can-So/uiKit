import { Component, ReactElement } from 'react';
import { Mode, State } from './context';
import { ProviderProps } from '../provider';
export declare const akEditorFullPageMaxWidth = 680;
export interface Props extends ProviderProps {
    objectId: string;
    documentId?: string;
    containerId?: string;
    language?: string;
    mode?: Mode;
    renderTitle?: (mode: Mode, doc?: any) => ReactElement<any>;
    renderToolbar?: (mode: Mode, editorActions?: any) => ReactElement<any>;
}
export default class EmbeddedDocument extends Component<Props, State> {
    private actions;
    private provider;
    constructor(props: Props);
    componentDidMount(): Promise<void>;
    private getDocumentByObjectId;
    private getDocument;
    private setDocumentMode;
    private updateDocument;
    private createDocument;
    private setDocumentState;
    /**
     * Toolbar will only be rendered here if we're in "view"-mode.
     *
     * In all other modes, the toolbar rendering will be triggered
     * by the Document-component.
     */
    private renderToolbar;
    /**
     * Title will only be rendered here if we're in "view"-mode.
     *
     * In all other modes, the title rendering will be triggered
     * by the Document-component.
     */
    private renderTitle;
    private renderContent;
    render(): JSX.Element;
}
