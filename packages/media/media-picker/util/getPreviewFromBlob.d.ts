import { MediaType } from '@atlaskit/media-core';
import { Preview } from '../domain/preview';
export declare const getPreviewFromBlob: (file: Blob, mediaType: MediaType) => Promise<Preview>;
