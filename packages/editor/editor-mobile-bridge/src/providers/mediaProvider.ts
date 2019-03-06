import { MediaProvider } from '@atlaskit/editor-core';
import {
  Auth,
  AuthContext,
  ClientBasedAuth,
  ContextFactory as MediaContextFactory,
} from '@atlaskit/media-core';

import { createPromise } from '../cross-platform-promise';

const getMediaToken = (context?: AuthContext): Promise<Auth> =>
  createPromise<ClientBasedAuth>(
    'getAuth',
    // if collectionName exists in media's AuthContext, pass it along
    // otherwise pass an empty string (note that undefined doesn't work well with native promises)
    context && context.collectionName ? context.collectionName : '',
  ).submit();

async function createMediaProvider(): Promise<MediaProvider> {
  const mediaContext = Promise.resolve(
    MediaContextFactory.create({
      authProvider: (context?: AuthContext) => getMediaToken(context),
    }),
  );

  return {
    uploadContext: mediaContext,
    viewContext: mediaContext,
    uploadParams: {
      collection: '', // initially empty, will be returned by upload-end event
    },
  } as MediaProvider;
}

export default createMediaProvider();
