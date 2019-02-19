import { ContextFactory } from '@atlaskit/media-core';
import { createPromise } from '../cross-platform-promise';
import { MediaAuthConfig } from '../types';

function getToken(context) {
  return createPromise<MediaAuthConfig>(
    'getAuth',
    context.collectionName,
  ).submit();
}

function createMediaProvider() {
  const createMediaContext = Promise.resolve(
    ContextFactory.create({
      authProvider: context => getToken(context),
    }),
  );

  return Promise.resolve({
    uploadContext: createMediaContext,
    viewContext: createMediaContext,
    uploadParams: {
      collection: null,
    },
  });
}

export default Promise.resolve(createMediaProvider());
