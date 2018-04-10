import { MediaItem } from '../';
import { AuthProvider } from '../auth';
import { MediaBlobService, FetchImageOptions } from './blobService';

export type DataUri = string;

export interface DataUriService {
  fetchOriginalDataUri(mediaItem: MediaItem): Promise<DataUri>;
  fetchImageDataUri(
    mediaItem: MediaItem,
    options: FetchImageOptions,
  ): Promise<DataUri>;
}

export class MediaDataUriService implements DataUriService {
  private blobService: MediaBlobService;

  constructor(
    readonly authProvider: AuthProvider,
    readonly serviceHost: string,
    readonly collectionName?: string,
  ) {
    this.blobService = new MediaBlobService(
      authProvider,
      serviceHost,
      collectionName,
    );
  }

  fetchOriginalDataUri(mediaItem: MediaItem): Promise<DataUri> {
    return this.blobService.fetchOriginalBlob(mediaItem).then(this.readBlob);
  }

  fetchImageDataUri(
    mediaItem: MediaItem,
    options: FetchImageOptions,
  ): Promise<DataUri> {
    return this.blobService
      .fetchImageBlob(mediaItem, options)
      .then(this.readBlob);
  }

  private readBlob(blob: Blob): Promise<DataUri> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.addEventListener('load', () => resolve(reader.result));
      reader.addEventListener('error', () => reject(reader.error));

      reader.readAsDataURL(blob);
    });
  }
}
