import {
  MediaStore,
  ContextConfig,
  MediaStoreGetFileImageParams,
  ImageMetadata,
} from '@atlaskit/media-store';
import { CollectionFetcher } from '../collection';
import { BlobService, MediaBlobService } from '../services/blobService';
import { FileFetcher } from '../file';

export interface Context {
  getBlobService(collectionName?: string): BlobService;
  getImage(id: string, params?: MediaStoreGetFileImageParams): Promise<Blob>;
  getImageMetadata(
    id: string,
    params?: MediaStoreGetFileImageParams,
  ): Promise<ImageMetadata>;

  readonly collection: CollectionFetcher;
  readonly file: FileFetcher;
  readonly config: ContextConfig;
}

export class ContextFactory {
  public static create(config: ContextConfig): Context {
    return new ContextImpl(config);
  }
}

class ContextImpl implements Context {
  private readonly mediaStore: MediaStore;
  readonly collection: CollectionFetcher;
  readonly file: FileFetcher;

  constructor(readonly config: ContextConfig) {
    this.mediaStore = new MediaStore({
      authProvider: config.authProvider,
    });
    this.collection = new CollectionFetcher(this.mediaStore);
    this.file = new FileFetcher(this.mediaStore);
  }

  // TODO: remove usage from MV and use getImage
  getBlobService(collectionName?: string): BlobService {
    return new MediaBlobService(this.config.authProvider, collectionName);
  }

  getImage(id: string, params?: MediaStoreGetFileImageParams): Promise<Blob> {
    return this.mediaStore.getImage(id, params);
  }

  async getImageMetadata(
    id: string,
    params?: MediaStoreGetFileImageParams,
  ): Promise<ImageMetadata> {
    return (await this.mediaStore.getImageMetadata(id, params)).metadata;
  }
}
