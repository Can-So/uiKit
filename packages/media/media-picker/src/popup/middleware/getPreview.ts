import { Store, Dispatch, Middleware } from 'redux';
import { GetPreviewAction, isGetPreviewAction } from '../actions/getPreview';
import { State } from '../domain';
import { sendUploadEvent } from '../actions/sendUploadEvent';
import {
  getPreviewFromMetadata,
  NonImagePreview,
  Preview,
} from '../../domain/preview';

export default function(): Middleware {
  return store => (next: Dispatch<State>) => action => {
    if (isGetPreviewAction(action)) {
      getPreview(store as any, action);
    }
    return next(action);
  };
}

const dispatchPreviewUpdate = (
  store: Store<State>,
  { uploadId, file }: GetPreviewAction,
  preview: Preview,
) => {
  store.dispatch(
    sendUploadEvent({
      event: {
        name: 'upload-preview-update',
        data: {
          file,
          preview,
        },
      },
      uploadId,
    }),
  );
};

export async function getPreview(
  store: Store<State>,
  action: GetPreviewAction,
) {
  const { file, collection } = action;
  const { userContext } = store.getState();
  const subscription = userContext
    .getFile(file.id, { collectionName: collection })
    .subscribe({
      async next(state) {
        if (state.status === 'error') {
          return;
        }

        const { mediaType } = state;
        // We need to wait for the next tick since rxjs might call "next" before returning from "subscribe"
        setImmediate(() => subscription.unsubscribe());

        if (mediaType === 'image') {
          const metadata = await userContext.getImageMetadata(file.id, {
            collection,
          });
          const preview = getPreviewFromMetadata(metadata);
          dispatchPreviewUpdate(store, action, preview);
        } else {
          const preview: NonImagePreview = {
            file: state.preview ? state.preview.blob : undefined,
          };
          dispatchPreviewUpdate(store, action, preview);
        }
      },
    });
}
