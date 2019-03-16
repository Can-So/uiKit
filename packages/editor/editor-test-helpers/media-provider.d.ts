import { MediaProvider } from '@atlaskit/editor-core';
export interface MediaProviderFactoryConfig {
    collectionName?: string;
    dropzoneContainer?: HTMLElement;
    includeUploadContext?: boolean;
    includeUserAuthProvider?: boolean;
    useMediaPickerAuthProvider?: boolean;
}
/**
 * Add "import * as mediaTestHelpers from '@atlaskit/media-test-helpers'"
 * at the beginning of your file and pass "mediaTestHelpers" into this function
 */
export declare function storyMediaProviderFactory(mediaProviderFactoryConfig?: MediaProviderFactoryConfig): Promise<MediaProvider>;
export declare type promisedString = Promise<string>;
export declare type resolveFn = (...v: any) => any;
export declare type thumbnailStore = {
    [id: string]: promisedString | resolveFn;
};
export declare function fileToBase64(blob: Blob): Promise<{}>;
export declare function isImage(type: string): boolean;
