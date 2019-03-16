import * as React from 'react';
import { PureComponent } from 'react';
import { Document as DocumentModel } from '../model';
export interface Props {
    render(actions: DocumentActions): React.ReactNode;
}
export interface DocumentActions {
    createDocument(value: any): Promise<DocumentModel>;
    editDocument(): void;
    cancelEdit(): void;
    updateDocument(value: any): Promise<DocumentModel>;
}
export default class WithDocumentActions extends PureComponent<Props> {
    private actionsMapper;
    render(): JSX.Element;
}
