import { ContextIdentifierProvider } from '@findable/editor-common';
export declare function storyContextIdentifierProviderFactory(config?: {
    objectId: string;
    containerId: string;
    childObjectId: string;
}): Promise<ContextIdentifierProvider>;
