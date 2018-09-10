import { Observable } from 'rxjs';
import { Context, ContextConfig } from '@atlaskit/media-core';

const defaultContextConfig: ContextConfig = {
  authProvider: () =>
    Promise.resolve({
      clientId: 'some-client-id',
      token: 'some-token',
      baseUrl: 'some-service-host',
    }),
};
export const fakeContext = (
  stubbedContext: any = {},
  config: ContextConfig = defaultContextConfig,
): Context => {
  const returns = (value: any) => jest.fn().mockReturnValue(value);
  const getMediaItemProvider = returns({
    observable: returns(Observable.of('nothing')),
  });

  const getMediaCollectionProvider = returns({
    observable: returns(Observable.of('nothing')),
  });
  const getDataUriService = returns({
    fetchOriginalDataUri: returns(Promise.resolve('fake-original-data-uri')),
    fetchImageDataUri: returns(Promise.resolve('fake-image-data-uri')),
  });
  const addLinkItem = returns({
    observable: returns(Observable.of('nothing')),
  });
  const getUrlPreviewProvider = returns({
    observable: returns(Observable.of('nothing')),
  });
  const getFile = jest.fn().mockReturnValue(Observable.of({}));
  const getLocalPreview = jest.fn();
  const setLocalPreview = jest.fn();
  const removeLocalPreview = jest.fn();
  const refreshCollection = jest.fn();
  const getBlobService = jest.fn();
  const uploadFile = jest.fn();
  const collection = jest.fn() as any;
  const getImage = {} as any;
  const defaultContext: Context = {
    getImage,
    getFile,
    getBlobService,
    getLocalPreview,
    setLocalPreview,
    removeLocalPreview,
    getMediaItemProvider,
    getMediaCollectionProvider,
    getDataUriService,
    addLinkItem,
    getUrlPreviewProvider,
    refreshCollection,
    uploadFile,
    config,
    collection,
  };

  const wrappedStubbedContext: any = {};
  Object.keys(stubbedContext).forEach(methodName => {
    wrappedStubbedContext[methodName] = returns(stubbedContext[methodName]);
  });

  return {
    ...defaultContext,
    ...wrappedStubbedContext,
  };
};
