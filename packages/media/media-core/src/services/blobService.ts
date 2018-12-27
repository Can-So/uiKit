import { AuthProvider } from '@atlaskit/media-store';
import createRequest, {
  CreateRequestFunc,
  Response,
} from './util/createRequest';
import { MediaItem } from '../';

export type ImageResizeMode = 'crop' | 'fit' | 'full-fit' | 'stretchy-fit';
const convertToResizeModeForBackend = (
  mode: ImageResizeMode,
): ImageResizeMode => (mode === 'stretchy-fit' ? 'full-fit' : mode);

export interface FetchImageOptions {
  width: number;
  height: number;
  mode?: ImageResizeMode;
  allowAnimated?: boolean;
}

export interface BlobService {
  fetchImageBlobCancelable(
    mediaItem: MediaItem,
    options: FetchImageOptions,
  ): Response<Blob>;
}

export class MediaBlobService implements BlobService {
  public request: CreateRequestFunc;

  constructor(
    private readonly authProvider: AuthProvider,
    private readonly collectionName?: string,
  ) {
    this.request = createRequest({
      config: {
        authProvider: this.authProvider,
      },
      collectionName: this.collectionName,
    });
  }

  fetchImageBlobCancelable(
    mediaItem: MediaItem,
    { width, height, mode = 'crop', allowAnimated = true }: FetchImageOptions,
  ): Response<Blob> {
    return this.fetchSomeBlob(`/file/${mediaItem.details.id}/image`, {
      width,
      height,
      mode: convertToResizeModeForBackend(mode),
      allowAnimated,
      'max-age': 3600,
      collection: this.collectionName,
    });
  }

  // this is not private just for testing
  fetchSomeBlob(url: string, params: Object): Response<Blob> {
    return this.request({
      url,
      params,
      responseType: 'image',
    });
  }
}
