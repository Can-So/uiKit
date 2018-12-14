import { Store, Dispatch, Middleware } from 'redux';
import {
  MediaStore,
  MediaStoreCopyFileWithTokenBody,
  MediaStoreCopyFileWithTokenParams,
} from '@atlaskit/media-store';
import { Fetcher } from '../tools/fetcher/fetcher';
import {
  FinalizeUploadAction,
  isFinalizeUploadAction,
} from '../actions/finalizeUpload';
import { State, SourceFile } from '../domain';
import { mapAuthToSourceFileOwner } from '../domain/source-file';
import { MediaFile } from '../../domain/file';
import {
  sendUploadEvent,
  SendUploadEventAction,
} from '../actions/sendUploadEvent';

export default function(fetcher: Fetcher): Middleware {
  return store => (next: Dispatch<State>) => action => {
    if (isFinalizeUploadAction(action)) {
      finalizeUpload(fetcher, store as any, action);
    }
    return next(action);
  };
}

export function finalizeUpload(
  fetcher: Fetcher,
  store: Store<State>,
  {
    file,
    uploadId,
    source,
    replaceFileId,
    occurrenceKey,
  }: FinalizeUploadAction,
): Promise<SendUploadEventAction> {
  const { userContext } = store.getState();
  return userContext.config
    .authProvider()
    .then(mapAuthToSourceFileOwner)
    .then(owner => {
      const sourceFile = {
        ...source,
        owner,
      };

      const copyFileParams: CopyFileParams = {
        store,
        fetcher,
        file,
        uploadId,
        sourceFile,
        replaceFileId,
        occurrenceKey,
      };

      return copyFile(copyFileParams);
    });
}

type CopyFileParams = {
  store: Store<State>;
  fetcher: Fetcher;
  file: MediaFile;
  uploadId: string;
  sourceFile: SourceFile;
  replaceFileId?: Promise<string>;
  occurrenceKey?: string;
};

async function copyFile({
  store,
  fetcher,
  file,
  uploadId,
  sourceFile,
  replaceFileId,
  occurrenceKey,
}: CopyFileParams): Promise<SendUploadEventAction> {
  const { deferredIdUpfronts, tenantContext, config } = store.getState();
  const collection = config.uploadParams && config.uploadParams.collection;
  const deferred = deferredIdUpfronts[sourceFile.id];
  const mediaStore = new MediaStore({
    authProvider: tenantContext.config.authProvider,
  });
  const body: MediaStoreCopyFileWithTokenBody = {
    sourceFile,
  };
  const params: MediaStoreCopyFileWithTokenParams = {
    collection,
    replaceFileId: replaceFileId ? await replaceFileId : undefined,
    occurrenceKey,
  };

  return mediaStore
    .copyFileWithToken(body, params)
    .then(async destinationFile => {
      const { id: publicId } = destinationFile.data;
      if (deferred) {
        const { resolver } = deferred;

        resolver(publicId);
      }

      store.dispatch(
        sendUploadEvent({
          event: {
            name: 'upload-processing',
            data: {
              file: {
                ...file,
                publicId,
              },
            },
          },
          uploadId,
        }),
      );
      const auth = await tenantContext.config.authProvider();
      // TODO [MS-725]: replace by context.getFile
      return fetcher.pollFile(auth, publicId, collection);
    })
    .then(processedDestinationFile => {
      return store.dispatch(
        sendUploadEvent({
          event: {
            name: 'upload-end',
            data: {
              file: {
                ...file,
                publicId: processedDestinationFile.id,
              },
              public: processedDestinationFile,
            },
          },
          uploadId,
        }),
      );
    })
    .catch(error => {
      if (deferred) {
        const { rejecter } = deferred;

        rejecter();
      }

      return store.dispatch(
        sendUploadEvent({
          event: {
            name: 'upload-error',
            data: {
              file,
              error: {
                name: 'object_create_fail',
                description: error.message,
              },
            },
          },
          uploadId,
        }),
      );
    });
}
