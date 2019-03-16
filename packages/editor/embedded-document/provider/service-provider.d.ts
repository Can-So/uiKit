import { ServiceConfig } from '@atlaskit/util-service-support';
import { Provider } from './provider';
import { Document } from '../model';
export interface Config extends ServiceConfig {
}
export default class ServiceProvider implements Provider {
    private config;
    constructor(config: Config);
    getDocument(documentId: string, language?: string): Promise<Document | null>;
    getDocumentByObjectId(objectId: string, language?: string): Promise<Document | null>;
    updateDocument(documentId: string, body: string, objectId: string, title?: string, language?: string): Promise<Document | null>;
    createDocument(body: string, objectId: string, title?: string, language?: string): Promise<Document | null>;
}
