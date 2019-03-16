import { MediaUpload } from '@atlaskit/media-store';
import { ChunkId } from './chunk';
export declare type Upload = MediaUpload & {
    chunks: ChunkId[];
};
export declare function createUpload(): Upload;
