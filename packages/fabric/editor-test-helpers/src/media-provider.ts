import { ContextConfig as MediaContextConfig } from '@atlaskit/media-core';
import {
  defaultCollectionName,
  StoryBookAuthProvider,
  StoryBookUserAuthProvider,
  defaultParams,
  defaultServiceHost,
  userAuthProviderBaseURL,
} from '@atlaskit/media-test-helpers';
import { MediaProvider, MediaStateManager } from '@atlaskit/editor-core';

export interface MediaProviderFactoryConfig {
  serviceHost?: string;
  collectionName?: string;
  stateManager?: MediaStateManager;
  dropzoneContainer?: HTMLElement;
  includeUploadContext?: boolean;
  includeLinkCreateContext?: boolean;
  includeUserAuthProvider?: boolean;
}

/**
 * Add "import * as mediaTestHelpers from '@atlaskit/media-test-helpers'"
 * at the beginning of your file and pass "mediaTestHelpers" into this function
 */
export function storyMediaProviderFactory(
  mediaProviderFactoryConfig: MediaProviderFactoryConfig = {},
) {
  const {
    serviceHost,
    collectionName,
    stateManager,
    dropzoneContainer,
    includeUploadContext,
    includeLinkCreateContext,
    includeUserAuthProvider,
  } = mediaProviderFactoryConfig;
  const collection = collectionName || defaultCollectionName;

  return Promise.resolve<MediaProvider>({
    stateManager,
    uploadParams: {
      collection,
      dropzoneContainer,
    },
    viewContext: Promise.resolve<MediaContextConfig>({
      serviceHost: serviceHost || defaultParams.serviceHost,
      authProvider: StoryBookAuthProvider.create(false),
    }),
    uploadContext:
      includeUploadContext === false
        ? undefined
        : Promise.resolve<MediaContextConfig>({
            serviceHost: userAuthProviderBaseURL,
            authProvider: StoryBookAuthProvider.create(false, {
              [`urn:filestore:collection:${collection}`]: ['read', 'insert'],
              'urn:filestore:chunk:*': ['create', 'read'],
              'urn:filestore:upload': ['create'],
              'urn:filestore:upload:*': ['read', 'update'],
            }),
            userAuthProvider: !includeUserAuthProvider
              ? undefined
              : StoryBookUserAuthProvider.create(),
          }),
    linkCreateContext:
      includeLinkCreateContext === false
        ? undefined
        : Promise.resolve<MediaContextConfig>({
            serviceHost: defaultServiceHost,
            authProvider: StoryBookAuthProvider.create(false, {
              [`urn:filestore:collection:${collection}`]: ['read', 'update'],
              'urn:filestore:file:*': ['read'],
              'urn:filestore:chunk:*': ['read'],
            }),
          }),
  });
}

export type promisedString = Promise<string>;
export type resolveFn = (...any) => any;
export type thumbnailStore = { [id: string]: promisedString | resolveFn };

export function fileToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new (window as any).FileReader();
    reader.onloadend = function() {
      resolve(reader.result);
    };
    reader.onabort = function() {
      reject('abort');
    };
    reader.onerror = function(err) {
      reject(err);
    };
    reader.readAsDataURL(blob);
  });
}

export function isImage(type: string) {
  return ['image/jpeg', 'image/png'].indexOf(type) > -1;
}

export function getLinkCreateContextMock(testLinkId: string) {
  return {
    getUrlPreviewProvider: url => ({
      observable: () => ({
        subscribe: cb => cb({}),
      }),
    }),
    addLinkItem: (url, collection, metadata) => {
      return Promise.resolve(testLinkId);
    },
  } as any;
}
