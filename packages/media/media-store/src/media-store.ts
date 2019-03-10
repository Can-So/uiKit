import {
  MediaFile,
  MediaCollection,
  MediaCollectionItems,
  MediaUpload,
  MediaChunksProbe,
  MediaCollectionItemFullDetails,
} from './models/media';
import {
  AsapBasedAuth,
  AuthContext,
  ClientAltBasedAuth,
  MediaApiConfig,
} from './models/auth';
import {
  request,
  createUrl,
  mapResponseToJson,
  RequestMethod,
  RequestParams,
  RequestHeaders,
  mapResponseToVoid,
  mapResponseToBlob,
} from './utils/request';
import { MediaFileArtifacts, getArtifactUrl } from './models/artifacts';
import { checkWebpSupport } from './utils/checkWebpSupport';

const defaultImageOptions: MediaStoreGetFileImageParams = {
  'max-age': 3600,
  allowAnimated: true,
  mode: 'crop',
};

const defaultGetCollectionItems: MediaStoreGetCollectionItemsParams = {
  limit: 30,
  sortDirection: 'desc',
};

const extendImageParams = (
  params?: MediaStoreGetFileImageParams,
): MediaStoreGetFileImageParams => {
  return { ...defaultImageOptions, ...params };
};

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export class MediaStore {
  constructor(private readonly config: MediaApiConfig) {}

  createCollection(
    collectionName: string,
  ): Promise<MediaStoreResponse<MediaCollection>> {
    return this.request('/collection', {
      method: 'POST',
      body: JSON.stringify({ name: collectionName }),
      authContext: { collectionName },
      headers: jsonHeaders,
    }).then(mapResponseToJson);
  }

  getCollection(
    collectionName: string,
  ): Promise<MediaStoreResponse<MediaCollection>> {
    return this.request(`/collection/${collectionName}`, {
      authContext: { collectionName },
      headers: {
        Accept: 'application/json',
      },
    }).then(mapResponseToJson);
  }

  async getCollectionItems(
    collectionName: string,
    params?: MediaStoreGetCollectionItemsParams,
  ): Promise<MediaStoreResponse<MediaCollectionItems>> {
    const response = await this.request(`/collection/${collectionName}/items`, {
      authContext: { collectionName },
      params: {
        ...defaultGetCollectionItems,
        ...params,
      },
      headers: {
        Accept: 'application/json',
      },
    });
    const {
      data: { contents, nextInclusiveStartKey },
    }: MediaStoreResponse<MediaCollectionItems> = await mapResponseToJson(
      response,
    );
    // [TODO] MS-705: remove after backend adds filter
    // This prevents showing "ghost" files in recents
    const contentsWithoutEmptyFiles = contents.filter(
      item => item.details.size && item.details.size > 0,
    );

    return {
      data: {
        contents: contentsWithoutEmptyFiles,
        nextInclusiveStartKey,
      },
    };
  }

  async removeCollectionFile(
    id: string,
    collectionName: string,
    occurrenceKey?: string,
  ): Promise<void> {
    const body = {
      actions: [
        {
          action: 'remove',
          item: {
            type: 'file',
            id,
            occurrenceKey,
          },
        },
      ],
    };

    await this.request(`/collection/${collectionName}`, {
      method: 'PUT',
      authContext: { collectionName },
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  createUpload(
    createUpTo: number = 1,
    collectionName?: string,
  ): Promise<MediaStoreResponse<MediaUpload[]>> {
    return this.request(`/upload`, {
      method: 'POST',
      authContext: { collectionName },
      params: {
        createUpTo,
      },
      headers: {
        Accept: 'application/json',
      },
    }).then(mapResponseToJson);
  }

  uploadChunk(
    etag: string,
    blob: Blob,
    collectionName?: string,
  ): Promise<void> {
    return this.request(`/chunk/${etag}`, {
      method: 'PUT',
      authContext: { collectionName },
      body: blob,
    }).then(mapResponseToVoid);
  }

  probeChunks(
    chunks: string[],
    collectionName?: string,
  ): Promise<MediaStoreResponse<MediaChunksProbe>> {
    return this.request(`/chunk/probe`, {
      method: 'POST',
      authContext: { collectionName },
      body: JSON.stringify({
        chunks,
      }),
      headers: jsonHeaders,
    }).then(mapResponseToJson);
  }

  createFileFromUpload(
    body: MediaStoreCreateFileFromUploadBody,
    params: MediaStoreCreateFileFromUploadParams = {},
  ): Promise<MediaStoreResponse<MediaFile>> {
    return this.request('/file/upload', {
      method: 'POST',
      authContext: { collectionName: params.collection },
      params,
      body: JSON.stringify(body),
      headers: jsonHeaders,
    }).then(mapResponseToJson);
  }

  touchFiles(
    body: MediaStoreTouchFileBody,
    params: MediaStoreTouchFileParams = {},
  ): Promise<MediaStoreResponse<TouchedFiles>> {
    return this.request('/upload/createWithFiles', {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(body),
      authContext: { collectionName: params.collection },
    }).then(mapResponseToJson);
  }

  createFile(
    params: MediaStoreCreateFileParams = {},
  ): Promise<MediaStoreResponse<EmptyFile>> {
    return this.request('/file', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      params,
      authContext: { collectionName: params.collection },
    }).then(mapResponseToJson);
  }

  createFileFromBinary(
    blob: Blob,
    params: MediaStoreCreateFileFromBinaryParams = {},
  ): Promise<MediaStoreResponse<MediaFile>> {
    return this.request('/file/binary', {
      method: 'POST',
      body: blob,
      params,
      headers: {
        Accept: 'application/json',
        'Content-Type': blob.type,
      },
      authContext: { collectionName: params.collection },
    }).then(mapResponseToJson);
  }

  getFile = (
    fileId: string,
    params: MediaStoreGetFileParams = {},
  ): Promise<MediaStoreResponse<MediaFile>> => {
    return this.request(`/file/${fileId}`, {
      params,
      authContext: { collectionName: params.collection },
    }).then(mapResponseToJson);
  };

  getFileImageURL = async (
    id: string,
    params?: MediaStoreGetFileImageParams,
  ): Promise<string> => {
    const auth = await this.config.authProvider();

    return createUrl(`${auth.baseUrl}/file/${id}/image`, {
      params: extendImageParams(params),
      auth,
    });
  };

  getFileBinaryURL = async (
    id: string,
    collectionName?: string,
  ): Promise<string> => {
    const auth = await this.config.authProvider({ collectionName });

    return createUrl(`${auth.baseUrl}/file/${id}/binary`, {
      params: { dl: true, collection: collectionName },
      auth,
    });
  };

  getArtifactURL = async (
    artifacts: MediaFileArtifacts,
    artifactName: keyof MediaFileArtifacts,
    collectionName?: string,
  ): Promise<string> => {
    const artifactUrl = getArtifactUrl(artifacts, artifactName);
    if (!artifactUrl) {
      throw new Error(`artifact ${artifactName} not found`);
    }

    const auth = await this.config.authProvider({ collectionName });

    return createUrl(`${auth.baseUrl}${artifactUrl}`, {
      params: { collection: collectionName },
      auth,
    });
  };

  getImage = async (
    id: string,
    params?: MediaStoreGetFileImageParams,
    controller?: AbortController,
  ): Promise<Blob> => {
    const isWebpSupported = await checkWebpSupport();
    let headers;
    if (isWebpSupported) {
      headers = {
        accept: 'image/webp,image/*,*/*;q=0.8',
      };
    }
    return this.request(
      `/file/${id}/image`,
      {
        headers,
        params: extendImageParams(params),
        authContext: { collectionName: params && params.collection },
      },
      controller,
    ).then(mapResponseToBlob);
  };

  getItems = (
    ids: string[],
    collectionName?: string,
  ): Promise<MediaStoreResponse<ItemsPayload>> => {
    const descriptors = ids.map(id => ({
      type: 'file',
      id,
      collection: collectionName,
    }));

    return this.request('/items', {
      method: 'POST',
      body: JSON.stringify({ descriptors }),
      headers: jsonHeaders,
      authContext: { collectionName },
    }).then(mapResponseToJson);
  };

  getImageMetadata = (
    id: string,
    params?: MediaStoreGetFileImageParams,
  ): Promise<{ metadata: ImageMetadata }> => {
    return this.request(`/file/${id}/image/metadata`, {
      params,
      authContext: { collectionName: params && params.collection },
    }).then(mapResponseToJson);
  };

  appendChunksToUpload(
    uploadId: string,
    body: AppendChunksToUploadRequestBody,
    collectionName?: string,
  ): Promise<void> {
    return this.request(`/upload/${uploadId}/chunks`, {
      method: 'PUT',
      authContext: { collectionName },
      body: JSON.stringify(body),
      headers: jsonHeaders,
    }).then(mapResponseToVoid);
  }

  copyFileWithToken(
    body: MediaStoreCopyFileWithTokenBody,
    params: MediaStoreCopyFileWithTokenParams,
  ): Promise<MediaStoreResponse<MediaFile>> {
    return this.request('/file/copy/withToken', {
      method: 'POST',
      authContext: { collectionName: params.collection }, // Contains collection name to write to
      body: JSON.stringify(body), // Contains collection name to read from
      headers: jsonHeaders,
      params, // Contains collection name to write to
    }).then(mapResponseToJson);
  }

  async request(
    path: string,
    options: MediaStoreRequestOptions = {
      method: 'GET',
      authContext: {},
    },
    controller?: AbortController,
  ): Promise<Response> {
    const { authProvider } = this.config;
    const { method, authContext, params, headers, body } = options;
    const auth = await authProvider(authContext);

    return request(
      `${auth.baseUrl}${path}`,
      {
        method,
        auth,
        params,
        headers,
        body,
      },
      controller,
    );
  }
}

export interface FileItem {
  id: string;
  type: 'file';
  details: MediaCollectionItemFullDetails;
  collection?: string;
}

export interface ItemsPayload {
  items: FileItem[];
}

export type ImageMetadataArtifact = {
  url?: string;
  width?: number;
  height?: number;
  size?: number;
};

export interface ImageMetadata {
  pending: boolean;
  preview?: ImageMetadataArtifact;
  original?: ImageMetadataArtifact;
}

export interface MediaStoreResponse<Data> {
  readonly data: Data;
}

export type MediaStoreRequestOptions = {
  readonly method?: RequestMethod;
  readonly authContext: AuthContext;
  readonly params?: RequestParams;
  readonly headers?: RequestHeaders;
  readonly body?: any;
};

export type MediaStoreCreateFileFromUploadParams = {
  readonly collection?: string;
  readonly occurrenceKey?: string;
  readonly expireAfter?: number;
  readonly replaceFileId?: string;
  readonly skipConversions?: boolean;
};

export type MediaStoreCreateFileParams = {
  readonly occurrenceKey?: string;
  readonly collection?: string;
};

export interface MediaStoreTouchFileParams {
  readonly collection?: string;
}

export interface TouchFileDescriptor {
  fileId: string;
  collection?: string;
  occurrenceKey?: string;
  expireAfter?: number;
  deletable?: boolean;
}

export interface MediaStoreTouchFileBody {
  descriptors: TouchFileDescriptor[];
}

export type MediaStoreCreateFileFromBinaryParams = {
  readonly replaceFileId?: string;
  readonly collection?: string;
  readonly occurrenceKey?: string;
  readonly expireAfter?: number;
  readonly skipConversions?: boolean;
  readonly name?: string;
};

export type MediaStoreCreateFileFromUploadConditions = {
  readonly hash: string;
  readonly size: number;
};

export type MediaStoreCreateFileFromUploadBody = {
  readonly uploadId: string;

  readonly name?: string;
  readonly mimeType?: string;
  readonly conditions?: MediaStoreCreateFileFromUploadConditions;
};

export type MediaStoreGetFileParams = {
  readonly version?: number;
  readonly collection?: string;
};

export type MediaStoreGetFileImageParams = {
  readonly allowAnimated?: boolean;
  readonly version?: number;
  readonly collection?: string;
  readonly width?: number;
  readonly height?: number;
  readonly mode?: 'fit' | 'full-fit' | 'crop';
  readonly upscale?: boolean;
  readonly 'max-age'?: number;
};

export type MediaStoreGetCollectionItemsParams = {
  readonly limit?: number;
  readonly inclusiveStartKey?: string;
  readonly sortDirection?: 'asc' | 'desc';
  readonly details?: 'minimal' | 'full';
};

export interface SourceFile {
  id: string;
  owner: ClientAltBasedAuth | AsapBasedAuth;
  collection?: string;
  version?: number;
}

export type MediaStoreCopyFileWithTokenBody = {
  sourceFile: SourceFile;
};

export type MediaStoreCopyFileWithTokenParams = {
  readonly collection?: string;
  readonly replaceFileId?: string;
  readonly occurrenceKey?: string;
};

export type AppendChunksToUploadRequestBody = {
  readonly chunks: string[];

  readonly hash?: string;
  readonly offset?: number;
};

export interface CreatedTouchedFile {
  fileId: string;
  uploadId: string;
}

export type TouchedFiles = {
  created: CreatedTouchedFile[];
};

export interface EmptyFile {
  readonly id: string;
  readonly createdAt: number;
}
